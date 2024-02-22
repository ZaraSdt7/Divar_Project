import { isString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({
    type: isString,
    description: 'Name category',
  })
  @IsString()
  @IsOptional()
  name?: string;
}
