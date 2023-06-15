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
import { UnitsService } from '../services/units.service';
import {
	CreateUnitDto,
	UnitSerializedDto,
	UpdateUnitDto,
} from '../dtos/units.dto';
import {
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import { MessageResponse } from 'src/auth/dtos/success-auth.dto';

@ApiTags('Units')
@Controller('units')
export class UnitsController {
	constructor(private unitsService: UnitsService) {}

	@Get('/')
	@ApiOkResponse({ type: UnitSerializedDto, isArray: true })
	@ApiOperation({ summary: 'Listar usuarios' })
	list() {
		return this.unitsService.list();
	}

	@Post('/')
	@ApiCreatedResponse({ type: UnitSerializedDto })
	@ApiOperation({ summary: 'Crear usuario' })
	create(@Body() data: CreateUnitDto) {
		return this.unitsService.create(data);
	}

	@Put('/:id')
	@ApiOkResponse({ type: UnitSerializedDto })
	@ApiOperation({ summary: 'Actualizar usuario' })
	update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateUnitDto) {
		return this.unitsService.update(id, data);
	}

	@Delete('/:id')
	@ApiOkResponse({ type: MessageResponse })
	@ApiOperation({ summary: 'Eliminar usuario' })
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.unitsService.remove(id);
	}
}
