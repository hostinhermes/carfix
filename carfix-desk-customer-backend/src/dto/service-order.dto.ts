import { CustomerCar } from "src/models/customer-car.entity";
import { Customer } from "src/models/customer.entity";

export class ServiceOrderDto {
    id: number;
    serviceOrderDescription: string;
    serviceOrderObservation: string;
    totalValue: number;
    status: number;
    openDate: Date;
    closeDate: Date;
    car: CustomerCar;
    customer: Customer;
    serviceOrderItens: ServiceItensDto[];   
}

class ServiceItensDto {
    id: number;
    itenDescription: string;
    unit: string;
    quantity: number;
    unitValue: number;
    totalValue: number;
}