import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { IOrder } from './interface/order.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrderService {
  constructor(@InjectModel('Order') private orderModel: Model<IOrder>) {}
  
  //create the new product
  async createOrder(createOrderDto: CreateOrderDto): Promise<IOrder> {
    const newStudent = await new this.orderModel(createOrderDto);
    return newStudent.save();
  }

  //read the product by using id
  async getOrder(orderId: string): Promise<IOrder> {
    const existingOrder = await this.orderModel.findById(orderId).exec();
    if (!existingOrder) {
      throw new NotFoundException(`Order #${orderId} not found`);
    }
    return existingOrder;
  }

  //Delete the product
  async deleteOrder(orderId: string): Promise<IOrder> {
    const deletedOrder = await this.orderModel.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      throw new NotFoundException(`Product #${orderId} not found`);
    }
    return deletedOrder;
  }

  //Update the prodcut
  async updateOrder(
    orderId: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<IOrder> {
    const existingOrder = await this.orderModel.findByIdAndUpdate(
      orderId,
      updateOrderDto,
      { new: true },
    );
    if (!existingOrder) {
      throw new NotFoundException(`Order #${orderId} not found`);
    }
    return existingOrder;
  }

  //Get all product details
  async getAllOrders(): Promise<IOrder[]> {
    const orderData = await this.orderModel.find();
    if (!orderData || orderData.length == 0) {
      throw new NotFoundException('Order data not found!');
    }
    return orderData;
  }

  async logData():Promise<any>{
    console.log('order data coming')
    return 'hello from order'
  }
}
