import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://flocktogether2023:Flocktogether2023@cluster0.v52uicz.mongodb.net/?retryWrites=true&w=majority',
      { dbName: 'productdb' },
    ),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],

  controllers: [AppController, ProductController],
  providers: [AppService, ProductService],
})
export class AppModule {}
