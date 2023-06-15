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
import { User } from 'src/users/entities/users.entity';
import { Exercise } from './exercise.entity';

@Entity({ name: 'customer_progress' })
export class CustomerProgress {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user: User;

	@ManyToOne(() => Exercise)
	@JoinColumn({ name: 'exercise_id' })
	exercise: Exercise;

	@CreateDateColumn({ name: 'completed_at', nullable: true })
	completedAt: Date;

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
