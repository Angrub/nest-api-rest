import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
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
}
