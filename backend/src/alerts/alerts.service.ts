import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Repository } from 'typeorm'
import { Alert } from './alert.entity';
import { Product } from 'src/products/product.entity';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class AlertsService {
    private logger = new Logger('AlertsService')
    
    constructor(
        @InjectRepository(Alert)
        private alertsRepository: Repository<Alert>,
        private productsService: ProductsService
    ){}
    
    findAll(): Promise<Alert[]>{
        return this.alertsRepository.find({
            relations: ['products'],
            order: { createdAt: 'DESC' }
        })
    }
    
    findUnresolved(): Promise<Alert[]>{
        return this.alertsRepository.find({
            where: { resolved: false },
            relations: ['products'],
            order: { createdAt: 'DESC' }
        })
    }

    async resolve(id: number): Promise<Alert | null>{
        await this.alertsRepository.update(id, { resolved: true })
        return this.alertsRepository.findOne({
            where: { id: id },
            relations: ['product']
        })
    }

    async createAlert(productId: number, message: string): Promise <Alert>{
        const alert = this.alertsRepository.create({
            message,
            product: { id: productId },
            channels: ['email'],
            resolved: false
        })
        
        return this.alertsRepository.save(alert)
    }

    @Cron(CronExpression.EVERY_30_SECONDS)
    async checkLowStock() {
        this.logger.log('Checking log stock . . .')
        const lowStockProducts = await this.productsService.findLowStock()

        for(const product of lowStockProducts){
            const existing = await this.alertsRepository.findOne({
                where: {
                    product: { id: product?.id },
                    resolved: false
                }
            })
                
            if(!existing){
                const alert = await this.createAlert(
                    product.id,
                    `Stock bajo: ${product?.name} tiene ${product.stock} unidades (min: ${product.minStock})`
                )
                this.logger.warn(`Alert created for product ${product.name}`)
            }
        }
    }
}
