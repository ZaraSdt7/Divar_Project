import { PartialType } from '@nestjs/swagger';
import { CreateAdDto } from './create-ad.dto';

export class UpdateAdDto extends PartialType(CreateAdDto) {}
