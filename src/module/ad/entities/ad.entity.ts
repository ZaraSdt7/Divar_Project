import { Account } from 'src/module/auth/entities/account.entity';
import { Category } from 'src/module/category/entities/category.entity';
import { City } from 'src/module/city/entities/city.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ad')
export class Ad {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => Account, (account) => account.ads, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @ManyToOne(() => Category, (category) => category.ad, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category: Category[];

  @ManyToOne(() => City, (city) => city.ad, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'city_id' })
  city: City[];

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
  length: number;
}
