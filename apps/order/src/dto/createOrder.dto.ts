import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
export class CreateOrderDto {
  
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  readonly orderId: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly productName: string;

  @IsNumber()
  @IsNotEmpty()
  readonly quantity: number;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  readonly price: string;
}
