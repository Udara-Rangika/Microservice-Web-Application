import { Document } from 'mongoose';
export interface IProduct extends Document{
    readonly productName: string;
    readonly catergory: string;
    readonly productId: string;
    readonly Discription: string;
    readonly quantity: number;
    readonly  price: string;
}