import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ServiceOrderDto } from 'src/dto/service-order.dto';
import { ServiceOrderService } from './service-order.service';
import { Request } from 'express';

@Controller('service-order')
export class ServiceOrderController {
    constructor(private serviceOrderService:ServiceOrderService){}

    @Post()
    async create(@Body() createServiceOrder: ServiceOrderDto){
        console.log(createServiceOrder)
        return await this.serviceOrderService.create(createServiceOrder)
    }

    @Put()
    async update(@Body() updateServiceOrder: ServiceOrderDto){
        return await this.serviceOrderService.update(updateServiceOrder)
    }

    @Get()
    async findAll(@Req() request: Request){
        return await this.serviceOrderService.findAll();
    }

    @Delete(':id')
    async delete(@Param('id') id: number){
        return await this.serviceOrderService.delete(id)
    }
}
