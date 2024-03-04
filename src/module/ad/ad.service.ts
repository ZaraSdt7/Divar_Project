import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ad } from './entities/ad.entity';
import { In, Repository } from 'typeorm';

import { CityService } from '../city/city.service';
import { CategoryService } from '../category/category.service';

@Injectable()
export class AdService {
  constructor(
    @InjectRepository(Ad) private readonly adrepository: Repository<Ad>,
    @Inject(forwardRef(() => CityService))
    private readonly cityservice: CityService,
    @Inject(forwardRef(() => CategoryService))
    private readonly categoryserice: CategoryService,
  ) {}
  async create(createAdDto: CreateAdDto): Promise<Ad> {
    const { title, description, price, image, cityID, categoryID } =
      createAdDto;
    try {
      const city = await this.cityservice.findById(cityID);
      const category = await this.categoryserice.findbyid(categoryID);
      if (!category || !city) {
        throw new HttpException(
          'City or Category not found',
          HttpStatus.NOT_FOUND,
        );
      }
      const ad = new Ad();
      ad.title = title;
      ad.description = description;
      ad.price = price;
      ad.image = image; // Store image URL after upload

      return await this.adrepository.save(ad);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'ّError create Ad: ' + error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  async update(id: number, updateAdDto: UpdateAdDto): Promise<Ad> {
    try {
      const updated = await this.adrepository.findOne({ where: { id: id } });

      if (!updated) {
        throw new NotFoundException('AdID not found');
      }

      const { title, description, price, image, cityID, categoryID } =
        updateAdDto;

      if (cityID) {
        const foundcity = await this.cityservice.findById(updateAdDto.cityID);
        if (!foundcity) {
          throw new NotFoundException('Invalid city ID');
        }
      }
      if (categoryID) {
        const category = await this.categoryserice.findbyid(
          updateAdDto.categoryID,
        );
        if (!category) {
          throw new NotFoundException('Invalid category ID');
        }
        // Update other properties
        updated.title = title ?? updated.title;
        updated.description = description ?? updated.description;
        updated.price = price ?? updated.price;
        updated.image = image ?? updated.image;

        return await this.adrepository.save(updated);
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'ّError update Ad: ' + error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }
  async findAll(): Promise<Ad[]> {
    return await this.adrepository.find({ relations: ['city', 'category'] }); // Fetch related entities
  }

  async findById(ids: number[]): Promise<Ad | undefined> {
    return await this.adrepository.findOne({
      where: { id: In(ids) },
      relations: ['city', 'category'], // Adjust based on your needs
    });
  }

  async remove(id: number): Promise<void> {
    const ad = await this.adrepository.findOne({ where: { id: id } });

    if (!ad) {
      throw new NotFoundException('Ad not found');
    }

    await this.adrepository.delete(ad);
  }
}
