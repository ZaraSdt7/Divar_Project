import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';
import { SmsService } from '../sms/sms.service';
import { ResponseFormat } from '../constants/response-format.interface';
import { ResponseMessages } from '../constants/response-messages.constant';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register-dto';
import { Redis } from 'ioredis';

@Injectable()
export class AuthService {
  private readonly redisClient: Redis;
  constructor(
    @InjectRepository(Account)
    private readonly accountrepository: Repository<Account>,
    private readonly smsservice: SmsService,
    private jwtservice: JwtService,
  ) {
    this.redisClient = new Redis({
      host: 'localhost',
      port: 6379,
    });
  }

  async register(register: RegisterDto): Promise<ResponseFormat<any>> {}
  async login(logindto: LoginDto): Promise<ResponseFormat<any>> {}
}
//   const existingAccount = await this.accountrepository.findOne({
//     where: { mobile: logindto.mobile },
//   });
//   const otpcode = await this.smsservice.sendOtpcode(
//     existingAccount.mobile,
//     existingAccount.code,
//   );
//   if (existingAccount) {
//     // check otpcode
//     if (existingAccount.code !== otpcode) {
//       throw new UnauthorizedException(
//         ResponseMessages.CODE_SENT_IS_NOT_CORRECT,
//       );
//     }
//     await this.accountrepository.save(existingAccount);
//     return {
//       statusCode: HttpStatus.CREATED,
//       message: 'login successful',
//     };
//   } else {
//     return {
//       statusCode: HttpStatus.NOT_FOUND,
//       message: 'please create account',
//     };
//   }
// }
// private generateRandomNumber(): string {
//   const minm = 100000,
//     maxm = 999999;
//   const code = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
//   return String(code);
// }
