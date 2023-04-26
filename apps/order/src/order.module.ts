import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './schemas/order.schema';

@Module({
  imports: [ MongooseModule.forRoot('mongodb+srv://flocktogether2023:Flocktogether2023@cluster0.v52uicz.mongodb.net/?retryWrites=true&w=majority',{dbName: 'orderdb'}),
  MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
