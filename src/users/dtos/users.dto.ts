import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
	IsEmail,
	IsEnum,
	IsInt,
	IsNotEmpty,
	IsOptional,
	MaxLength,
	Min,
	MinLength,
} from 'class-validator';
import { Role } from '../../auth/models/roles.model';
import { CustomerSerializedDto } from './customers.dto';

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

	@IsEnum(Role)
	@ApiProperty({ description: 'rol del usuario' })
	readonly role: Role;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class CreateOAuthUserDto {
	readonly google_id?: string;
	readonly facebook_id?: string;
	readonly email: string;
	readonly role: Role;
}

export class UserSerializedDto {
	readonly id: number;
	readonly google_id: string | null;
	readonly facebook_id: string | null;
	readonly email: string;
	readonly role: Role;
}

export class UserSerializedWithCustomerIdDto extends UserSerializedDto {
	readonly customer: number | null;
}

export class UserSerializedWithCustomerEntityDto extends UserSerializedDto {
	readonly customer: CustomerSerializedDto;
}
