import { IsEmail, IsEmpty, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsEmpty()
  id: number;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNumber()
  age: number;

  @IsEmail()
  email: string;
}
