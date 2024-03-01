import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Authentication } from './entities/auth.entity';
import { Authorization } from './entities/authorization.entity';
import { AuthenticationData } from './entities/authdata.entity';
import { AuthorizationData } from './entities/authorizdata';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuardAuth } from '../guard/guard.jwt';
import { SmsModule } from '../sms/sms.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Account,
      Authentication,
      Authorization,
      AuthenticationData,
      AuthorizationData,
      SmsModule,
    ]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.SECRET_KEY,
        signOptions: {
          expiresIn: '10 days',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtGuardAuth],
})
export class AuthModule {}
