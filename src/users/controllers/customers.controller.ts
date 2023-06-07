import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	ParseIntPipe,
	Post,
	Put,
} from '@nestjs/common';
import {
	CreateCustomerDto,
	CustomerSerializedDto,
	UpdateCustomerDto,
} from '../dtos/customers.dto';
import { CustomersService } from '../services/customers.service';
import {
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import { MessageResponse } from 'src/auth/dtos/success-login.dto';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
	constructor(private customersService: CustomersService) {}

	@Get('/')
	@ApiOkResponse({ type: CustomerSerializedDto, isArray: true })
	@ApiOperation({ summary: 'Listar clientes' })
	list() {
		return this.customersService.list();
	}

	@Get('/:id')
	@ApiOkResponse({ type: CustomerSerializedDto })
	@ApiOperation({ summary: 'Detalles del cliente' })
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.customersService.findOne(id);
	}

	@Post('/')
	@ApiCreatedResponse({ type: CustomerSerializedDto })
	@ApiOperation({ summary: 'Crear cliente' })
	@HttpCode(HttpStatus.CREATED)
	create(@Body() data: CreateCustomerDto) {
		return this.customersService.create(data);
	}

	@Put('/:id')
	@ApiOkResponse({ type: CustomerSerializedDto })
	@ApiOperation({ summary: 'Actualizar cliente' })
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() data: UpdateCustomerDto,
	) {
		return this.customersService.update(id, data);
	}

	@Delete('/:id')
	@ApiOkResponse({ type: MessageResponse })
	@ApiOperation({ summary: 'Listar clientes' })
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.customersService.remove(id);
	}
}
