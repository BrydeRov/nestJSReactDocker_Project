import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    findAll(): Promise<User[]> {
        return this.usersRepository.find()
    }

    async findByEmail(email: string) {
        return this.usersRepository
            .createQueryBuilder('user')
            .addSelect('user.password')   // ← only here, only when needed
            .where('user.email = :email', { email })
            .getOne()
    }

    async findById(id: number) {
        return this.usersRepository.findOne({ where: { id } })
        // password is excluded automatically by select: false ✅
    }

    create(name: string, email: string, password: string): Promise<User> {
        const user = this.usersRepository.create({ name, email, password })
        return this.usersRepository.save(user)
    }
}