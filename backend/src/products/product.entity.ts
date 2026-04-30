import { Category } from 'src/categories/category.entity'
import { Movement } from 'src/movements/movement.entity'
import { Supplier } from 'src/suppliers/supplier.entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

@Entity()
export class Product{
    @PrimaryGeneratedColumn()
    id!:number

    @Column()
    name!: string

    @Column('decimal', { precision: 10, scale: 2 })
    price!: number
    
    @Column({ default: 0 })
    stock!: number

    @Column({ default: 10 })
    minStock!: number

    @ManyToOne(() => Category, category => category.products, { nullable: true })
    category!: Category

    @ManyToOne(() => Supplier, supplier => supplier.products, { nullable: true })
    supplier!: Supplier

    @ManyToOne(() => Movement, movement => movement.product, { nullable: true })
    movements!: Movement
}