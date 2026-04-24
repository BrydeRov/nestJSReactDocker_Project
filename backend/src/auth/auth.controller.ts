import { Controller, Post, Body, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Request } from 'express'

@Controller('auth')
export class AuthController { 
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  register(@Body() body: { name: string; email: string; password: string }) {
    return this.authService.register(body.name, body.email, body.password)
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: Request
  ) {
    const token = await this.authService.login(body.email, body.password);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: true, //HTTPS only
      sameSite: 'lax', // CSRF protection
      path: '/', // Cookie available on all routes
      maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days expiration
    });

    return { message: 'Login successful' };
  }
}