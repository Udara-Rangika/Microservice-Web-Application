import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CartSchema } from './schemas/cart.schema';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://flocktogether2023:Flocktogether2023@cluster0.v52uicz.mongodb.net/?retryWrites=true&w=majority',{dbName: 'orderdb'}),
  MongooseModule.forFeature([{ name: 'Cart', schema: CartSchema }])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
