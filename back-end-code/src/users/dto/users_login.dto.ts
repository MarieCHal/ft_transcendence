import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginUserDto {
    @IsNotEmpty()
    @MinLength(3)
    Nickname: string;
    
    @IsNotEmpty()
    @MinLength(3)
    password: string;

}