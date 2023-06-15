import { Exclude } from 'class-transformer';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Unit } from './unit.entity';

export enum ExerciseType {
	LISTENING = 'A1',
	SPEAKING = 'A2',
	WRITING = 'B1',
	GRAMMAR = 'B2',
}

@Entity({ name: 'exercises' })
export class Exercise {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Unit)
	@JoinColumn({ name: 'unit_id' })
	unit: Unit;

	@Column({ type: 'enum', enum: ExerciseType })
	type: ExerciseType;

	@Exclude()
	@Column({ type: 'boolean', default: 0 })
	deleted: boolean;

	@Exclude()
	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@Exclude()
	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;
}
