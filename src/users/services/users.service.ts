import {
	Injectable,
	NotFoundException,
	UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/users.entity';
import { CustomersService } from './customers.service';
import { httpErrors } from 'src/helpers/http-errors.helper';
import * as bcrypt from 'bcrypt';
import {
	CreateOAuthUserDto,
	CreateUserDto,
	UpdateUserDto,
} from '../dtos/users.dto';
import { RolesService } from 'src/auth/services/roles.service';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private userRepo: Repository<User>,
		private customersService: CustomersService,
		private rolesService: RolesService,
	) {}

	private async userExist(id: number) {
		const user = await this.userRepo.findOne({
			where: { id, deleted: false },
		});
		if (!user) throw httpErrors.notFoundError('User', id);

		return user;
	}

	async emailExist(email: string) {
		const user = await this.userRepo.findOne({
			where: { email, deleted: false },
		});

		return user;
	}

	async list() {
		return this.userRepo.find({
			where: { deleted: false },
			relations: { customer: true, role: true },
		});
	}

	async findOneWithRole(id: number) {
		const user = await this.userRepo.findOne({
			where: { id, deleted: false },
			relations: { role: true },
		});
		if (!user) throw httpErrors.notFoundError('User', id);

		return user;
	}

	async findOneByEmail(email: string) {
		const user = await this.userRepo.findOne({
			where: { email, deleted: false },
			relations: { role: true, customer: true },
		});

		return user;
	}

	async create(data: CreateUserDto | CreateOAuthUserDto) {
		const user = await this.emailExist(data.email);
		if (user)
			throw new UnprocessableEntityException(
				`Email "${data.email}" already exist`,
			);
		const newUser = this.userRepo.create(data);
		const role = await this.rolesService.findOne(data.roleId);
		newUser.role = role;

		if (data.password) {
			newUser.password = await bcrypt.hash(data.password, 10);
			if (data.customerId)
				newUser.customer = await this.customersService.findOne(
					data.customerId,
				);
		}

		return this.userRepo.save(newUser);
	}

	async update(id: number, data: UpdateUserDto) {
		if (data.email) {
			const userEmailExist = await this.emailExist(data.email);
			if (userEmailExist)
				throw new NotFoundException(
					`Email "${data.email}" already exist`,
				);
		}

		const user = await this.userExist(id);
		if (data.customerId) {
			const customer = await this.customersService.findOne(
				data.customerId,
			);
			user.customer = customer;
		}
		this.userRepo.merge(user, data);

		return this.userRepo.save(user);
	}

	async remove(id: number) {
		const user = await this.userExist(id);
		user.deleted = true;
		await this.userRepo.save(user);
		return { message: `#${id} removed` };
	}
}
