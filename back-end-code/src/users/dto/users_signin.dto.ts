import { IsEmail, IsNotEmpty, MinLength, Equals } from "class-validator";
import { Equal } from "typeorm";

export class CreateUserDto {
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
    email: string;

    @IsNotEmpty()
    //@MinLength(8)
    password: string;
    
    @IsNotEmpty()
    //@Equals($password: any)
    password2: string;
}