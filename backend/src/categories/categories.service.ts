import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,
    ){}

    findAll(): Promise<Category[]> {
        return this.categoriesRepository.find({ relations: ['products'] })
    }

    async findOne(id: number): Promise<Category>{
        const category = await this.categoriesRepository.findOne({
            where: { id },
            relations: ['products']
        });
        if (!category) throw new NotFoundException(`Category #${id} not found`)
        return category
    }

    create(data: Partial<Category>): Promise<Category>{
        const category = this.categoriesRepository.create(data)
        return this.categoriesRepository.save(category);
    }

    async update(id: number, data: Partial<Category>): Promise<Category>{
        await this.findOne(id);
        await this.categoriesRepository.update(id, data)
        return this.findOne(id)
    }

    async remove(id: number): Promise<void>{
        await this.findOne(id)
        await this.categoriesRepository.delete(id)
    }
}
