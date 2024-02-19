import { Ad } from 'src/ad/entities/ad.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity('city')
export class City {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  province: string;

  @OneToMany(() => Ad, (ad) => ad.city)
  ads: Ad[];
}
