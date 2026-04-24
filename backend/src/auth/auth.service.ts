import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcrypt'

interface User {
  id: number;
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async login(email: string, password: string) {
    const user: User | null = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Credenciales inválidas')

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) throw new UnauthorizedException('Credenciales inválidas')

    const payload = { sub: user.id, email: user.email }
    return this.jwtService.sign(payload)
  }

  async register(name: string, email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10)
    return this.usersService.create(name, email, hashed)
  }
}