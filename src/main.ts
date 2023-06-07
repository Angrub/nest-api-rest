import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transformOptions: {
				enableImplicitConversion: true,
			},
			transform: true,
		}),
	);
	app.useGlobalInterceptors(
		new ClassSerializerInterceptor(app.get(Reflector)),
	);
	// Configuración Swagger en NestJS
	const config = new DocumentBuilder()
		.setTitle('ABA API')
		.setDescription('Documentación de ABA API')
		.setVersion('1.0')
		.addBearerAuth(
			{
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
				name: 'JWT',
				description: 'Enter JWT token',
				in: 'header',
			},
			'JWT-auth',
		)
		.build();
	const document = SwaggerModule.createDocument(app, config);

	// URL API
	SwaggerModule.setup('docs', app, document);
	await app.listen(3000);
}
bootstrap();
