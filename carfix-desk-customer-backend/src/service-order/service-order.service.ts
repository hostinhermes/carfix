import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceItensDto } from 'src/dto/service-order-itens.dto';
import { ServiceOrderDto } from 'src/dto/service-order.dto';
import { ServiceOrder } from 'src/models/service-order';
import { ServiceOrderItem } from 'src/models/service-order-item';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceOrderService {
    constructor(
        @InjectRepository(ServiceOrder)
        private serviceOrderReposository: Repository<ServiceOrder>,        
    ){}
    
    async create(serviceOrderDto: ServiceOrderDto): Promise<ServiceOrder>{
        const serviceOrder= new ServiceOrder();
        this.parseServiceOrder(serviceOrder, serviceOrderDto); 
        serviceOrder.createdAt = new Date();        
        return await this.serviceOrderReposository.save(serviceOrder)
    }

    async update(serviceOrderDto: ServiceOrderDto): Promise<ServiceOrder>{
        let serviceOrder = await this.serviceOrderReposository.findOne(serviceOrderDto.id);
        console.log(serviceOrder)
        this.parseServiceOrder(serviceOrder, serviceOrderDto);        
        serviceOrder.updatedAt = new Date();
        serviceOrder =  await this.serviceOrderReposository.save(serviceOrder)
        this.parseServiceItens(serviceOrderDto.serviceOrderItens, serviceOrder);
        return serviceOrder;
    }

    private async parseServiceOrder(serviceOrder: ServiceOrder, serviceOrderDto: ServiceOrderDto) {
       serviceOrder.openDate = serviceOrderDto.openDate;
       serviceOrder.closeDate =  serviceOrderDto.closeDate;
       serviceOrder.status = serviceOrderDto.status;
       serviceOrder.car = serviceOrderDto.car;
       serviceOrder.customer = serviceOrderDto.customer;
       serviceOrder.serviceOrderDescription = serviceOrderDto.serviceOrderDescription;
       serviceOrder.serviceOrderObservation = serviceOrderDto.serviceOrderObservation;       
    }

    private async parseServiceItens(serviceItensDto: ServiceItensDto[], serviceOrder: ServiceOrder){
        let serviceItens: ServiceOrderItem[] = [];
        serviceItensDto.forEach((serviceItemDto: ServiceItensDto) =>{
            let serviceItem: ServiceOrderItem = new ServiceOrderItem();
            serviceItem.createdAt = new Date();
            serviceItem.itenDescription = serviceItemDto.itenDescription;
            serviceItem.quantity = serviceItemDto.quantity;
            serviceItem.totalValue = serviceItemDto.totalValue;
            serviceItem.unitValue = serviceItemDto.unitValue;
            serviceItem.unity = serviceItemDto.unit;
            serviceItem.serviceOrder = serviceOrder;
            serviceItens.push(serviceItem);
        })
        return serviceItens;
    }

    async delete(id: number){
        return await this.serviceOrderReposository.delete(id)
    }

    async findAll(): Promise<ServiceOrder[]>{
        return await this.serviceOrderReposository.find();
    }
}
