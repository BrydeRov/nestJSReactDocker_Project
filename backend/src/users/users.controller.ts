import { Controller, Get } from '@nestjs/common'
import { UsersService } from './users.service'

@Controller('users')   // ← ¿tiene 'users' aquí?
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()               // ← ¿tiene @Get() sin parámetros?
    findAll() {
        return this.usersService.findAll()
    }
}