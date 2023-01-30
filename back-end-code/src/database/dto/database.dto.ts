import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateDatabaseDto {
    @IsNotEmpty()
    @MinLength(3)
    username: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}