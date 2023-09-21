import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateOrderDto } from './dtos/create-order.dto';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {

  }

  async createOrder(payload: CreateOrderDto) {
    try {
      console.log(payload)
      let products = payload.products.map(product=>{
        return {
          productId:product
        }
      }) 
      delete payload.products
      let result = await this.prismaService.order.create({
        data: {
          ...payload,
          products:{
            create:products
          }
        },
        
      });
      return { result, error: false }
    } catch (err) {
      console.log(err);
      return { message: err.message, error: true };
    }
  }

  async getOrder(id: number) {
    try {
      let result = await this.prismaService.order.findFirst({
        where: { id }
      })
      return {result,error:false}
    } catch (err) {
      console.log(err)
      return { message: err.message, error: true };
    }
  }

  async getOrders(queryParams) {
    try {
      let query = {}
      if (queryParams.filter) {
        query = {
          where: queryParams.filter
        }
      }
      let result = await this.prismaService.order.findMany(query)
      return { result, error: false }
    } catch (err) {
      console.log(err)
      return { message: err.message, error: true };
    }
  }

  async deletedOrder(id: number) {
    try {
      let result =await this.prismaService.order.delete({
        where: { id }
      })
      return {result,error:false}
    } catch (err) {
      console.log(err)
      return { message: err.message, error: true };

    }
  }


}
