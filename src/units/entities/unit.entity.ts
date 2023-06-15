import { Exclude } from 'class-transformer';
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

export enum Level {
	A_ONE = 'A1',
	A_TWO = 'A2',
	B_ONE = 'B1',
	B_TWO = 'B2',
	C_ONE = 'C1',
}

@Entity({ name: 'units' })
export class Unit {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 50 })
	unit: string;

	@Column({ type: 'varchar', length: 50 })
	title: string;

	@Column({ type: 'text' })
	storyline: string;

	@Column({ type: 'varchar', length: 50 })
	accent: string;

	@Column({ type: 'varchar', length: 50 })
	topic: string;

	@Column({ type: 'enum', enum: Level })
	level: Level;

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
