import { Entity, Column, PrimaryGeneratedColumn,OneToMany } from 'typeorm'
import { Product } from 'src/products/product.entity'

@Entity()
export class Category{
    @PrimaryGeneratedColumn()
    id!: number
    
    @Column()
    name!: string

    @Column({ nullable: true })
    description!: string

    @OneToMany(() => Product, product => product.category)
    products!: Product[]
}