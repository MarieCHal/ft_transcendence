import { IsEmail, IsNotEmpty, MinLength, Equals } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    //@MinLength(3)
    Firstname: string;

    @IsNotEmpty()
    //@MinLength(3)
    Lastname: string;

    @IsNotEmpty()
    //@MinLength(3)
    Nickname: string;
    
    @IsNotEmpty()
    @IsEmail()
    Email: string;

    @IsNotEmpty()
    //@MinLength(8)
    Password: string;
}