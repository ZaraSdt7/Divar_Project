import {
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Entity,
} from 'typeorm';
import { User } from './user.entity';
import { Authentication } from './auth.entity';
import { Authorization } from './authorization.entity';
@Entity('account')
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nickname: string;

  @OneToOne(() => User, (user) => user.account)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Authentication, (authentication) => authentication.account)
  authentication: Authentication;

  @OneToOne(() => Authorization, (authorization) => authorization.account)
  authorization: Authorization;
}
