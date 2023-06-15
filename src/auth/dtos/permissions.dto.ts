import { ApiProperty, PartialType } from '@nestjs/swagger';
import { MaxLength, IsNotEmpty, IsEnum } from 'class-validator';
import { Method } from '../entities/permission.entity';

export class CreatePermissionDto {
	@MaxLength(255)
	@IsNotEmpty()
	@ApiProperty({ description: 'Breve decripción del permiso' })
	description: string;

	@MaxLength(255)
	@IsNotEmpty()
	@ApiProperty({ description: 'Endpoint de la funcionalidad' })
	path: string;

	@IsEnum(Method)
	@ApiProperty({ description: 'Método del endpoint' })
	method: Method;
}

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {}

export class PermissionSerializedDto {
	id: number;
	description: string;
	path: string;
	method: Method;
}
