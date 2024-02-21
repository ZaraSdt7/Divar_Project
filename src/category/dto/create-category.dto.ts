import { ApiProperty } from '@nestjs/swagger';
import { isString, IsNotEmpty, IsString } from 'class-validator';
export class CreateCategoryDto {
  @ApiProperty({
    required: true,
    type: isString,
    description: 'Name category',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
    type: isString,
    description: 'adID category',
  })
  @IsString()
  @IsNotEmpty()
  adID: number[];
}
