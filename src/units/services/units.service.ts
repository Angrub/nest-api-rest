import { Injectable } from '@nestjs/common';
import { Unit } from '../entities/unit.entity';
import { CreateUnitDto, UpdateUnitDto } from '../dtos/units.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { httpErrors } from 'src/helpers/http-errors.helper';
import { Repository } from 'typeorm';

@Injectable()
export class UnitsService {
	constructor(
		@InjectRepository(Unit)
		private unitRepo: Repository<Unit>,
	) {}

	async list() {
		return this.unitRepo.find({
			where: { deleted: false },
		});
	}

	async findOne(id: number) {
		const unit = await this.unitRepo.findOne({
			where: { id, deleted: false },
		});
		if (!unit) throw httpErrors.notFoundError('Unit', id);

		return unit;
	}

	async create(data: CreateUnitDto) {
		const newUnit = this.unitRepo.create(data);

		return this.unitRepo.save(newUnit);
	}

	async update(id: number, data: UpdateUnitDto) {
		const unit = await this.findOne(id);
		this.unitRepo.merge(unit, data);

		return this.unitRepo.save(unit);
	}

	async remove(id: number) {
		const unit = await this.findOne(id);
		unit.deleted = true;
		await this.unitRepo.save(unit);
		return { message: `#${id} removed` };
	}
}
