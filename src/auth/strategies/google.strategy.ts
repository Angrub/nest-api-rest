import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { config } from 'src/config';
import { OAuthUser } from '../models/oauth-user.model';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
	constructor(@Inject(config.KEY) configService: ConfigType<typeof config>) {
		super({
			clientID: configService.oauth.googleClientId,
			clientSecret: configService.oauth.googleClientSecret,
			callbackURL: '/auth/google',
			scope: ['email', 'profile'],
		});
	}
	async validate(
		accessToken: string,
		refreshToken: string,
		profile: Profile,
		done: VerifyCallback,
	) {
		const { name, emails, id } = profile;
		const user: OAuthUser = {
			id,
			email: emails[0].value,
			firstname: name.givenName,
			lastname: name.familyName,
		};
		done(null, user);
	}
}
