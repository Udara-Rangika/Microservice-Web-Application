import { Inject, Injectable } from '@nestjs/common';
import { CreateUserRequest } from './create-user-request.dto';
import { ClientProxy } from '@nestjs/microservices/client/client-proxy';
import { CreateUserEvent } from './create-user.event';

@Injectable()
export class GatewayService {
  private readonly users: any[] = [];

  constructor(
    // @Inject('GATEWAY_SERVICE')
    // private readonly communicationClient: ClientProxy,
    @Inject('PRODUCT_SERVICE')
    private readonly productClient: ClientProxy,
    @Inject('CART_SERVICE')
    private readonly cartClient: ClientProxy,
  ) // @Inject('ORDER_SERVICE') // private readonly orderClient: ClientProxy,
  {}

  // createUser(createUserRequest: CreateUserRequest) {
  //   this.users.push(createUserRequest);
  //   this.communicationClient.emit(
  //     'user_created',
  //     new CreateUserEvent(createUserRequest.email),
  //   );
  // }
  getHello(): string {
    return 'Hello World!';
  }

  handleGetProducts() {
    this.productClient.send('get_products', {}).subscribe((products) => {
      console.log(products);
    });
  }

  handleGetCarts() {
    this.cartClient.send('get_carts', {}).subscribe((carts) => {
      console.log(carts);
    });
  }


  // getFromOrderService() {
  //   return this.orderClient.send({ cmd: 'get_order' }, {});
  // }
}
