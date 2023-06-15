import { Exclude } from 'class-transformer';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Permission } from './permission.entity';
import { View } from './view.entity';

@Entity({ name: 'roles' })
export class Role {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 255 })
	rolname: string;

	@Exclude()
	@Column({ type: 'boolean', default: 0 })
	deleted: boolean;

	@Exclude()
	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@Exclude()
	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@ManyToMany(() => Permission)
	@JoinTable({
		name: 'roles_permissions',
		joinColumn: {
			name: 'role_id',
		},
		inverseJoinColumn: {
			name: 'permission_id',
		},
	})
	permissions: Permission[];

	@ManyToMany(() => View)
	@JoinTable({
		name: 'roles_views',
		joinColumn: {
			name: 'role_id',
		},
		inverseJoinColumn: {
			name: 'view_id',
		},
	})
	views: View[];
}
