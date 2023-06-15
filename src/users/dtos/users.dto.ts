import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
	IsEmail,
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsPositive,
	MaxLength,
	Min,
	MinLength,
} from 'class-validator';
import { CustomerSerializedDto } from './customers.dto';
import { RoleWithoutRelationSerializedDto } from 'src/auth/dtos/roles.dto';

export class CreateUserDto {
	@IsInt()
	@Min(1)
	@IsOptional()
	@ApiProperty({ description: 'id del cliente vinculado al usuario' })
	readonly customerId?: number;

	@MinLength(20)
	@MaxLength(255)
	@IsNotEmpty()
	@ApiProperty({ description: 'contraseña del usuario' })
	readonly password: string;

	@IsEmail()
	@MaxLength(255)
	@IsNotEmpty()
	@ApiProperty({ description: 'email del usuario' })
	readonly email: string;

	@IsPositive()
	@ApiProperty({ description: 'rol del usuario' })
	readonly roleId: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class CreateOAuthUserDto {
	readonly google_id?: string;
	readonly facebook_id?: string;
	readonly email: string;
	readonly roleId: number;
	readonly password?: string;
	readonly customerId?: number;
}

export class UserWithoutCustomerSerializedDto {
	readonly id: number;
	readonly google_id: string | null;
	readonly facebook_id: string | null;
	readonly email: string;
	readonly role: RoleWithoutRelationSerializedDto;
}

export class UserSerializedDto extends UserWithoutCustomerSerializedDto {
	readonly customer: CustomerSerializedDto | null;
}
