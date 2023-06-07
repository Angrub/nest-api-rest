import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../decorators/role.decorator';
import { PayloadToken } from '../models/token.model';
import { Role } from '../models/roles.model';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext) {
		const roles = this.reflector.get<Role[]>(
			ROLES_KEY,
			context.getHandler(),
		);
		if (!roles) return true;

		const request = context.switchToHttp().getRequest();
		const user: PayloadToken = request.user;
		const isAuth = roles.includes(user.role);

		if (!isAuth) {
			throw new ForbiddenException('Your role is wrong');
		}

		return true;
	}
}
