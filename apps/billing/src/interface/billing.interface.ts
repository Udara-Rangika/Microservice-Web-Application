export interface IBilling extends Document{
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
    
