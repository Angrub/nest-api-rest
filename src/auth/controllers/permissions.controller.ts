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
	CreatePermissionDto,
	PermissionSerializedDto,
	UpdatePermissionDto,
} from '../dtos/permissions.dto';
import {
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import { PermissionsService } from '../services/permissions.service';
import { MessageResponse } from '../dtos/success-auth.dto';

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionsController {
	constructor(private permissionsService: PermissionsService) {}

	@Get('/')
	@ApiOkResponse({ type: PermissionSerializedDto, isArray: true })
	@ApiOperation({ summary: 'Listar permisos' })
	list() {
		return this.permissionsService.list();
	}

	@Post('/')
	@ApiCreatedResponse({ type: PermissionSerializedDto })
	@ApiOperation({ summary: 'Crear permiso' })
	create(@Body() data: CreatePermissionDto) {
		return this.permissionsService.create(data);
	}

	@Put('/:id')
	@ApiOkResponse({ type: PermissionSerializedDto })
	@ApiOperation({ summary: 'Actualizar permiso' })
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() data: UpdatePermissionDto,
	) {
		return this.permissionsService.update(id, data);
	}

	@Delete('/:id')
	@ApiOkResponse({ type: MessageResponse })
	@ApiOperation({ summary: 'Eliminar permiso' })
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.permissionsService.remove(id);
	}
}
