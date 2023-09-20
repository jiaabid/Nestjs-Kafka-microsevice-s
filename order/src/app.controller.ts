import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { OrderTopics } from './utility/topic.utility';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern(OrderTopics.ADD_ORDER)
  createOrder(data: any) {
    console.log('in add order');
    return this.appService.createOrder(data.value);
  }
  @MessagePattern(OrderTopics.GET_ORDER)
  getOrder(data) {
    return this.appService.getOrder(data.value.id);
  }
  @MessagePattern(OrderTopics.GET_ORDERS)
  getOrders() {
    return this.appService.getOrders();
  }
  @MessagePattern(OrderTopics.DELETE_ORDER)
  deletedOrder(data) {
    console.log(data);
    return this.appService.deletedOrder(data.value.id);
  }
}
