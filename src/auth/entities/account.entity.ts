import { Column, PrimaryGeneratedColumn, OneToOne, Entity } from 'typeorm';

import { Authentication } from './auth.entity';
import { Authorization } from './authorization.entity';
@Entity('account')
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: true })
  lastname: string;

  @Column({ nullable: true })
  firstname: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, unique: true })
  mobile: string;

  @Column({ nullable: false })
  password: string;

  @OneToOne(() => Authentication, (authentication) => authentication.account)
  authentication: Authentication;

  @OneToOne(() => Authorization, (authorization) => authorization.account)
  authorization: Authorization;
}
