import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './account.entity';

@Entity('Authorization')
export class Authorization {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  type: string;

  @OneToOne(() => Account, (account) => account.authorization)
  @JoinColumn({ name: 'account_id' })
  account: Account;
}
