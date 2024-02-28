import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from 'src/module/city/entities/city.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('cities')
@ApiTags('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  async create(@Body() createCityDto: CreateCityDto): Promise<City> {
    return await this.cityService.create(createCityDto);
  }

  @Get()
  async findAll(): Promise<City[]> {
    return await this.cityService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<City | undefined> {
    return await this.cityService.findById([id]);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCityDto: UpdateCityDto,
  ): Promise<City> {
    return await this.cityService.update(id, updateCityDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.cityService.remove(id);
  }
}
