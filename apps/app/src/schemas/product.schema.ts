import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
@Schema()
export class Product {
   @Prop()
   productName: string;
   @Prop()
   catergory: string;
   @Prop()
   productId: string;
   @Prop()
   Discription: string;
   @Prop()
   quantity: number;
   @Prop()
   price: string;
   
}
export const ProductSchema = SchemaFactory.createForClass(Product);