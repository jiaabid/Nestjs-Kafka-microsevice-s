import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ProductTopics } from 'src/utility/topic.utility';
import { CreateProductDto } from './dtos/create-product.dto';
import { error } from 'src/utility/error.utiity';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_SERVICE') private readonly productClient: ClientKafka,
  ) {}
  onModuleInit() {
    this.productClient.subscribeToResponseOf(ProductTopics.ADD_PRODUCT);
    this.productClient.subscribeToResponseOf(ProductTopics.GET_PRODUCT);
    this.productClient.subscribeToResponseOf(ProductTopics.GET_PRODUCTS);
    this.productClient.subscribeToResponseOf(ProductTopics.UPDATE_PRODUCT);
    this.productClient.subscribeToResponseOf(ProductTopics.DELETE_PRODUCT);
    this.productClient.connect();
  }
  async create(createUserDto: CreateProductDto) {
    let response = await this.productClient
      .send(ProductTopics.ADD_PRODUCT, createUserDto)
      .toPromise();
    if (response?.error) {
      return error(response?.message);
    }
    return response.result;
  }

  findAll() {
    return this.productClient.send(ProductTopics.GET_PRODUCT, {}).toPromise();
  }

  findOne(id: number) {
    return this.productClient
      .send(ProductTopics.GET_PRODUCTS, { id })
      .toPromise();
  }

  update(id: number, updateUserDto: UpdateProductDto) {
    return this.productClient
      .send(ProductTopics.UPDATE_PRODUCT, { id, updateUserDto })
      .toPromise();
  }

  remove(id: number) {
    return this.productClient
      .send(ProductTopics.DELETE_PRODUCT, { id })
      .toPromise();
  }
}
