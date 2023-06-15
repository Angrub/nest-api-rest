import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { enviromentSchema, enviroments } from './enviroment';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { UnitsModule } from './units/units.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			envFilePath: enviroments[process.env.NODE_ENV],
			load: [config],
			isGlobal: true,
			validationSchema: enviromentSchema,
		}),
		AuthModule,
		UsersModule,
		DatabaseModule,
		UnitsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
