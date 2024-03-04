import { Module, forwardRef } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { AdModule } from '../ad/ad.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';

@Module({
  imports: [forwardRef(() => AdModule), TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService, Category],
  exports: [CategoryService],
})
export class CategoryModule {}
