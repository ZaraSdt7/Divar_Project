import {
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  Entity,
  OneToMany,
} from 'typeorm';

import { Authentication } from './auth.entity';
import { Authorization } from './authorization.entity';
import { Ad } from 'src/module/ad/entities/ad.entity';
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

  @Column({ nullable: true })
  code: string; // Field for storing OTP code

  @OneToMany(() => Ad, (ad) => ad.account)
  ads: Ad[];
  @OneToOne(() => Authentication, (authentication) => authentication.account)
  authentication: Authentication;

  @OneToOne(() => Authorization, (authorization) => authorization.account)
  authorization: Authorization;
}
