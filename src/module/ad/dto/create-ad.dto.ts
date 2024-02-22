import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  isNumber,
  isString,
} from 'class-validator';

export class CreateAdDto {
  @ApiProperty({
    required: true,
    type: isString,
    description: 'Title ad',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    required: true,
    type: isString,
    description: 'description ad',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    required: true,
    type: isNumber,
    description: 'price ad',
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    type: isString,
    description: 'image ad',
  })
  @IsString()
  image: string;

  @ApiProperty({
    required: true,
    type: isNumber,
    description: 'cityID ad',
  })
  @IsNumber()
  @IsNotEmpty()
  cityID: number[];

  @ApiProperty({
    required: true,
    type: isNumber,
    description: 'category ad',
  })
  @IsNumber()
  @IsNotEmpty()
  categoryID: number[];
}
