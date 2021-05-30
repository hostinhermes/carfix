import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ServiceOrder } from "./service-order";

@Entity()
export class ServiceOrderItem {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    itenDescription: string;

    @Column()
    totalValue: number;

    @Column()
    unitValue: number;

    @Column()
    quantity: number;

    @Column()
    unity: string;
   
    @Column({type: "datetime"})
    createdAt: Date
   
    @ManyToOne(() => ServiceOrder, (serviceOrder) => serviceOrder.serviceOrderItens, { eager: true, cascade: true, onDelete: 'CASCADE'})
    @JoinColumn([{name: 'ServiceOrderId', referencedColumnName: 'id'}])
    serviceOrder: ServiceOrder;
}