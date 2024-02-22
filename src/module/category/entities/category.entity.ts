import { Ad } from 'src/module/ad/entities/ad.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  parentCategoryId: number;

  @OneToMany(() => Ad, (ad) => ad.category)
  ad: Ad[];

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updateAt: Date;
}

// //
// @ManyToOne(() => Category, category => category.children)
// @JoinColumn({ name: 'parentcategory_id' })
// parent: Category;

// @OneToMany(() => Category, category => category.parent)
// children: Category[];
