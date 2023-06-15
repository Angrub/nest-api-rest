import { UsersService } from '../services/users.service';
import {
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import { MessageResponse } from 'src/auth/dtos/success-auth.dto';
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common';
import {
	CreateUserDto,
	UpdateUserDto,
	UserSerializedDto,
} from '../dtos/users.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('Users')
@ApiBearerAuth()
// @UseGuards(JwtGuard, RolesGuard)
@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Get('/')
	@ApiOkResponse({ type: UserSerializedDto, isArray: true })
	@ApiOperation({ summary: 'Listar usuarios' })
	list() {
		return this.usersService.list();
	}

	@Post('/')
	@ApiCreatedResponse({ type: UserSerializedDto })
	@ApiOperation({ summary: 'Crear usuario' })
	create(@Body() data: CreateUserDto) {
		return this.usersService.create(data);
	}

	@Put('/:id')
	@ApiOkResponse({ type: UserSerializedDto })
	@ApiOperation({ summary: 'Actualizar usuario' })
	update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateUserDto) {
		return this.usersService.update(id, data);
	}

	@Delete('/:id')
	@ApiOkResponse({ type: MessageResponse })
	@ApiOperation({ summary: 'Eliminar usuario' })
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.usersService.remove(id);
	}
}
