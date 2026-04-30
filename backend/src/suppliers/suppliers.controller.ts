import { Controller, UseGuards, Body, Param, Get, Post, Put, Delete } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SuppliersService } from './suppliers.service';

@UseGuards(JwtAuthGuard)
@Controller('suppliers')
export class SuppliersController {
    constructor(private readonly suppliersService: SuppliersService) {}

    @Get()
    findAll(){
        return this.suppliersService.findAll(); 
    }
    
    @Get(':id')
    findOne(@Param('id') id: string){
        return this.suppliersService.findOne(+id);
    }

    @Post()
    create(@Body() body: { name: string; email: string, phone?: string, company?: string }){
        return this.suppliersService.create(body);
    }

    @Put(':id')
    update(@Param('id') id: number ,@Body() body: { name: string; email: string, phone?: string, company?: string }){
        return this.suppliersService.update(id, body);
    }
    
    @Delete(':id')
    remove(@Param('id') id: string){
        return this.suppliersService.remove(+id);
    }
}
