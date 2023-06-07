import { User } from '../../users/entities/users.entity';
import {
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'verification_code' })
export class VerificationCode {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	userId: User;

	@Column({ type: 'varchar', length: 8 })
	code: string;

	@Column({ type: 'datetime', name: 'expiration_date' })
	expirationDate: Date;
}
