import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
export class CreateCartDto {
  
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  readonly cartId: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly quantity: number;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  readonly price: string;
}
