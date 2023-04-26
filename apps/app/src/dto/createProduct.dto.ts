import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
export class CreateProductDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly productName: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly catergory: string;

  @IsString()
  @MaxLength(15)
  @IsNotEmpty()
  readonly productId: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  readonly Discription: string;

  @IsNumber()
  @IsNotEmpty()
  readonly quantity: number;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  readonly price: string;
}
