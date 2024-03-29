import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from '@nestjs/sequelize';
import * as path from 'node:path';

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createSequelizeOptions(): SequelizeModuleOptions {
    console.log(this.configService.get('database'));
    console.log({
      dialect: 'mysql',
      host: this.configService.get('database.sequelize.host'),
      port: this.configService.get('database.sequelize.port'),
      username: this.configService.get('database.sequelize.username'),
      password: this.configService.get('database.sequelize.password'),
      database: this.configService.get('database.sequelize.database'),
      models: [
        path.join(
          __dirname,
          '../../../database/sequelize/models/*.sequelize.model.js',
        ),
      ],
    });
    return {
      dialect: 'mysql',
      host: this.configService.get('database.sequelize.host'),
      port: this.configService.get('database.sequelize.port'),
      username: this.configService.get('database.sequelize.username'),
      password: this.configService.get('database.sequelize.password'),
      database: this.configService.get('database.sequelize.database'),
      models: [
        path.join(
          __dirname,
          '../../../database/sequelize/models/*.sequelize.model.js',
        ),
      ],
    };
  }
}
