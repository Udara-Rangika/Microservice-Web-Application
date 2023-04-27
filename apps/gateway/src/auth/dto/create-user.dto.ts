import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

//this is create user Dto
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @IsNotEmpty()
  readonly role: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}
