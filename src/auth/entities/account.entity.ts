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
  username: string;

  @Column({ nullable: true })
  lastname: string;

  @Column({ nullable: true })
  firstname: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToOne(() => Authentication, (authentication) => authentication.account)
  authentication: Authentication;

  @OneToOne(() => Authorization, (authorization) => authorization.account)
  authorization: Authorization;
}
