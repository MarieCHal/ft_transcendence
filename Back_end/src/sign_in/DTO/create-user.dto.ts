import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    Firstname: string;

    @IsNotEmpty()
    Lastname: string;

    @IsNotEmpty()
    Nickname: string;

    @IsEmail()
    @IsNotEmpty()
    Email: string;

    @IsNotEmpty()
    Password: string;

    @IsNotEmpty()
    VerifPassword: string;
  }