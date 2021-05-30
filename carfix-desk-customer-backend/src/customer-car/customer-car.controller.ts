import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { CustomerCarDto } from 'src/dto/customer-car.dto';
import { CustomerCarService } from './customer-car.service';

@Controller('cars')
export class CustomerCarController {
    constructor(private customerCarService:CustomerCarService){}

    @Post()
    async create(@Body() createCustomerCar: CustomerCarDto){
        console.log(createCustomerCar)
        return await this.customerCarService.create(createCustomerCar)
    }

    @Put()
    async update(@Body() updateCustomerCar: CustomerCarDto){
        return await this.customerCarService.update(updateCustomerCar)
    }

    @Get()
    async findAll(@Req() request: Request){
        return await this.customerCarService.findAll();
    }

    @Delete(':id')
    async delete(@Param('id') id: number){
        return await this.customerCarService.delete(id)
    }
}
