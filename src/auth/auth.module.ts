import { Global, Module } from '@nestjs/common';
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
import { RolesController } from './controllers/roles.controller';
import { PermissionsController } from './controllers/permissions.controller';
import { ViewsController } from './controllers/views.controller';
import { RolesService } from './services/roles.service';
import { PermissionsService } from './services/permissions.service';
import { ViewsService } from './services/views.service';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { View } from './entities/view.entity';

@Global()
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
		TypeOrmModule.forFeature([VerificationCode, Role, Permission, View]),
	],
	providers: [
		AuthService,
		JwtStrategy,
		GoogleStrategy,
		FacebookStrategy,
		RolesService,
		PermissionsService,
		ViewsService,
	],
	controllers: [
		AuthController,
		RolesController,
		PermissionsController,
		ViewsController,
	],
	exports: [RolesService],
})
export class AuthModule {}
