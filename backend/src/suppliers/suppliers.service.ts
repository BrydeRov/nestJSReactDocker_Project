import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from './supplier.entity';

@Injectable()
export class SuppliersService {
    constructor(
        @InjectRepository(Supplier)
        private supplierRepository: Repository<Supplier>,
    ){}

    findAll(): Promise<Supplier[]> {
        return this.supplierRepository.find({ relations: ['products'] })
    }

    async findOne(id: number): Promise<Supplier>{
        const supplier = await this.supplierRepository.findOne({
            where: { id },
            relations: ['products']
        });
        if (!supplier) throw new NotFoundException(`Supplier #${id} not found`)
        return supplier
    }

    create(data: Partial<Supplier>): Promise<Supplier>{
        const supplier = this.supplierRepository.create(data)
        return this.supplierRepository.save(supplier);
    }

    async update(id: number, data: Partial<Supplier>): Promise<Supplier>{
        await this.findOne(id);
        await this.supplierRepository.update(id, data)
        return this.findOne(id)
    }

    async remove(id: number): Promise<void>{
        await this.findOne(id)
        await this.supplierRepository.delete(id)
    }
}
