import { IsNotEmpty } from "class-validator";

export class CheckCodeDto {
    @IsNotEmpty()
    Nickname: string;

    @IsNotEmpty()
    Code: number;
}