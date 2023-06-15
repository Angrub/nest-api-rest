import { Exclude } from 'class-transformer';
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'views' })
export class View {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 255 })
	menu: string;

	@Column({ type: 'varchar', length: 255 })
	name: string;

	@Column({ type: 'varchar', length: 255 })
	path: string;

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
