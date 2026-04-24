import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('dashboard')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req) {
    return req.user; // Assuming the user info is attached to the request by the JwtAuthGuard
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getDashboard(@Req() req) {
    return req.user; // Assuming the user info is attached to the request by the JwtAuthGuard
  }
}
