import { Exclude } from 'class-transformer';
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'customers' })
export class Customer {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 50 })
	firstname: string;

	@Column({ type: 'varchar', length: 50, nullable: true })
	lastname: string;

	@Column({ type: 'varchar', length: 50, nullable: true })
	phone: string;

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
