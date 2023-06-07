import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { config } from 'src/config';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificationCode } from './entities/verification-code.entity';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { FacebookStrategy } from './strategies/facebook.strategy';

@Module({
	imports: [
		PassportModule,
		JwtModule.registerAsync({
			inject: [config.KEY],
			useFactory: async (configService: ConfigType<typeof config>) => ({
				secret: configService.jwtSecret,
				signOptions: {
					expiresIn: configService.expiresIn,
				},
			}),
		}),
		UsersModule,
		TypeOrmModule.forFeature([VerificationCode]),
	],
	providers: [AuthService, JwtStrategy, GoogleStrategy, FacebookStrategy],
	controllers: [AuthController],
})
export class AuthModule {}
