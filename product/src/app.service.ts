import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {

  }
  
 async createProduct(payload:CreateProductDto) {
    try {
      console.log(payload)
      let result =await this.prismaService.product.create({
        data:payload
      });
      return {result,error:false}
    } catch (err) {
      console.log(err);
      console.log(err.message);
      return {message:err.message,error:true};
    }
  }

  getProduct(id:number) {
    try {
      return this.prismaService.product.findFirst({
        where:{id}
      })
    } catch (err) {
      console.log(err)
    }
  }

  getProducts() {
    try {
      return this.prismaService.product.findMany()
    } catch (err) {
      console.log(err)
    }
  }

  deletedProduct(id:number) {
    console.log(id)
    try {
      return this.prismaService.product.delete({
      where:{id}
      })
    } catch (err) {
      console.log(err)
    }
  }

  async updateProduct(id:number,payload:UpdateProductDto) {
    try {
  
      const exist = await this.prismaService.product.findFirst({
        where:{id}
      })
      exist["name"] = payload.name
    return  this.prismaService.product.update({
        where:{id},
        data:exist
      })

    } catch (err) {
      console.log(err)
    }
  }
}
