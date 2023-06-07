import { registerAs } from '@nestjs/config';

export const config = registerAs('config', () => {
	return {
		database: {
			host: process.env.DB_HOST,
			port: process.env.DB_PORT,
			database: process.env.DB_NAME,
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
		},
		smtp: {
			host: process.env.SMTP_HOST,
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASSWORD,
			from: process.env.SMTP_FROM,
		},
		oauth: {
			googleClientId: process.env.GOOGLE_CLIENT_ID,
			googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
			facebookClientId: process.env.FACEBOOK_CLIENT_ID,
			facebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET,
		},
		jwtSecret: process.env.JWT_SECRET,
		expiresIn: process.env.EXPIRES_IN,
	};
});
