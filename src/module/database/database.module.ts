import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SequelizeConfigService } from './sequelize.service';
import * as databaseconfig from './database.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env`],
      isGlobal: true,
      load: [() => ({ database: databaseconfig })],
    }),
    SequelizeModule.forRootAsync({
      useClass: SequelizeConfigService,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          autoLoadEntities: true,
          synchronize: false,
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        };
      },
    }),
  ],
})
export class DatabaseModule {}
