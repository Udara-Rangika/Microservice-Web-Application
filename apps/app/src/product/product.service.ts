import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from '../../src/dto/createProduct.dto';
import { UpdateProductDto } from '../../src/dto/updateProduct.dto';
import { IProduct } from '../../src/interface/product.interface';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<IProduct>) {}

  //create the new product
  async createProduct(createProductDto: CreateProductDto): Promise<IProduct> {
    const newStudent = await new this.productModel(createProductDto);
    return newStudent.save();
  }

  //read the product by using id
  async getProduct(productId: string): Promise<IProduct> {
    const existingProduct = await this.productModel.findById(productId).exec();
    if (!existingProduct) {
      throw new NotFoundException(`Product #${productId} not found`);
    }
    return existingProduct;
  }

  //Delete the product
  async deleteProduct(productId: string): Promise<IProduct> {
    const deletedProduct = await this.productModel.findByIdAndDelete(productId);
    if (!deletedProduct) {
      throw new NotFoundException(`Product #${productId} not found`);
    }
    return deletedProduct;
  }

  //Update the prodcut
  async updateProduct(
    productId: string,
    updateProductDto: UpdateProductDto,
  ): Promise<IProduct> {
    const existingProduct = await this.productModel.findByIdAndUpdate(
      productId,
      updateProductDto,
      { new: true },
    );
    if (!existingProduct) {
      throw new NotFoundException(`Product #${productId} not found`);
    }
    return existingProduct;
  }

  //Get all product details
  async getAllProducts(): Promise<IProduct[]> {
    const productData = await this.productModel.find();
    if (!productData || productData.length == 0) {
      throw new NotFoundException('Products data not found!');
    }
    return productData;
  }

  async demoMethod() {
    console.log('This is from gateway');
    return 'Hello from Product Service';
  }
}
