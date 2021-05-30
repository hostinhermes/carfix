import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CustomerCar } from "./customer-car.entity";
import { ServiceOrder } from "./service-order";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @Column({type: "date", nullable: true})
    birthdate: Date;

    @Column({nullable: true})
    address: string;

    @Column({nullable: true})
    district: string;

    @Column({nullable: true})
    city: string;

    @Column({nullable: true})
    phone: string;

    @Column({nullable: true})
    email: string;

    @Column({nullable: true})
    document: string;

    @Column({type: "datetime"})
    createdAt: Date

    @Column({type: "datetime", nullable: true})
    updatedAt: Date

    @OneToMany(() => CustomerCar, (customerCar) => customerCar.customer)
    customerCars: CustomerCar[]

    @OneToMany(() => ServiceOrder, (serviceOrder) => serviceOrder.customer)
    serviceOrders: ServiceOrder[]
}