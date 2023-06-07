import * as dotnev from 'dotenv';
import { DataSource } from 'typeorm';

dotnev.config();

export const AppDataSource = new DataSource({
	type: 'mysql',
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	synchronize: false,
	logging: false,
	entities: ['src/**/*.entity.ts'],
	migrations: ['src/database/migrations/*.ts'],
	migrationsTableName: 'migrations',
});
