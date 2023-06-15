import {
	Injectable,
	NotFoundException,
	UnprocessableEntityException,
} from '@nestjs/common';
import { Role } from '../entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { httpErrors } from 'src/helpers/http-errors.helper';
import { Repository } from 'typeorm';
import {
	CreateAndUpdateRoleDto,
	DeletePermissionsOrViewsDto,
} from '../dtos/roles.dto';
import { PermissionsService } from './permissions.service';
import { ViewsService } from './views.service';

@Injectable()
export class RolesService {
	constructor(
		@InjectRepository(Role)
		private roleRepo: Repository<Role>,
		private permissionsService: PermissionsService,
		private viewsService: ViewsService,
	) {}

	async list() {
		return this.roleRepo.find({
			where: { deleted: false },
			relations: { views: true, permissions: true },
		});
	}

	async findOneWithRelations(id: number) {
		const role = await this.roleRepo.findOne({
			where: { id, deleted: false },
			relations: { views: true, permissions: true },
		});
		if (!role) throw httpErrors.notFoundError('Role', id);

		return role;
	}

	async findOneByRolname(rolname: string) {
		const role = await this.roleRepo.findOne({
			where: { rolname, deleted: false },
		});
		if (!role)
			throw new NotFoundException(`Rolname "${rolname}" not found`);

		return role;
	}

	async findOne(id: number) {
		const role = await this.roleRepo.findOne({
			where: { id, deleted: false },
		});
		if (!role) throw httpErrors.notFoundError('Role', id);

		return role;
	}

	async create(data: CreateAndUpdateRoleDto) {
		const role = await this.roleRepo.findOne({
			where: { rolname: data.rolname, deleted: false },
		});
		if (role)
			throw new UnprocessableEntityException(
				`Rolname "${data.rolname}" already exist`,
			);

		const newRole = this.roleRepo.create(data);

		if (data.permissions_ids) {
			const permissions = await this.permissionsService.listByIds(
				data.permissions_ids,
			);

			if (permissions.length !== data.permissions_ids.length)
				throw new NotFoundException(
					'Some id of the list of permissions is not defined',
				);

			newRole.permissions = permissions;
		}

		if (data.views_ids) {
			const views = await this.viewsService.listByIds(data.views_ids);

			if (views.length !== data.views_ids.length)
				throw new NotFoundException(
					'Some id of the list of views is not defined',
				);

			newRole.views = views;
		}

		return this.roleRepo.save(newRole);
	}

	async update(id: number, data: CreateAndUpdateRoleDto) {
		if (data.rolname) {
			const role = await this.roleRepo.findOne({
				where: { rolname: data.rolname, deleted: false },
			});
			if (role)
				throw new UnprocessableEntityException(
					`Rolname "${data.rolname}" already exist`,
				);
		}
		const role = await this.findOne(id);
		if (data.permissions_ids) {
			const permissions = await this.permissionsService.listByIds(
				data.permissions_ids,
			);

			if (permissions.length !== data.permissions_ids.length)
				throw new NotFoundException(
					'Some id of the list of permissions is not defined',
				);

			role.permissions = permissions;
		}

		if (data.views_ids) {
			const views = await this.viewsService.listByIds(data.views_ids);

			if (views.length !== data.views_ids.length)
				throw new NotFoundException(
					'Some id of the list of views is not defined',
				);

			role.views = views;
		}
		this.roleRepo.merge(role, data);
		return this.roleRepo.save(role);
	}

	async remove(id: number) {
		const role = await this.findOne(id);
		role.deleted = true;
		await this.roleRepo.save(role);
		return { message: `#${id} removed` };
	}

	async removePermissionsOrViews(
		role_id: number,
		data: DeletePermissionsOrViewsDto,
	) {
		const role = await this.roleRepo.findOne({
			where: { id: role_id },
			relations: { views: true, permissions: true },
		});
		if (!role) throw httpErrors.notFoundError('Role', role_id);

		if (data.permissions_ids) {
			const permissions = role.permissions.filter(
				(permission) => !data.permissions_ids.includes(permission.id),
			);
			role.permissions = permissions;
		}

		if (data.views_ids) {
			const views = role.views.filter(
				(view) => !data.views_ids.includes(view.id),
			);
			role.views = views;
		}

		return await this.roleRepo.save(role);
	}
}
