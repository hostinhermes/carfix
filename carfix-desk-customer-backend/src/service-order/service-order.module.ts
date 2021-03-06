import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceOrder } from 'src/models/service-order';
import { ServiceOrderItem } from 'src/models/service-order-item';
import { ServiceOrderController } from './service-order.controller';
import { ServiceOrderService } from './service-order.service';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceOrder, ServiceOrderItem])],
  controllers: [ServiceOrderController],
  providers: [ServiceOrderService],
})
export class ServiceOrderModule {}
