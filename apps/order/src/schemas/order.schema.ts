import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
@Schema()
export class Order {
   @Prop()
   orderId: string;
   @Prop()
   productName: string;
   @Prop()
   quantity: number;
   @Prop()
   price: string;
   
}
export const OrderSchema = SchemaFactory.createForClass(Order);