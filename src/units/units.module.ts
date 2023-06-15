import { Module } from '@nestjs/common';
import { UnitsService } from './services/units.service';
import { ExercisesService } from './services/exercises.service';
import { UnitsController } from './controllers/units.controller';
import { ExercisesController } from './controllers/exercises.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unit } from './entities/unit.entity';
import { Exercise } from './entities/exercise.entity';
import { CustomerProgress } from './entities/customer-progress.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Unit, Exercise, CustomerProgress])],
	providers: [UnitsService, ExercisesService],
	controllers: [UnitsController, ExercisesController],
})
export class UnitsModule {}
