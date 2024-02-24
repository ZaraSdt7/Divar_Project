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

  @ManyToOne(() => Category, (category) => category.ad)
  @JoinColumn({ name: 'category_id' })
  category: Category[];

  @ManyToOne(() => City, (city) => city.ad)
  @JoinColumn({ name: 'city_id' })
  city: City[];

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
  length: number;
}
