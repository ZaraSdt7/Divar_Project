import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    type: IsString,
    required: true,
    example: 'zahra_st',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    type: IsEmail,
    required: true,
    description: 'Email address',
    example: 'zahra.s44@example.com',
  })
  @IsEmail()
  @MaxLength(100)
  @IsOptional()
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Insert mobile',
    example: '09377775210',
    // default: null,
  })
  @ValidateIf((o) => o.mobile !== null)
  @IsNotEmpty()
  @IsString()
  mobile: string;

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
