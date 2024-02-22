import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './account.entity';

@Entity('auth')
export class Authentication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @OneToOne(() => Account, (account) => account.authentication)
  @JoinColumn({ name: 'account_id' })
  account: Account;
}
