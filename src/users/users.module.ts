import { Module } from '@nestjs/common';
import { CustomersService } from './services/customers.service';
import { UsersService } from './services/users.service';
import { CustomersController } from './controllers/customers.controller';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customers.entity';
import { User } from './entities/users.entity';

@Module({
	imports: [TypeOrmModule.forFeature([User, Customer])],
	controllers: [UsersController, CustomersController],
	providers: [UsersService, CustomersService],
	exports: [UsersService, CustomersService],
})
export class UsersModule {}
