import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movement } from './movement.entity';
import { Product } from 'src/products/product.entity';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class MovementsService {
    constructor(
        @InjectRepository(Movement)
        private movementsRepository: Repository<Movement>,
        private productsService: ProductsService
    ){}

    findAll(): Promise<Movement[]> {
        return this.movementsRepository.find({ relations: ['product', 'user'], order: { createdAt: 'DESC' } })
    }

    async findByProduct(productId: number): Promise<Movement[]>{
        return this.movementsRepository.find({
            where: { product: { id: productId } },
            relations: ['product', 'user'],
            order: { createdAt: 'DESC' }
        })
    }

    async create(data: {
        type: 'in' | 'out',
        quantity: number,
        productId: number,
        userId?: number,
        notes?: string
    }): Promise<Movement>{
        const product = await this.productsService.findOne(data.productId);
                
        if (!product) {
        throw new NotFoundException('Product not found');
        }

        const newStock = data.type === 'in'
        ? product?.stock + data.quantity
        : product?.stock - data.quantity

        if (newStock < 0) throw new NotFoundException('Stock Insuficiente');
        
        await this.productsService.update(data.productId, { stock: newStock });

        const movement = this.movementsRepository.create({
            type: data.type,
            quantity: data.quantity,
            notes: data.notes,
            product: { id: data.productId },
            user: data.userId ?  { id: data.userId } : undefined
        })

        return this.movementsRepository.save(movement)
    }
}
