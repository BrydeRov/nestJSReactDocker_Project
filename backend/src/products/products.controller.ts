import { Controller, UseGuards, Body, Param, Get, Post, Put, Delete } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProductsService } from './products.service';

@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    findAll(){
        return this.productsService.findAll(); 
    }

    @Get('low-stock')
    findLowStock(){
        return this.productsService.findLowStock()
    }
    
    @Get(':id')
    findOne(@Param('id') id: string){
        return this.productsService.findOne(+id);
    }

    @Post()
    create(@Body() body: { 
        name: string,
        price: number,
        stock: number,
        minStock?: number,
        categoryId?: number,
        supplierId?: number
    }){
        return this.productsService.create(body);
    }

    @Put(':id')
    update(@Param('id') id: number ,@Body() body: { 
        name: string,
        price: number,
        stock: number,
        minStock?: number,
        categoryId?: number,
        supplierId?: number
    }){
        return this.productsService.update(id, body);
    }
    
    @Delete(':id')
    remove(@Param('id') id: string){
        return this.productsService.remove(+id);
    }
}
