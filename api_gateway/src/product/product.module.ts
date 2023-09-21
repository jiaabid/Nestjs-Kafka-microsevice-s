import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports:[  ClientsModule.register([
    {
      name: 'PRODUCT_SERVICE',
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'product',
          brokers: ['https://479e-94-207-118-160.ngrok-free.app'],
        },
        consumer: {
          groupId: 'product-consumer',
        },
      },
    },
  ])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
