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

  async register(register: RegisterDto): Promise<ResponseFormat<any>> {
    
  }
  async login(logindto: LoginDto): Promise<ResponseFormat<any>> {}
}
