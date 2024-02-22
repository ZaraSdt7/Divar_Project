import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: IsString,
    required: true,
    example: 'zahra_st',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    type: IsString,
    required: true,
    description: 'Password',
    example: 'Password123',
  })
  @MinLength(8)
  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
