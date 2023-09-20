import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { ProductTopics } from './utility/topic.utility';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern(ProductTopics.ADD_PRODUCT)
  addProduct(data: any) {
    console.log('in add product');
    return this.appService.createProduct(data.value);
  }
  @MessagePattern(ProductTopics.GET_PRODUCT)
  getProduct(data) {
    return this.appService.getProduct(data.value.id);
  }
  @MessagePattern(ProductTopics.GET_PRODUCTS)
  getProducts() {
    return this.appService.getProducts();
  }
  @MessagePattern(ProductTopics.UPDATE_PRODUCT)
  updateProduct(data) {
    return this.appService.updateProduct(
      data.value.id,
      data.value.updateProductDto,
    );
  }
  @MessagePattern(ProductTopics.DELETE_PRODUCT)
  deleteProduct(data) {
    console.log(data);
    return this.appService.deletedProduct(data.value.id);
  }
}
