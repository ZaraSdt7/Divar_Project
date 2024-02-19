import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AdModule } from './ad/ad.module';
import { CategoryModule } from './category/category.module';
import { CityModule } from './city/city.module';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    AdModule,
    CategoryModule,
    CityModule,
    MulterModule.register({ dest: './file-uploads' }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
