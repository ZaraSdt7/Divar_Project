import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '../auth/entities/account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accounrepository: Repository<Account>,
  ) {}

  async findAll(): Promise<Account[]> {
    return await this.accounrepository.find();
  }
}
