import { IsEnum, IsNotEmpty, IsPositive } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { ExerciseType } from '../entities/exercise.entity';
import { UnitSerializedDto } from './units.dto';

export class CreateExerciseDto {
	@IsPositive()
	@IsNotEmpty()
	readonly unitId: number;

	@IsEnum(ExerciseType)
	@IsNotEmpty()
	readonly type: ExerciseType;
}

export class UpdateExerciseDto extends PartialType(CreateExerciseDto) {}

export class ExerciseSerializedDto {
	readonly id: number;
	readonly unit: UnitSerializedDto;
	readonly type: ExerciseType;
}
