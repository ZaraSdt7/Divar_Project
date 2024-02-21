import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  isString,
  isNumber,
} from 'class-validator';

export class UpdateAdDto {
  @ApiProperty({
    type: isString,
    description: 'Title ad',
  })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({
    type: isString,
    description: 'description ad',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    required: true,
    type: isNumber,
    description: 'price ad',
  })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({
    type: isString,
    description: 'image ad',
  })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({
    required: true,
    type: isNumber,
    description: 'cityID ad',
  })
  @IsNumber()
  @IsOptional()
  cityID?: number[];

  @ApiProperty({
    required: true,
    type: isNumber,
    description: 'category ad',
  })
  @IsNumber()
  @IsOptional()
  categoryID?: number[];
}
