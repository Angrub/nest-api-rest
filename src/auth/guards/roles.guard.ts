import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common';
import { PayloadToken } from '../models/token.model';
import { RolesService } from '../services/roles.service';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private rolesService: RolesService) {}

	async canActivate(context: ExecutionContext) {
		try {
			const request = context.switchToHttp().getRequest();
			const payload: PayloadToken = request.user;
			const role = await this.rolesService.findOneWithRelations(
				payload.role,
			);
			const path = request.baseUrl + request.path;
			const pathMatch = role.permissions.find((p) => p.path === path);

			if (!pathMatch || pathMatch.method !== request.method) {
				throw new Error();
			}

			return true;
		} catch (err) {
			throw new ForbiddenException('Your role is wrong');
		}
	}
}
