import { Controller, UseGuards, Body, Param, Get, Post, Put, Delete } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CategoriesService } from './categories.service';

@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get()
    findAll(){
        return this.categoriesService.findAll(); 
    }
    
    @Get(':id')
    findOne(@Param('id') id: string){
        return this.categoriesService.findOne(+id);
    }

    @Post()
    create(@Body() body: { name: string; description: string }){
        return this.categoriesService.create(body);
    }

    @Put(':id')
    update(@Param('id') id: number ,@Body() body: { name: string; description: string }){
        return this.categoriesService.update(id, body);
    }
    
    @Delete(':id')
    remove(@Param('id') id: string){
        return this.categoriesService.remove(+id);
    }
}
