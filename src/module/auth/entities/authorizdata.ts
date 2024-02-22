import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Authorization } from './authorization.entity';
@Entity()
export class AuthorizationData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  value: string;

  @OneToOne(() => Authorization, (authorization) => authorization)
  @JoinColumn({ name: 'authorization_id' })
  authorization: Authorization;
}
