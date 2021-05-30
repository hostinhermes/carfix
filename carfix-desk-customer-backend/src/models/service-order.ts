import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CustomerCar } from "./customer-car.entity";
import { Customer } from "./customer.entity";
import { ServiceOrderItem } from "./service-order-item";

@Entity()
export class ServiceOrder {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    serviceOrderDescription: string;

    @Column()
    serviceOrderObservation: string;

    @Column()
    totalValue: number;

    @Column()
    status: number;
    
    @Column({type: "datetime"})
    openDate: Date

    @Column({type: "datetime"})
    closeDate: Date
   
    @Column({type: "datetime"})
    createdAt: Date

    @Column({type: "datetime", nullable: true})
    updatedAt: Date

    @ManyToOne(() => Customer, (customer) => customer.customerCars, { eager: true, cascade: true, onDelete: 'CASCADE'})
    @JoinColumn([{name: 'CustomerId', referencedColumnName: 'id'}])
    customer: Customer;

    @ManyToOne(() => CustomerCar, (customerCar) => customerCar.serviceOrders, { eager: true, cascade: true, onDelete: 'CASCADE'})
    @JoinColumn([{name: 'CustomerCarId', referencedColumnName: 'id'}])
    car: CustomerCar;

    @OneToMany(() => ServiceOrderItem, (serviceOrderItem) => serviceOrderItem.serviceOrder)
    serviceOrderItens: ServiceOrderItem[]
}