import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Product } from "apps/app/src/schemas/product.schema";
import { User } from "apps/gateway/src/auth/schemas/user.schema";
import mongoose from "mongoose";

@Schema()
export class Billing {
   @Prop({
      type: {
        address: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
        pinCode: { type: Number },
        phoneNo: { type: Number },
      },
    })
    shippingInfo: Record<string, any>;
  
    @Prop({
      type: [
        {
          productName: { type: String, required: true },
          productPrice: { type: Number, required: true },
          quantity: { type: Number, required: true },
          productImage: { type: String, required: true },
          productId: { type: mongoose.Schema.Types.ObjectId, ref: Product.name, required: true },
        },
      ],
    })
    orderItems: Record<string, any>;
  
    @Prop({
      type: mongoose.Schema.Types.ObjectId,
      ref: User.name,
      required: true,
    })
    user: User;
  
    @Prop({
      id: { type: String, required: true },
      status: { type: String, required: true },
    })
    paymentInfo: Record<string, any>;
  
    @Prop({ type: Date, required: true })
    paidAt: Date;
  
    @Prop({ type: Number, required: true, default: 0 })
    itemsPrice: number;
  
    @Prop({ type: Number, default: 0 })
    taxPrice: number;
  
    @Prop({ type: Number, required: true, default: 0 })
    shippingPrice: number;
  
    @Prop({ type: Number, required: true, default: 0 })
    totalPrice: number;
  
    @Prop({ type: String, required: true, default: 'Processing' })
    orderStatus: string;
  
    @Prop({ type: Date })
    deliveredAt: Date;
  
    @Prop({ type: Date, default: Date.now })
    createdAt: Date;
  }
   

export const BillingSchema = SchemaFactory.createForClass(Billing);