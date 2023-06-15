import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Customer } from './customers.entity';
import { Exclude } from 'class-transformer';
import { Role } from '../../auth/entities/role.entity';

@Entity({ name: 'users' })
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 255, nullable: true })
	google_id?: string;

	@Column({ type: 'varchar', length: 255, nullable: true })
	facebook_id?: string;

	@OneToOne(() => Customer, { nullable: true })
	@JoinColumn({ name: 'customer_id' })
	customer?: Customer;

	@Exclude()
	@Column({ type: 'varchar', length: 255, nullable: true })
	password?: string;

	@Column({ type: 'varchar', length: 255 })
	email: string;

	@ManyToOne(() => Role)
	@JoinColumn({ name: 'role_id' })
	role: Role;

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
