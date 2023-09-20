import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateOrderDto } from './dtos/create-order.dto';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {

  }
  
 async createOrder(payload:CreateOrderDto) {
    try {
      console.log(payload)
      let result =await this.prismaService.order.create({
        data:payload
      });
      return {result,error:false}
    } catch (err) {
      console.log(err);
      console.log(err.message);
      return {message:err.message,error:true};
    }
  }

  getOrder(id:number) {
    try {
      return this.prismaService.order.findFirst({
        where:{id}
      })
    } catch (err) {
      console.log(err)
    }
  }

  getOrders() {
    try {
      return this.prismaService.order.findMany()
    } catch (err) {
      console.log(err)
    }
  }

  deletedOrder(id:number) {
    console.log(id)
    try {
      return this.prismaService.order.delete({
      where:{id}
      })
    } catch (err) {
      console.log(err)
    }
  }


}
