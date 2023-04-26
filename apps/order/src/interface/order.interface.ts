import { Document } from 'mongoose';
export interface IOrder extends Document{
    readonly orderId: string;
    readonly productName: string;
    readonly quantity: number;
    readonly  price: string;
}