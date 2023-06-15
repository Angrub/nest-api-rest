import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Put,
} from '@nestjs/common';
import {
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import {
	CreateAndUpdateRoleDto,
	DeletePermissionsOrViewsDto,
	RoleSerializedDto,
} from '../dtos/roles.dto';
import { RolesService } from '../services/roles.service';
import { MessageResponse } from '../dtos/success-auth.dto';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
	constructor(private rolesService: RolesService) {}

	@Get('/')
	@ApiOkResponse({ type: RoleSerializedDto, isArray: true })
	@ApiOperation({ summary: 'Listar roles' })
	list() {
		return this.rolesService.list();
	}

	@Post('/')
	@ApiCreatedResponse({ type: RoleSerializedDto })
	@ApiOperation({ summary: 'Crear rol' })
	create(@Body() data: CreateAndUpdateRoleDto) {
		return this.rolesService.create(data);
	}

	@Put('/:id')
	@ApiOkResponse({ type: RoleSerializedDto })
	@ApiOperation({ summary: 'Actualizar rol' })
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() data: CreateAndUpdateRoleDto,
	) {
		return this.rolesService.update(id, data);
	}

	@Delete('/:id')
	@ApiOkResponse({ type: MessageResponse })
	@ApiOperation({ summary: 'Eliminar rol' })
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.rolesService.remove(id);
	}

	@Delete('/permissions/:id')
	@ApiOkResponse({ type: MessageResponse })
	@ApiOperation({ summary: 'Eliminar permisos o vistas' })
	removePermissionsOrViews(
		@Param('id', ParseIntPipe) id: number,
		@Body() data: DeletePermissionsOrViewsDto,
	) {
		return this.rolesService.removePermissionsOrViews(id, data);
	}
}
