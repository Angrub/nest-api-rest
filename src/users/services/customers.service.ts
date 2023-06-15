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
		return this.customerRepo.find({
			where: { deleted: false },
		});
	}

	async findOne(id: number) {
		const customer = await this.customerRepo.findOne({
			where: { id, deleted: false },
		});
		if (!customer) throw httpErrors.notFoundError('Customer', id);

		return customer;
	}

	async create(data: CreateCustomerDto) {
		const newCustomer = this.customerRepo.create(data);

		return this.customerRepo.save(newCustomer);
	}

	async update(id: number, data: UpdateCustomerDto) {
		const customer = await this.findOne(id);
		this.customerRepo.merge(customer, data);

		return this.customerRepo.save(customer);
	}

	async remove(id: number) {
		const customer = await this.findOne(id);
		if (!customer) throw httpErrors.notFoundError('Customer', id);
		customer.deleted = true;
		await this.customerRepo.save(customer);
		return { message: `#${id} removed` };
	}
}
