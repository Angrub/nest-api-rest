import { ApiProperty } from '@nestjs/swagger';
import {
	IsEmail,
	IsNotEmpty,
	MaxLength,
	MinLength,
	ValidateIf,
} from 'class-validator';

export class RegisterDto {
	@MinLength(20)
	@MaxLength(255)
	@IsNotEmpty()
	@ApiProperty({ description: 'contraseña del usuario' })
	readonly password: string;

	@MinLength(20)
	@MaxLength(255)
	@ValidateIf((o, v) => o.password === v)
	@IsNotEmpty()
	@ApiProperty({ description: 'confirmación de contraseña' })
	readonly passwordConfirm: string;

	@IsEmail()
	@MaxLength(255)
	@IsNotEmpty()
	@ApiProperty({ description: 'email del usuario' })
	readonly email: string;
}
