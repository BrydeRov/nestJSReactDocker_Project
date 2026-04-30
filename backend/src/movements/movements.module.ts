import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MovementsController } from './movements.controller';
import { MovementsService } from './movements.service';
import { Movement } from './movement.entity';
import { Product } from 'src/products/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movement, Product])],
  controllers: [MovementsController],
  providers: [MovementsService],
  exports: [MovementsService]
})
export class MovementsModule {}
