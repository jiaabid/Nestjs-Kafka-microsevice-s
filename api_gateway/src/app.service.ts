import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { OrderCreatedEvent } from './order-created.event';
import { UserTopics } from './utility/topic.utility';

@Injectable()
export class AppService {
 

  getHello(): string {
    return 'Hello World!';
  }

}
