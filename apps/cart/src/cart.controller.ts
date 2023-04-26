import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/createCart.dto';
import { UpdateCartDto } from './dto/updateCart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async createCart(
    @Res() response,
    @Body() createCartDto: CreateCartDto,
  ) {
    try {
      const newOrder = await this.cartService.createCart(
        createCartDto,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Cart has been created successfully',
        newOrder,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Cart not created!',
        error: 'Bad Request',
      });
    }
  }

  @Get()
  async getOrders(@Res() response) {
    try {
      const cartData = await this.cartService.getAllCart();
      return response.status(HttpStatus.OK).json({
        message: 'All cart data found successfully',
        cartData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put('/:id')
  async updateCart(
    @Res() response,
    @Param('id') cartId: string,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    try {
      const existingCart = await this.cartService.updateCart(
        cartId,
        updateCartDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Cart has been successfully updated',
        existingCart,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getCart(@Res() response, @Param('id') cartId: string) {
    try {
      const existingCart = await this.cartService.getCart(cartId);
      return response.status(HttpStatus.OK).json({
        message: 'Cart found successfully',
        existingCart,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteCart(@Res() response, @Param('id') cartId: string) {
    try {
      const deletedCart = await this.cartService.deleteCart(cartId);

      return response.status(HttpStatus.OK).json({
        message: 'Cart Deleted Successfully',
        deletedCart,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getAllCart(@Res() response) {
    try {
      const cartData = await this.cartService.getAllCart();
      return response.status(HttpStatus.OK).json({
        message: 'All Cart data found successfully',
        cartData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  

}
