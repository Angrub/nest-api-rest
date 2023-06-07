import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
	IsNotEmpty,
	IsPhoneNumber,
	IsString,
	MaxLength,
} from 'class-validator';

export class CreateCustomerDto {
	@IsString()
	@MaxLength(50)
	@IsNotEmpty()
	@ApiProperty({ description: 'nombres del cliente' })
	readonly firstname: string;

	@IsString()
	@MaxLength(50)
	@IsNotEmpty()
	@ApiProperty({ description: 'apellidos del cliente' })
	readonly lastname?: string;

	@IsPhoneNumber()
	@MaxLength(50)
	@IsNotEmpty()
	@ApiProperty({ description: 'telefono del cliente' })
	readonly phone?: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}

export class CustomerSerializedDto {
	id: number;
	firstname: string;
	lastname: string;
	phone: string;
}
