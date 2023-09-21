import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {

  }

  async createProduct(payload: CreateProductDto) {
    try {
      console.log(payload)
      let result = await this.prismaService.product.create({
        data: payload
      });
      return { result, error: false }
    } catch (err) {
      console.log(err);
      console.log(err.message);
      return { message: err.message, error: true };
    }
  }

 async getProduct(id: number) {
    try {
      let result = await this.prismaService.product.findFirst({
        where: { id }
      })
      return {result,error:false}
    } catch (err) {
      console.log(err)
      return { message: err.message, error: true };
    }
  }

  async getProducts(queryParams) {
    try {
      let query = {}
      if (queryParams.filter) {
        query = {
          where: queryParams.filter
        }
      }
      let result= await this.prismaService.product.findMany(query)
      return {result,error:false}
    } catch (err) {
      console.log(err)
      return { message: err.message, error: true };
    }
  }

  async deletedProduct(id: number) {
    console.log(id)
    try {
      let result = this.prismaService.product.delete({
        where: { id }
      })
      return {result,error:false}
    } catch (err) {
      console.log(err)
      return { message: err.message, error: true };
    }
  }

  async updateProduct(id: number, payload: UpdateProductDto) {
    try {

      const exist = await this.prismaService.product.findFirst({
        where: { id }
      })
      Object.keys(payload).forEach(key=>{
        exist[key] = payload[key]
      })
      let result =await this.prismaService.product.update({
        where: { id },
        data: exist
      })
      return {result,error:false}

    } catch (err) {
      console.log(err)
      return { message: err.message, error: true };
    }
  }
}
