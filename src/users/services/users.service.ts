import { Injectable } from '@nestjs/common';
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

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private userRepo: Repository<User>,
		private customersService: CustomersService,
	) {}

	private async userExist(id: number) {
		const user = await this.userRepo.findOneBy({ id });
		if (!user) throw httpErrors.notFoundError('User', id);

		return user;
	}

	async list() {
		return this.userRepo.find({ loadRelationIds: true });
	}

	async findOne(id: number) {
		const user = await this.userRepo.findOne({
			where: { id },
			loadRelationIds: true,
		});
		if (!user) throw httpErrors.notFoundError('User', id);

		return user;
	}

	async findOneByEmail(email: string) {
		const user = await this.userRepo.findOne({
			where: { email },
		});

		return user;
	}

	async create(data: CreateUserDto | CreateOAuthUserDto) {
		const newUser = this.userRepo.create(data);
		if (data instanceof CreateUserDto) {
			newUser.password = await bcrypt.hash(data.password, 10);
			if (data.customerId)
				newUser.customer = await this.customersService.findOne(
					data.customerId,
				);
		}

		return this.userRepo.save(newUser);
	}

	async update(id: number, data: UpdateUserDto) {
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
		await this.userExist(id);
		await this.userRepo.delete(id);
		return { message: `#${id} removed` };
	}
}
