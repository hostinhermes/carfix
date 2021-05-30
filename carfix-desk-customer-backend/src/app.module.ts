import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './models/customer.entity';
import { CustomersModule } from './customers/customers.module';
import { CustomerCarModule } from './customer-car/customer-car.module';
import { CustomerCar } from './models/customer-car.entity';
import { ServiceOrderService } from './service-order/service-order.service';
import { ServiceOrderModule } from './service-order/service-order.module';
import { ServiceOrder } from './models/service-order';
import { ServiceOrderItem } from './models/service-order-item';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'carfix-desk',
      entities: [Customer, CustomerCar, ServiceOrder, ServiceOrderItem],
      synchronize: true

    }),
    CustomersModule,
    CustomerCarModule,
    ServiceOrderModule
  ],
 
  
})
export class AppModule {}
