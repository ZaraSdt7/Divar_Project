import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { AdService } from './ad.service';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import { Ad } from './entities/ad.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('ads')
@ApiTags('ad')
export class AdController {
  constructor(private readonly adService: AdService) {}

  @Post()
  async create(@Body() createAdDto: CreateAdDto): Promise<Ad> {
    return await this.adService.create(createAdDto);
  }

  @Get()
  async findAll(): Promise<Ad[]> {
    return await this.adService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Ad | undefined> {
    return await this.adService.findById([id]);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateAdDto: UpdateAdDto,
  ): Promise<Ad> {
    return await this.adService.update(id, updateAdDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.adService.remove(id);
  }
}
