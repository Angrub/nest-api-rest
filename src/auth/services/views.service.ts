import { Injectable } from '@nestjs/common';
import { View } from '../entities/view.entity';
import { CreateViewDto, UpdateViewDto } from '../dtos/views.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { httpErrors } from 'src/helpers/http-errors.helper';
import { In, Repository } from 'typeorm';

@Injectable()
export class ViewsService {
	constructor(
		@InjectRepository(View)
		private viewRepo: Repository<View>,
	) {}

	async list() {
		return this.viewRepo.find({
			where: { deleted: false },
		});
	}

	async listByIds(ids: number[]) {
		return this.viewRepo.find({
			where: { id: In(ids), deleted: false },
		});
	}

	async findOne(id: number) {
		const view = await this.viewRepo.findOne({
			where: { id, deleted: false },
		});
		if (!view) throw httpErrors.notFoundError('View', id);

		return view;
	}

	async create(data: CreateViewDto) {
		const newView = this.viewRepo.create(data);

		return this.viewRepo.save(newView);
	}

	async update(id: number, data: UpdateViewDto) {
		const view = await this.findOne(id);
		this.viewRepo.merge(view, data);

		return this.viewRepo.save(view);
	}

	async remove(id: number) {
		const view = await this.findOne(id);
		view.deleted = true;
		await this.viewRepo.save(view);
		return { message: `#${id} removed` };
	}
}
