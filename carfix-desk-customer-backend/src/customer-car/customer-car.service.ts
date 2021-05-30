import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomersService } from 'src/customers/customers.service';
import { CustomerCarDto } from 'src/dto/customer-car.dto';
import { CustomerCar } from 'src/models/customer-car.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerCarService {
    constructor(
        @InjectRepository(CustomerCar)
        private customerCarRepository: Repository<CustomerCar>,
        private customersService:CustomersService
    ){}
    
    async create(customerCarDto: CustomerCarDto): Promise<CustomerCar>{
        const customerCar= new CustomerCar();
        this.parseCustomerCar(customerCar, customerCarDto); 
        customerCar.createdAt = new Date();        
        return await this.customerCarRepository.save(customerCar)
    }

    async update(customerCarDto: CustomerCarDto): Promise<CustomerCar>{
        const customerCar = await this.customerCarRepository.findOne(customerCarDto.id);
        console.log(customerCar)
        this.parseCustomerCar(customerCar, customerCarDto);        
        customerCar.updatedAt = new Date();
        return await this.customerCarRepository.save(customerCar)
    }

    private async parseCustomerCar(customerCar: CustomerCar, customerCarDto: CustomerCarDto) {
        customerCar.modelName = customerCarDto.modelName;
        customerCar.year = customerCarDto.year;
        customerCar.brand = customerCarDto.brand;
        customerCar.km = customerCarDto.km;
        customerCar.licensePlate = customerCarDto.licensePlate;    
        customerCar.customer = customerCarDto.customer;
    }

    async delete(id: number){
        return await this.customerCarRepository.delete(id)
    }

    async findAll(): Promise<CustomerCar[]>{
        return await this.customerCarRepository.find();
    }
}
