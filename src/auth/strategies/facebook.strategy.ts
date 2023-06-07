import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { config } from 'src/config';
import { OAuthUser } from '../models/oauth-user.model';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
	constructor(@Inject(config.KEY) configService: ConfigType<typeof config>) {
		super({
			clientID: configService.oauth.facebookClientId,
			clientSecret: configService.oauth.facebookClientSecret,
			callbackURL: '/auth/facebook',
			profileFields: ['emails', 'name'],
		});
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: Profile,
		done: (err: any, user: any, info?: any) => void,
	) {
		if (!profile.emails)
			throw new NotFoundException(`Facebook can't provide email`);
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
