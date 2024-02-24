import { Module } from '@nestjs/common';
import { AdService } from './ad.service';
import { AdController } from './ad.controller';
import { CityModule } from '../city/city.module';
import { CategoryModule } from '../category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ad } from './entities/ad.entity';

@Module({
  imports: [CityModule, CategoryModule, TypeOrmModule.forFeature([Ad])],
  controllers: [AdController],
  providers: [AdService],
})
export class AdModule {}
