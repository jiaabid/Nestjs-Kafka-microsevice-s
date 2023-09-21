import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ClientKafka } from '@nestjs/microservices';
import { UserTopics } from './utility/topic.utility';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly prismaService: PrismaService,
    @Inject('PRODUCT_SERVICE') private readonly productClient: ClientKafka,
    @Inject('ORDER_SERVICE') private readonly orderClient: ClientKafka,
  ) { }

  onModuleInit() {
    this.productClient.subscribeToResponseOf(UserTopics.GET_PRODUCTS)
    this.orderClient.subscribeToResponseOf(UserTopics.GET_ORDERS)
    this.orderClient.connect();
    this.productClient.connect();
  }


  async createUser(payload: CreateUserDto) {
    try {
      console.log(payload)
      let result = await this.prismaService.user.create({
        data: payload
      });
      return { result, error: false }
    } catch (err) {
      console.log(err);
      console.log(err.message);
      return { message: err.message, error: true };
    }
  }

  async getUser(id: number) {
    try {
      const products = await this.productClient.send(UserTopics.GET_PRODUCTS, {
        filter: {
          createdBy: id
        }
      }).toPromise();
      const orders = await this.productClient.send(UserTopics.GET_ORDERS, {
        filter: {
          createdBy: id
        }
      }).toPromise();
      let result = await this.prismaService.user.findFirst({
        where: { id }
      })
      return { result:{
        ...result,
        products:products.result,
        orders:orders.result,
      }, error: false }
    } catch (err) {
      console.log(err)
      return { message: err.message, error: true };

    }
  }

  getUsers() {
    try {
      return this.prismaService.user.findMany()
    } catch (err) {
      console.log(err)
    }
  }

  deletedUser(id: number) {
    console.log(id)
    try {
      return this.prismaService.user.delete({
        where: { id }
      })
    } catch (err) {
      console.log(err)
    }
  }

  async updateUser(id: number, payload: UpdateUserDto) {
    try {

      const exist = await this.prismaService.user.findFirst({
        where: { id }
      })
      exist["name"] = payload.name
      return this.prismaService.user.update({
        where: { id },
        data: exist
      })

    } catch (err) {
      console.log(err)
    }
  }
}
