import { Document } from 'mongoose';
export interface ICart extends Document{
    readonly cartId: string;
    readonly name: string;
    readonly quantity: number;
    readonly  price: string;
}