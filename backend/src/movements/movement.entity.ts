import { Product } from 'src/products/product.entity'
import { User } from 'src/users/user.entity'
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm'

@Entity()
export class Movement{
    @PrimaryGeneratedColumn()
    id!: number
    
    @Column({ type: 'enum', enum: ['in', 'out'] })
    type!: 'in' | 'out'

    @Column()
    quantity!: number
    
    @Column({ nullable: true })
    notes!: string

    @CreateDateColumn()
    createdAt!: Date

    @ManyToOne(() => Product, product => product.movements)
    product!: Product

    @ManyToOne(() => User, { nullable: true })
    user!: User
}

