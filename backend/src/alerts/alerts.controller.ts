import { Controller, UseGuards, Get, Put, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AlertsService } from './alerts.service';

@UseGuards(JwtAuthGuard)
@Controller('alerts')
export class AlertsController {
    constructor(private readonly alertsService: AlertsService) {}

    @Get()
    findAll(){
        return this.alertsService.findAll()
    }

    @Get('unresolved')
    findUnresolved(){
        return this.alertsService.findUnresolved()
    }

    @Put(':id/resolve')
    resolve(@Param('id') id: string){
        return this.alertsService.resolve(+id)
    }
}
