import { Product } from 'src/products/product.entity'
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm'

@Entity()
export class Alert{
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    message!: string

    @Column({ type: 'simple-array', default: 'email' })
    channels!: string[];

    @Column({ default: false })
    resolved!: boolean

    @CreateDateColumn()
    createdAt!: Date

    @ManyToOne(() => Product)
    product!: Product
}
