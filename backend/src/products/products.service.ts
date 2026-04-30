import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
    ){}

    findAll(): Promise<Product[]> {
        return this.productsRepository.find({ relations: ['product', 'supplier'] })
    }

    async findOne(id: number): Promise<Product>{
        const product = await this.productsRepository.findOne({
            where: { id },
            relations: ['product', 'supplier']
        });
        if (!product) throw new NotFoundException(`Product #${id} not found`)
        return product
    }

    findLowStock(): Promise<Product[]>{
        return this.productsRepository
        .createQueryBuilder('product')
        .where('product.stock <= product.minStock')
        .leftJoinAndSelect('product.category', 'category')
        .leftJoinAndSelect('product.supplier', 'supplier')
        .getMany()
    }

    create(data: Partial<Product>): Promise<Product>{
        const product = this.productsRepository.create(data)
        return this.productsRepository.save(product);
    }

    async update(id: number, data: Partial<Product>): Promise<Product>{
        await this.findOne(id);
        await this.productsRepository.update(id, data)
        return this.findOne(id)
    }

    async remove(id: number): Promise<void>{
        await this.findOne(id)
        await this.productsRepository.delete(id)
    }
}
