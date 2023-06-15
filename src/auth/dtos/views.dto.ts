import { ApiProperty, PartialType } from '@nestjs/swagger';
import { MaxLength, IsNotEmpty } from 'class-validator';

export class CreateViewDto {
	@MaxLength(255)
	@IsNotEmpty()
	@ApiProperty({ description: '' })
	menu: string;

	@MaxLength(255)
	@IsNotEmpty()
	@ApiProperty({ description: '' })
	name: string;

	@MaxLength(255)
	@IsNotEmpty()
	@ApiProperty({ description: 'Ruta de la vista' })
	path: string;
}

export class UpdateViewDto extends PartialType(CreateViewDto) {}

export class ViewSerializedDto {
	id: number;
	menu: string;
	name: string;
	path: string;
}
