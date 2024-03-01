import { Controller, Get, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { JWtAuthGuard } from '../guard/auth.guard';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('')
  @UseGuards(JWtAuthGuard)
  getAllAccounts() {
    return this.accountService.findAll();
  }
}
