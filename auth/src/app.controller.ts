import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { UserTopics } from './utility/topic.utility';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern(UserTopics.ADD_USER)
  addUser(data: any) {
    console.log('in add user')
    return this.appService.createUser(data);
  }
  @MessagePattern(UserTopics.GET_USER)
  getUser(data) {
    return this.appService.getUser(data.id);
  }
  @MessagePattern(UserTopics.GET_USERS)
  getUsers() {
    return this.appService.getUsers();
  }
  @MessagePattern(UserTopics.UPDATE_USER)
  updateUser(data) {
    return this.appService.updateUser(data.id,data.updateUserDto);
  }
  @MessagePattern(UserTopics.DELETE_USER)
  deleteUser(data) {
    console.log(data)
    return this.appService.deletedUser(data.id);
  }
}
