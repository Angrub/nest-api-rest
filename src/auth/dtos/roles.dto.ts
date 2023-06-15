import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsPositive, MaxLength } from 'class-validator';
import { PermissionSerializedDto } from './permissions.dto';
import { ViewSerializedDto } from './views.dto';

export class CreateAndUpdateRoleDto {
	@MaxLength(255)
	@IsNotEmpty()
	@ApiProperty({ description: 'Nombre del rol, puesto, etc' })
	readonly rolname: string;

	@IsPositive({ each: true })
	@IsOptional()
	readonly permissions_ids?: number[];

	@IsPositive({ each: true })
	@IsOptional()
	readonly views_ids?: number[];
}

export class DeletePermissionsOrViewsDto {
	@IsPositive({ each: true })
	@IsOptional()
	readonly permissions_ids?: number[];

	@IsPositive({ each: true })
	@IsOptional()
	readonly views_ids?: number[];
}

export class RoleWithoutRelationSerializedDto {
	readonly id: number;
	readonly rolname: string;
}

export class RoleSerializedDto extends RoleWithoutRelationSerializedDto {
	readonly permissions_ids: PermissionSerializedDto[];
	readonly views_ids: ViewSerializedDto[];
}
