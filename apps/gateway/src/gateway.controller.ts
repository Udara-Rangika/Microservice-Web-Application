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
    @Inject('CART_SERVICE') private readonly cartClient:ClientKafka,
    @Inject('ORDER_SERVICE') private readonly orderClient:ClientKafka,
    @Inject('BILLING_SERVICE') private readonly billingClient:ClientKafka
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

  @Get('carts')
  getCarts() {
    return this.gatewayService.handleGetCarts();
  }

  @Get('orders')
  getOrders() {
    return this.gatewayService.handleGetOrders();
  }

  @Get('billing')
  getBilling() {
    return this.gatewayService.handleGetBilling();
  }



  // @Get('orders')
  // getOrders() {
  //   return this.gatewayService.getFromOrderService();
  // }

  onModuleInit() {
    this.productClient.subscribeToResponseOf('get_products');
  }

  onModuleInit1(){
    this.cartClient.subscribeToResponseOf('get_cart');
  }

  onModuleInit2(){
    this.orderClient.subscribeToResponseOf('get_order');
  }

  onModuleInit3(){
    this.billingClient.subscribeToResponseOf('get_billing');
  }
}
