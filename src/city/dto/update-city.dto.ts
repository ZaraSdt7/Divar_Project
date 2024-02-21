import { ApiProperty } from '@nestjs/swagger';
import { isString, IsString } from '@nestjs/class-validator';
import { IsOptional } from 'class-validator';

export class UpdateCityDto {
  @ApiProperty({
    type: isString,
    description: 'Name city',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    required: true,
    type: isString,
    description: 'province city',
  })
  @IsString()
  @IsOptional()
  province?: string;

  @ApiProperty({
    required: true,
    type: isString,
    description: 'adID city',
  })
  @IsString()
  @IsOptional()
  adID?: number[];
}
