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
import { ExercisesService } from '../services/exercises.service';
import {
	CreateExerciseDto,
	ExerciseSerializedDto,
	UpdateExerciseDto,
} from '../dtos/exercise.dto';
import { MessageResponse } from 'src/auth/dtos/success-auth.dto';

@ApiTags('Exercises')
@Controller('exercises')
export class ExercisesController {
	constructor(private exercisesService: ExercisesService) {}

	@Get('/')
	@ApiOkResponse({ type: ExerciseSerializedDto, isArray: true })
	@ApiOperation({ summary: 'Listar usuarios' })
	list() {
		return this.exercisesService.list();
	}

	@Post('/')
	@ApiCreatedResponse({ type: ExerciseSerializedDto })
	@ApiOperation({ summary: 'Crear usuario' })
	create(@Body() data: CreateExerciseDto) {
		return this.exercisesService.create(data);
	}

	@Put('/:id')
	@ApiOkResponse({ type: ExerciseSerializedDto })
	@ApiOperation({ summary: 'Actualizar usuario' })
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() data: UpdateExerciseDto,
	) {
		return this.exercisesService.update(id, data);
	}

	@Delete('/:id')
	@ApiOkResponse({ type: MessageResponse })
	@ApiOperation({ summary: 'Eliminar usuario' })
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.exercisesService.remove(id);
	}
}
