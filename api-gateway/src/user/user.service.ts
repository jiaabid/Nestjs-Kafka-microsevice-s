import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientKafka } from '@nestjs/microservices';
import { UserTopics } from 'src/utility/topic.utility';
import { error } from 'src/utility/error.utiity';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) { }
  onModuleInit() {
    this.authClient.subscribeToResponseOf(UserTopics.ADD_USER)
    this.authClient.subscribeToResponseOf(UserTopics.GET_USER)
    this.authClient.subscribeToResponseOf(UserTopics.GET_USERS)
    this.authClient.subscribeToResponseOf(UserTopics.UPDATE_USER)
    this.authClient.subscribeToResponseOf(UserTopics.DELETE_USER)
    this.authClient.connect();

  }
 async create(createUserDto: CreateUserDto) {
    let response = await this.authClient.send(UserTopics.ADD_USER, createUserDto).toPromise();
    if(response?.error){
      
       return error(response?.message)
    }
    return response.result;
  }

  findAll() {
    return this.authClient.send(UserTopics.GET_USERS, {}).toPromise();
  }

  findOne(id: number) {
    return this.authClient.send(UserTopics.GET_USER, { id }).toPromise();

  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.authClient.send(UserTopics.UPDATE_USER, { id, updateUserDto }).toPromise();

  }

  remove(id: number) {
    return this.authClient.send(UserTopics.DELETE_USER, { id }).toPromise();

  }
}
