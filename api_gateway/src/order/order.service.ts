import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { OrderTopics } from 'src/utility/topic.utility';
import { CreateOrdertDto } from './dtos/create-order.dto';
import { error } from 'src/utility/error.utiity';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_SERVICE') private readonly productClient: ClientKafka,
  ) {}
  onModuleInit() {
    this.productClient.subscribeToResponseOf(OrderTopics.ADD_ORDER);
    this.productClient.subscribeToResponseOf(OrderTopics.GET_ORDER);
    this.productClient.subscribeToResponseOf(OrderTopics.GET_ORDERS);
    this.productClient.subscribeToResponseOf(OrderTopics.DELETE_ORDER);
    this.productClient.connect();
  }
  async create(createOrderDto: CreateOrdertDto) {
    let response = await this.productClient
      .send(OrderTopics.ADD_ORDER, createOrderDto)
      .toPromise();
    if (response?.error) {
      return error(response?.message);
    }
    return response.result;
  }

  findAll() {
    return this.productClient.send(OrderTopics.GET_ORDER, {}).toPromise();
  }

  findOne(id: number) {
    return this.productClient.send(OrderTopics.GET_ORDERS, { id }).toPromise();
  }

  remove(id: number) {
    return this.productClient
      .send(OrderTopics.DELETE_ORDER, { id })
      .toPromise();
  }
}
