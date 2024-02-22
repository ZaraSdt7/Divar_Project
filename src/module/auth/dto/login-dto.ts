import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class LoginDto {
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
    default: '254686',
  })
  @IsString()
  @IsNotEmpty()
  code: string;
  // @ApiProperty({
  //   type: IsString,
  //   required: true,
  //   example: 'zahra_st',
  // })
  // @IsString()
  // @IsNotEmpty()
  // username: string;

  // @ApiProperty({
  //   type: IsString,
  //   required: true,
  //   description: 'Password',
  //   example: 'Password123',
  // })
  // @MinLength(8)
  // @IsString()
  // @IsStrongPassword()
  // @IsNotEmpty()
  // password: string;
}
