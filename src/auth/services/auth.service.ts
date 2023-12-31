import {
	Inject,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/services/users.service';
import { LoginDto } from '../dtos/login.dto';
import { PayloadToken } from '../models/token.model';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { VerificationCode } from '../entities/verification-code.entity';
import { Repository } from 'typeorm';
import { sendMail } from 'src/helpers/send-mail.helper';
import { ConfigType } from '@nestjs/config';
import { config } from 'src/config';
import { RegisterDto, ResendCodeDto } from '../dtos/register.dto';
import * as randomstring from 'randomstring';
import { OAuthUser } from '../models/oauth-user.model';
import { RolesService } from './roles.service';

@Injectable()
export class AuthService {
	constructor(
		@Inject(config.KEY) private configService: ConfigType<typeof config>,
		@InjectRepository(VerificationCode)
		private verificationCodeRepo: Repository<VerificationCode>,
		private usersService: UsersService,
		private jwtService: JwtService,
		private rolesService: RolesService,
	) {}

	generateJWT(user: User) {
		const payload: PayloadToken = { role: user.role.id, sub: user.id };
		return this.jwtService.sign(payload);
	}

	async localAuthentication(data: LoginDto) {
		const user = await this.usersService.findOneByEmail(data.email);
		if (!user)
			throw new UnauthorizedException(`Email or password are wrong`);
		const isMatch = await bcrypt.compare(data.password, user.password);
		if (!isMatch)
			throw new UnauthorizedException(`Email or password are wrong`);

		const access_token = this.generateJWT(user);
		return { user, access_token };
	}

	async registerWithPassword(data: RegisterDto) {
		const role = await this.rolesService.findOneByRolname('customer');
		const ONE_MINUTE = 60 * 1000;
		const newUser = await this.usersService.create({
			email: data.email,
			password: data.password,
			roleId: role.id,
		});

		const verificationCode = randomstring.generate(8);
		const newCode = this.verificationCodeRepo.create({
			userId: newUser,
			code: verificationCode,
			expirationDate: new Date(Date.now() + ONE_MINUTE),
		});
		const savedCode = await this.verificationCodeRepo.save(newCode);

		const { from, host, pass, user } = this.configService.smtp;

		await sendMail(
			{
				from,
				to: newUser.email,
				subject: 'Verification code',
				html: `<h1>${savedCode.code}</h1>`,
			},
			{ host, user, pass: pass },
		);

		return {
			message:
				'User created, the verification code was sent to your email',
		};
	}

	async resendCode(data: ResendCodeDto) {
		const ONE_MINUTE = 60 * 1000;
		const { from, host, pass, user } = this.configService.smtp;
		const verificationCode = randomstring.generate(8);
		const newUser = await this.usersService.findOneByEmail(data.email);

		if (!newUser) new NotFoundException('Email not found');

		const newCode = this.verificationCodeRepo.create({
			userId: newUser,
			code: verificationCode,
			expirationDate: new Date(Date.now() + ONE_MINUTE),
		});
		const savedCode = await this.verificationCodeRepo.save(newCode);

		await sendMail(
			{
				from,
				to: data.email,
				subject: 'Verification code',
				html: `<h1>${savedCode.code}</h1>`,
			},
			{ host, user, pass: pass },
		);

		return {
			message: 'Forwarded message',
		};
	}

	async validateCode(code: string) {
		const verificationCode = await this.verificationCodeRepo.findOne({
			where: { code },
			loadRelationIds: true,
		});

		if (!verificationCode) throw new UnauthorizedException(`Code invalid`);

		const { expirationDate, id } = verificationCode;
		await this.verificationCodeRepo.delete(id);
		const diference = expirationDate.getTime() - Date.now();
		const isExpiredCode = diference < 0;

		if (isExpiredCode)
			throw new UnauthorizedException(
				`Code ${verificationCode.code} expired`,
			);

		const userId: any = verificationCode.userId;
		const user = await this.usersService.findOneWithRole(userId);
		const access_token = this.generateJWT(user);
		return { user, access_token };
	}

	async oauth(authServer: 'google' | 'facebook', oauthUser?: OAuthUser) {
		if (!oauthUser)
			throw new UnauthorizedException(
				`Failed to authenticate with ${authServer}`,
			);

		const user = await this.usersService.findOneByEmail(oauthUser.email);

		if (user) {
			const access_token = this.generateJWT(user);
			return { user, access_token };
		}

		const role = await this.rolesService.findOneByRolname('customer');
		const data = {
			email: oauthUser.email,
			roleId: role.id,
			google_id: undefined,
			facebook_id: undefined,
		};
		if (authServer === 'google') data.google_id = oauthUser.id;
		else data.facebook_id = oauthUser.id;

		const newUser = await this.usersService.create(data);
		const access_token = this.generateJWT(newUser);
		return { user: newUser, access_token };
	}
}
