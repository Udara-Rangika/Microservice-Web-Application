import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { OrderService } from './order.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  
  @Post()
  async createOrder(
    @Res() response,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    try {
      const newOrder = await this.orderService.createOrder(
        createOrderDto,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Order has been created successfully',
        newOrder,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Order not created!',
        error: 'Bad Request',
      });
    }
  }

  @Get()
  async getOrders(@Res() response) {
    try {
      const orderData = await this.orderService.getAllOrders();
      return response.status(HttpStatus.OK).json({
        message: 'All order data found successfully',
        orderData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put('/:id')
  async updateOrder(
    @Res() response,
    @Param('id') orderId: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    try {
      const existingOrder = await this.orderService.updateOrder(
        orderId,
        updateOrderDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Order has been successfully updated',
        existingOrder,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getOrder(@Res() response, @Param('id') orderId: string) {
    try {
      const existingOrder = await this.orderService.getOrder(orderId);
      return response.status(HttpStatus.OK).json({
        message: 'Order found successfully',
        existingOrder,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteOrder(@Res() response, @Param('id') orderId: string) {
    try {
      const deletedOrder = await this.orderService.deleteOrder(orderId);

      return response.status(HttpStatus.OK).json({
        message: 'Order Deleted Successfully',
        deletedOrder,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getAllOrders(@Res() response) {
    try {
      const orderData = await this.orderService.getAllOrders();
      return response.status(HttpStatus.OK).json({
        message: 'All Order data found successfully',
        orderData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  
  @MessagePattern({ cmd: 'get_order' })
  getAnalytics() {
    return this.orderService.logData();
  }

}
