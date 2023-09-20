import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {

  }
  
 async createUser(payload:CreateUserDto) {
    try {
      console.log(payload)
      let result =await this.prismaService.user.create({
        data:payload
      });
      return {result,error:false}
    } catch (err) {
      console.log(err);
      console.log(err.message);
      return {message:err.message,error:true};
    }
  }

  getUser(id:number) {
    try {
      return this.prismaService.user.findFirst({
        where:{id}
      })
    } catch (err) {
      console.log(err)
    }
  }

  getUsers() {
    try {
      return this.prismaService.user.findMany()
    } catch (err) {
      console.log(err)
    }
  }

  deletedUser(id:number) {
    console.log(id)
    try {
      return this.prismaService.user.delete({
      where:{id}
      })
    } catch (err) {
      console.log(err)
    }
  }

  async updateUser(id:number,payload:UpdateUserDto) {
    try {
  
      const exist = await this.prismaService.user.findFirst({
        where:{id}
      })
      exist["name"] = payload.name
    return  this.prismaService.user.update({
        where:{id},
        data:exist
      })

    } catch (err) {
      console.log(err)
    }
  }
}
