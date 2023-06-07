import { LoginDto } from '../dtos/login.dto';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dtos/register.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Request,
	UseGuards,
} from '@nestjs/common';
import { MessageResponse, SuccessLoginDto } from '../dtos/success-login.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('/login')
	@ApiCreatedResponse({ type: SuccessLoginDto })
	@ApiOperation({ summary: 'Login de usuarios' })
	login(@Body() data: LoginDto) {
		return this.authService.localAuthentication(data);
	}

	@Post('/register')
	@ApiCreatedResponse({ type: MessageResponse })
	@ApiOperation({ summary: 'Registro de usuarios' })
	register(@Body() data: RegisterDto) {
		return this.authService.registerWithPassword(data);
	}

	@Get('/confirm_email/:code')
	@ApiCreatedResponse({ type: SuccessLoginDto })
	@ApiOperation({ summary: 'Confirmación de correo' })
	confirmEmail(@Param('code') code: string) {
		return this.authService.validateCode(code);
	}

	@Get('/google')
	@UseGuards(AuthGuard('google'))
	@ApiCreatedResponse({ type: SuccessLoginDto })
	@ApiOperation({ summary: 'Login y registro con google' })
	googleAuth(@Request() req) {
		return this.authService.oauth('google', req.user);
	}

	@Get('/facebook')
	@UseGuards(AuthGuard('facebook'))
	@ApiCreatedResponse({ type: SuccessLoginDto })
	@ApiOperation({ summary: 'Login y registro con facebook' })
	facebookAuth(@Request() req) {
		return this.authService.oauth('facebook', req.user);
	}
}
