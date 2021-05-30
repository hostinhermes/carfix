import { Customer } from "src/models/customer.entity";

export class CustomerCarDto {
    id: number;
    brand: string;
    modelName: string;
    km: string;
    licensePlate: string;
    year: string;
    customer: Customer;   
}