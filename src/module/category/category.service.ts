import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { In, Repository } from 'typeorm';
import { AdService } from '../ad/ad.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly adservice: AdService,
  ) {}
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const newcat = new Category();
      newcat.name = createCategoryDto.name;
      if (createCategoryDto.adID) {
        const ads = await this.adservice.findById(createCategoryDto.adID);
        if (!ads) {
          throw new HttpException(
            'Invalid adID provided',
            HttpStatus.BAD_REQUEST,
          );
        }
        // Add ad to category
        newcat.ad = ads[0];
      }
      const created = await this.categoryRepository.create(createCategoryDto);
      return created;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'ّError create category: ' + error,
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
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    try {
      // 1. Find the category to update
      const category = await this.categoryRepository.findOne({
        where: { id: id },
      });
      if (!category) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }

      // 2. Update category properties based on UpdateCategoryDto
      category.name = updateCategoryDto.name ?? category.name; // Update only if provided
      // Add other properties to be updated based on your data model

      // 3. Save the updated category
      return await this.categoryRepository.save(category);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'ّError update category: ' + error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }
  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findbyid(id: number[]): Promise<Category | undefined> {
    return await this.categoryRepository.findOne({
      where: { id: In(id) },
      relations: ['category'],
    });
  }

  async remove(id: number): Promise<void> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Could not found Category with ID "${id}"`);
    }
    await this.categoryRepository.delete(category);
  }
}
