// import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
// import { Types } from 'mongoose';
export class CreateBillingDto {
   readonly paymentInfo: {
      readonly id: string;
      readonly status: string;
    };
     readonly paidAt: Date;
     readonly itemsPrice: number;
     readonly taxPrice: number;
     readonly shippingPrice: number;
     readonly totalPrice: number;
     readonly orderStatus: string;
     readonly deliveredAt?: Date;
     readonly createdAt: Date;
  }
  

