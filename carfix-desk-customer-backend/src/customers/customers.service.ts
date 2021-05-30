import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { parse } from 'date-fns';
import { CustomerDto } from 'src/dto/customer.dto';
import { Customer } from 'src/models/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,
    ){}
    
    async create(customerDto: CustomerDto): Promise<Customer>{
        const customer = new Customer();
        this.parseCustomer(customer, customerDto); 
        customer.createdAt = new Date();        
        return await this.customerRepository.save(customer)
    }

    async update(customerDto: CustomerDto): Promise<Customer>{
        const customer = await this.customerRepository.findOne(customerDto.id);
        console.log(customer)
        this.parseCustomer(customer, customerDto);        
        customer.updatedAt = new Date();
        return await this.customerRepository.save(customer)
    }

    private parseCustomer(customer: Customer, customerDto: CustomerDto) {
        customer.name = customerDto.name;
        customer.birthdate = parse(customerDto.birthdate, 'yyyy-MM-dd', new Date());
        customer.address = customerDto.address;
        customer.district = customerDto.district;
        customer.city = customerDto.city;
        customer.phone = customerDto.phone;
        customer.email = customerDto.email;
        customer.document = customerDto.document;
    }

    async delete(id: number){
        return await this.customerRepository.delete(id)
    }

    async findAll(): Promise<Customer[]>{
        return await this.customerRepository.find();
    }

    async findCustomerById(id: number): Promise<Customer>{
        return await this.customerRepository.findOne(id);
    }
}
