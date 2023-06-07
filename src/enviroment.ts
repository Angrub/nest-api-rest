import * as Joi from 'joi';

export const enviroments = {
	local: '.env',
	prod: '.prod.env',
};

export const enviromentSchema = Joi.object({
	DB_HOST: Joi.string().required(),
	DB_PORT: Joi.number().required(),
	DB_NAME: Joi.string().required(),
	DB_USER: Joi.string().required(),
	DB_PASSWORD: Joi.string().required(),
	JWT_SECRET: Joi.string().required(),
	EXPIRES_IN: Joi.string().required(),
	SMTP_HOST: Joi.string().required(),
	SMTP_USER: Joi.string().required(),
	SMTP_PASSWORD: Joi.string().required(),
	SMTP_FROM: Joi.string().required(),
	GOOGLE_CLIENT_ID: Joi.string().required(),
	GOOGLE_CLIENT_SECRET: Joi.string().required(),
	FACEBOOK_CLIENT_ID: Joi.string().required(),
	FACEBOOK_CLIENT_SECRET: Joi.string().required(),
});
