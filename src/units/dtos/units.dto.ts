import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Level } from '../entities/unit.entity';
import { PartialType } from '@nestjs/swagger';

export class CreateUnitDto {
	@MaxLength(50)
	@IsNotEmpty()
	readonly unit: string;

	@MaxLength(50)
	@IsNotEmpty()
	readonly title: string;

	@IsString()
	@IsNotEmpty()
	readonly storyline: string;

	@MaxLength(50)
	@IsNotEmpty()
	readonly accent: string;

	@MaxLength(50)
	@IsNotEmpty()
	readonly topic: string;

	@IsEnum(Level)
	@IsNotEmpty()
	readonly level: Level;
}

export class UpdateUnitDto extends PartialType(CreateUnitDto) {}

export class UnitSerializedDto {
	readonly id: number;
	readonly unit: string;
	readonly title: string;
	readonly storyline: string;
	readonly accent: string;
	readonly topic: string;
	readonly level: Level;
}
