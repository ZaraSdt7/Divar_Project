import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Account } from './entities/account.entity';
import { Authentication } from './entities/auth.entity';
import { Authorization } from './entities/authorization.entity';
import { AuthenticationData } from './entities/authdata.entity';
import { AuthorizationData } from './entities/authorizdata';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Account,
      Authentication,
      Authorization,
      AuthenticationData,
      AuthorizationData,
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
