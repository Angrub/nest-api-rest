import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { httpErrors } from 'src/helpers/http-errors.helper';
import { Repository } from 'typeorm';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';
import { Customer } from '../entities/customers.entity';

@Injectable()
export class CustomersService {
	constructor(
		@InjectRepository(Customer)
		private customerRepo: Repository<Customer>,
	) {}

	async list() {
		return this.customerRepo.find();
	}

	async findOne(id: number) {
		const customer = await this.customerRepo.findOneBy({ id });
		if (!customer) throw httpErrors.notFoundError('Customer', id);

		return customer;
	}

	async create(data: CreateCustomerDto) {
		const newUser = this.customerRepo.create(data);

		return this.customerRepo.save(newUser);
	}

	async update(id: number, data: UpdateCustomerDto) {
		const customer = await this.findOne(id);
		this.customerRepo.merge(customer, data);

		return this.customerRepo.save(customer);
	}

	async remove(id: number) {
		await this.findOne(id);
		await this.customerRepo.delete(id);
		return { message: `#${id} removed` };
	}
}
