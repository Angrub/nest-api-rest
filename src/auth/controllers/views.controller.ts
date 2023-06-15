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
import { ViewsService } from '../services/views.service';
import {
	CreateViewDto,
	UpdateViewDto,
	ViewSerializedDto,
} from '../dtos/views.dto';
import {
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import { MessageResponse } from '../dtos/success-auth.dto';

@ApiTags('Views')
@Controller('views')
export class ViewsController {
	constructor(private viewsService: ViewsService) {}

	@Get('/')
	@ApiOkResponse({ type: ViewSerializedDto, isArray: true })
	@ApiOperation({ summary: 'Listar vistas' })
	list() {
		return this.viewsService.list();
	}

	@Post('/')
	@ApiCreatedResponse({ type: ViewSerializedDto })
	@ApiOperation({ summary: 'Crear vista' })
	create(@Body() data: CreateViewDto) {
		return this.viewsService.create(data);
	}

	@Put('/:id')
	@ApiOkResponse({ type: ViewSerializedDto })
	@ApiOperation({ summary: 'Actualizar vista' })
	update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateViewDto) {
		return this.viewsService.update(id, data);
	}

	@Delete('/:id')
	@ApiOkResponse({ type: MessageResponse })
	@ApiOperation({ summary: 'Eliminar vista' })
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.viewsService.remove(id);
	}
}
