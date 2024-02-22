import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Authentication } from './auth.entity';

@Entity()
export class AuthenticationData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  value: string;

  @OneToOne(() => Authentication, (authentication) => authentication)
  @JoinColumn({ name: 'authentication_id' })
  authentication: Authentication;
}
