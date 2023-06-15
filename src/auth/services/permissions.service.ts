import { Injectable } from '@nestjs/common';
import { Permission } from '../entities/permission.entity';
import {
	CreatePermissionDto,
	UpdatePermissionDto,
} from '../dtos/permissions.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { httpErrors } from 'src/helpers/http-errors.helper';
import { In, Repository } from 'typeorm';

@Injectable()
export class PermissionsService {
	constructor(
		@InjectRepository(Permission)
		private permissionRepo: Repository<Permission>,
	) {}

	async list() {
		return this.permissionRepo.find({
			where: { deleted: false },
		});
	}

	async listByIds(ids: number[]) {
		return this.permissionRepo.find({
			where: { id: In(ids), deleted: false },
		});
	}

	async findOne(id: number) {
		const permission = await this.permissionRepo.findOne({
			where: { id, deleted: false },
		});
		if (!permission) throw httpErrors.notFoundError('Permission', id);

		return permission;
	}

	async create(data: CreatePermissionDto) {
		const newPermission = this.permissionRepo.create(data);

		return this.permissionRepo.save(newPermission);
	}

	async update(id: number, data: UpdatePermissionDto) {
		const permission = await this.findOne(id);
		this.permissionRepo.merge(permission, data);

		return this.permissionRepo.save(permission);
	}

	async remove(id: number) {
		const permission = await this.findOne(id);
		permission.deleted = true;
		await this.permissionRepo.save(permission);
		return { message: `#${id} removed` };
	}
}
