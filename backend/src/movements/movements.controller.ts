import { Controller, UseGuards, Get, Post, Param, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MovementsService } from './movements.service';

@UseGuards(JwtAuthGuard)
@Controller('movements')
export class MovementsController {
    constructor(private readonly movementService: MovementsService) {}

    @Get()
    findAll(){
        return this.movementService.findAll();
    }

    @Get('product/:productId')
    findByProduct(@Param('productId') productId: string){
        return this.movementService.findByProduct(+productId);
    }

    @Post()
    create(@Body() body: {
        type: 'in' | 'out',
        quantity: number,
        productId: number,
        userId?: number,
        notes?: string
    }){
        return this.movementService.create(body);
    }
}
