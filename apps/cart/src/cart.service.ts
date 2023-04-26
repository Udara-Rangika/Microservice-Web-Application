import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICart } from './interface/cart.interface';
import { CreateCartDto } from './dto/createCart.dto';
import { UpdateCartDto } from './dto/updateCart.dto';

@Injectable()
export class CartService {
  constructor(@InjectModel('Cart') private cartModel: Model<ICart>) {}
  
  //create the new product
  async createCart(createCartDto: CreateCartDto): Promise<ICart> {
    const newCart = await new this.cartModel(createCartDto);
    return newCart.save();
  }

  //read the product by using id
  async getCart(cartId: string): Promise<ICart> {
    const existingCart = await this.cartModel.findById(cartId).exec();
    if (!existingCart) {
      throw new NotFoundException(`Cart #${cartId} not found`);
    }
    return existingCart;
  }

  //Delete the product
  async deleteCart(cartId: string): Promise<ICart> {
    const deletedCart = await this.cartModel.findByIdAndDelete(cartId);
    if (!deletedCart) {
      throw new NotFoundException(`Cart #${cartId} not found`);
    }
    return deletedCart;
  }

  //Update the prodcut
  async updateCart(
    cartId: string,
    updateCartDto: UpdateCartDto,
  ): Promise<ICart> {
    const existingCart = await this.cartModel.findByIdAndUpdate(
      cartId,
      updateCartDto,
      { new: true },
    );
    if (!existingCart) {
      throw new NotFoundException(`Cart #${cartId} not found`);
    }
    return existingCart;
  }

  //Get all product details
  async getAllCart(): Promise<ICart[]> {
    const cartData = await this.cartModel.find();
    if (!cartData || cartData.length == 0) {
      throw new NotFoundException('Cart data not found!');
    }
    return cartData;
  }

}
