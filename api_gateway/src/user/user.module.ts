import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports:[  ClientsModule.register([
    {
      name: 'AUTH_SERVICE',
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'auth',
          brokers: ['https://479e-94-207-118-160.ngrok-free.app'],
        },
        consumer: {
          groupId: 'auth-consumer',
        },
      },
    },
  ])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
