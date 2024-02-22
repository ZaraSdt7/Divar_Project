import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ad } from './entities/ad.entity';
import { Repository } from 'typeorm';
import { City } from '../city/entities/city.entity';
import { Category } from '../category/entities/category.entity';

@Injectable()
export class AdService {
  constructor(
    @InjectRepository(Ad) private readonly adrepository: Repository<Ad>,
    @InjectRepository(City) private readonly cityrepository: Repository<City>,
    @InjectRepository(Category)
    private readonly categoryrepository: Repository<Category>,
  ) {}
  async create(createAdDto: CreateAdDto): Promise<Ad> {
    const { title, description, price, image, cityID, categoryID } =
      createAdDto;
    try {
      const city = await this.cityrepository.findOne({ where: { id: cityID } });
      const category = await this.categoryrepository.findOne({
        where: { id: categoryID },
      });
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
        const foundcity = await this.cityrepository.findOne({
          where: { id: cityID },
        });
        if (!foundcity) {
          throw new NotFoundException('Invalid city ID');
        }
        updated.city = foundcity;
      }

      if (categoryID) {
        const category = await this.categoryrepository.findOne({
          where: { id: categoryID },
        });
        if (!category) {
          throw new NotFoundException('Invalid category ID');
        }
        updated.category = category;
      }

      // Update other properties

      updated.title = title ?? updated.title;
      updated.description = description ?? updated.description;
      updated.price = price ?? updated.price;
      updated.image = image ?? updated.image;

      return await this.adrepository.save(updated);
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

  async findOne(id: number): Promise<Ad | undefined> {
    return await this.adrepository.findOne({
      where: { id },
      relations: ['city', 'category'],
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
