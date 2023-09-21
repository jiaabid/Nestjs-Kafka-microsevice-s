import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports:[  ClientsModule.register([
    {
      name: 'ORDER_SERVICE',
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'order',
          brokers: ['https://479e-94-207-118-160.ngrok-free.app'],
        },
        consumer: {
          groupId: 'order-consumer',
        },
      },
    },
  ])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
