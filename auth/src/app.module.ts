import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [PrismaModule,  ClientsModule.register([
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
  ]),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
