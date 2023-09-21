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
          brokers: ['kafka:9092'],
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
