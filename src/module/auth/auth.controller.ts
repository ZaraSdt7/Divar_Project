import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth-login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  async login(@Body() createAuthDto: LoginDto) {
    return await this.authService.login(createAuthDto);
  }
}
