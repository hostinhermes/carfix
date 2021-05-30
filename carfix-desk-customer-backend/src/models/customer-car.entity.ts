import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./customer.entity";
import { ServiceOrder } from "./service-order";

@Entity()
export class CustomerCar {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    brand: string;
    
    @Column()
    modelName: string;

    @Column({nullable: true})
    year: string;

    @Column({nullable: true})
    km: string;

    @Column({nullable: true})
    licensePlate: string;
   
    @Column({type: "datetime"})
    createdAt: Date

    @Column({type: "datetime", nullable: true})
    updatedAt: Date

    @ManyToOne(() => Customer, (customer) => customer.customerCars, { eager: true, cascade: true, onDelete: 'CASCADE'})
    @JoinColumn([{name: 'CustomerId', referencedColumnName: 'id'}])
    customer: Customer;

    @OneToMany(() => ServiceOrder, (serviceOrder) => serviceOrder.car)
    serviceOrders: ServiceOrder[]
}