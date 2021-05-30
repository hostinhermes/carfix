import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { CustomerDto } from 'src/dto/customer.dto';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
    constructor(private customersService:CustomersService){}

    @Post()
    async create(@Body() createCustomer: CustomerDto){
        console.log(createCustomer)
        return await this.customersService.create(createCustomer)
    }

    @Put()
    async update(@Body() updateCustomer: CustomerDto){
        return await this.customersService.update(updateCustomer)
    }

    @Get()
    async findAll(@Req() request: Request){
        return await this.customersService.findAll();
    }

    @Delete(':id')
    async delete(@Param('id') id: number){
        return await this.customersService.delete(id)
    }
}
