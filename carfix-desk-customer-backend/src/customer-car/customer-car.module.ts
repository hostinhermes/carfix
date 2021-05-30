import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersService } from 'src/customers/customers.service';
import { CustomerCar } from 'src/models/customer-car.entity';
import { Customer } from 'src/models/customer.entity';
import { CustomerCarController } from './customer-car.controller';
import { CustomerCarService } from './customer-car.service';

@Module({
    imports: [TypeOrmModule.forFeature([Customer, CustomerCar])],
    controllers: [CustomerCarController],
    providers: [CustomerCarService, CustomersService],
})
export class CustomerCarModule {}
