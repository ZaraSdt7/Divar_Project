import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { AdService } from '../ad/ad.service';
import { City } from './entities/city.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityrepository: Repository<City>,
    @Inject(forwardRef(() => AdService))
    private readonly adservice: AdService,
  ) {}
  async create(createCityDto: CreateCityDto): Promise<City> {
    try {
      const { name, province, adID } = createCityDto;
      const newcity = new City();
      newcity.name = name;
      newcity.province = province;
      //find adservice by id
      const adfound = await this.adservice.findById(adID);
      //check if city already exists in the database
      if (!adfound) {
        throw new HttpException('Ad not found', HttpStatus.NOT_FOUND);
      }
      const created = await this.cityrepository.create(createCityDto);
      return created;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'ّError create city: ' + error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  async update(
    id: number,
    updateCityDto: UpdateCityDto,
  ): Promise<City | undefined> {
    try {
      const city = await this.cityrepository.findOne({ where: { id: id } });
      if (!city) {
        throw new NotFoundException('city not found');
      }

      // 2.check adID
      if (updateCityDto.adID) {
        const adData = await this.adservice.findById(updateCityDto.adID);
        if (!adData || adData.length !== updateCityDto.adID.length) {
          throw new BadRequestException('adID not found');
        }
      }

      city.name = updateCityDto.name ?? city.name;
      city.province = updateCityDto.province ?? city.province;

      await this.cityrepository.save(city);
      return city;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'ّError update city: ' + error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }
  async findAll(): Promise<City[]> {
    return await this.cityrepository.find({ relations: ['ads'] });
  }

  async findById(ids: number[]): Promise<City | undefined> {
    return await this.cityrepository.findOne({
      where: { id: In(ids) },
      relations: ['ads'], // Adjust based on your needs
    });
  }

  async remove(id: number): Promise<void> {
    const city = await this.cityrepository.findOne({ where: { id } });
    if (!city) {
      throw new HttpException('City not found', HttpStatus.NOT_FOUND);
    }
    await this.cityrepository.delete(city);
  }
}
