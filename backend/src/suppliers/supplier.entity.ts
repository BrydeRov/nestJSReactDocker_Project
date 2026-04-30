import { Product } from 'src/products/product.entity'
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

@Entity()
export class Supplier{
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    email!: string

    @Column({ nullable: true })
    phone!: string

    @Column({ nullable: true })
    company!: string

    @OneToMany(() => Product, product => product.supplier)
    products!: Product[]
}
