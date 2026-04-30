import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MovementsController } from './movements.controller';
import { MovementsService } from './movements.service';
import { Movement } from './movement.entity';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([Movement]), ProductsModule],
  controllers: [MovementsController],
  providers: [MovementsService],
  exports: [MovementsService]
})
export class MovementsModule {}
