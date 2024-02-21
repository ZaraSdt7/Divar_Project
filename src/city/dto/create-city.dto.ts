import { ApiProperty } from '@nestjs/swagger';
import { IsString, isString } from '@nestjs/class-validator';
import { IsNotEmpty } from 'class-validator';
export class CreateCityDto {
  @ApiProperty({
    required: true,
    type: isString,
    description: 'Name city',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
    type: isString,
    description: 'province city',
  })
  @IsString()
  @IsNotEmpty()
  province: string;

  @ApiProperty({
    required: true,
    type: isString,
    description: 'adID city',
  })
  @IsString()
  @IsNotEmpty()
  adID: number[];
}
