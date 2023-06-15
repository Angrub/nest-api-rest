import { Injectable } from '@nestjs/common';
import { Exercise } from '../entities/exercise.entity';
import { CreateExerciseDto, UpdateExerciseDto } from '../dtos/exercise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { httpErrors } from 'src/helpers/http-errors.helper';
import { Repository } from 'typeorm';
import { UnitsService } from './units.service';

@Injectable()
export class ExercisesService {
	constructor(
		@InjectRepository(Exercise)
		private exerciseRepo: Repository<Exercise>,
		private unitsService: UnitsService,
	) {}

	async list() {
		return this.exerciseRepo.find({
			where: { deleted: false },
		});
	}

	async findOne(id: number) {
		const exercise = await this.exerciseRepo.findOne({
			where: { id, deleted: false },
		});
		if (!exercise) throw httpErrors.notFoundError('Exercise', id);

		return exercise;
	}

	async create(data: CreateExerciseDto) {
		const newExercise = this.exerciseRepo.create(data);
		const unit = await this.unitsService.findOne(data.unitId);
		newExercise.unit = unit;

		return this.exerciseRepo.save(newExercise);
	}

	async update(id: number, data: UpdateExerciseDto) {
		const exercise = await this.findOne(id);
		this.exerciseRepo.merge(exercise, data);

		return this.exerciseRepo.save(exercise);
	}

	async remove(id: number) {
		const exercise = await this.findOne(id);
		exercise.deleted = true;
		await this.exerciseRepo.save(exercise);
		return { message: `#${id} removed` };
	}
}
