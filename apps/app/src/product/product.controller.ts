import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from '../../src/dto/createProduct.dto';
import { UpdateProductDto } from '../../src/dto/updateProduct.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(
    @Res() response,
    @Body() createProductDto: CreateProductDto,
  ) {
    try {
      const newProduct = await this.productService.createProduct(
        createProductDto,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Product has been created successfully',
        newProduct,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Product not created!',
        error: 'Bad Request',
      });
    }
  }

  @Get()
  async getProducts(@Res() response) {
    try {
      const productData = await this.productService.getAllProducts();
      return response.status(HttpStatus.OK).json({
        message: 'All product data found successfully',
        productData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put('/:id')
  async updateProduct(
    @Res() response,
    @Param('id') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const existingProduct = await this.productService.updateProduct(
        productId,
        updateProductDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Product has been successfully updated',
        existingProduct,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getProduct(@Res() response, @Param('id') productId: string) {
    try {
      const existingProduct = await this.productService.getProduct(productId);
      return response.status(HttpStatus.OK).json({
        message: 'Product found successfully',
        existingProduct,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteProduct(@Res() response, @Param('id') productId: string) {
    try {
      const deletedProduct = await this.productService.deleteProduct(productId);

      return response.status(HttpStatus.OK).json({
        message: 'Product Deleted Successfully',
        deletedProduct,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getAllProducts(@Res() response) {
    try {
      const productData = await this.productService.getAllProducts();
      return response.status(HttpStatus.OK).json({
        message: 'All Product data found successfully',
        productData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
