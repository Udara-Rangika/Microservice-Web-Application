import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Post,
} from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { CreateUserRequest } from './create-user-request.dto';
import { ClientKafka } from '@nestjs/microservices';

@Controller()
export class GatewayController implements OnModuleInit {
  constructor(
    private readonly gatewayService: GatewayService,
    @Inject('PRODUCT_SERVICE') private readonly productClient: ClientKafka,
  ) {}

  @Get()
  getHello(): string {
    return this.gatewayService.getHello();
  }

  // @Post()
  // createUser(@Body() createUserRequest: CreateUserRequest) {
  //   return this.gatewayService.createUser(createUserRequest);
  // }

  @Get('products')
  getAnalytics() {
    return this.gatewayService.handleGetProducts();
  }

  // @Get('orders')
  // getOrders() {
  //   return this.gatewayService.getFromOrderService();
  // }

  onModuleInit() {
    this.productClient.subscribeToResponseOf('get_products');
  }
}
