import { Module, forwardRef } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { AdModule } from '../ad/ad.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';

@Module({
  imports: [forwardRef(() => AdModule), TypeOrmModule.forFeature([City])],
  controllers: [CityController],
  providers: [CityService, City],
})
export class CityModule {}
