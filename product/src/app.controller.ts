import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { ProductTopics } from './utility/topic.utility';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern(ProductTopics.ADD_PRODUCT)
  addProduct(data: any) {
    console.log('in add product',data);
    return this.appService.createProduct(data);
  }
  @MessagePattern(ProductTopics.GET_PRODUCT)
  getProduct(data) {
    return this.appService.getProduct(data.id);
  }
  @MessagePattern(ProductTopics.GET_PRODUCTS)
  getProducts(data) {
    return this.appService.getProducts(data);
  }
  @MessagePattern(ProductTopics.UPDATE_PRODUCT)
  updateProduct(data) {
    return this.appService.updateProduct(
      data.id,
      data.updateProductDto,
    );
  }
  @MessagePattern(ProductTopics.DELETE_PRODUCT)
  deleteProduct(data) {
    console.log(data);
    return this.appService.deletedProduct(data.id);
  }
}
