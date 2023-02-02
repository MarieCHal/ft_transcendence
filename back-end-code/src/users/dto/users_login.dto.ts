import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginUserDto {
    @IsNotEmpty()
    Nickname: string;
    
    @IsNotEmpty()
    password: string;
}