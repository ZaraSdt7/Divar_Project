import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { DatabaseModule } from './module/database/database.module';
import { AdModule } from './module/ad/ad.module';
import { CategoryModule } from './module/category/category.module';
import { CityModule } from './module/city/city.module';
import { AuthModule } from './module/auth/auth.module';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { SmsModule } from './module/sms/sms.module';
import { AccountModule } from './module/account/account.module';

@Module({
  imports: [
    DatabaseModule,
    CityModule,
    AdModule,
    CategoryModule,
    AuthModule,
    AccountModule,
    SmsModule,
    MulterModule.register({ dest: './file-uploads' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
