import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
@Schema()
export class Cart {
   @Prop()
   cartId: string;
   @Prop()
   name: string;
   @Prop()
   quantity: number;
   @Prop()
   price: string;
   
}
export const CartSchema = SchemaFactory.createForClass(Cart);