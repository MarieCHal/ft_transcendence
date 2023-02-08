import { Controller, Post, ValidationPipe, UsePipes, Body, Request } from '@nestjs/common';
import { LoginUserDto } from '../dto/login.dto';
import { CheckCodeDto } from '../dto/CheckCode.dto';
import { LoginService } from '../services/login.service';
import { LoginInterface } from '../interfaces/login.interface';


@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Post()
    @UsePipes(ValidationPipe)
    userLogin(@Body() loginUserDto: LoginUserDto)
    {
        return this.loginService.UserLogin(loginUserDto);
    }

    @Post('code')
    @UsePipes(ValidationPipe)
    checkCode(@Body() checkCodeDto: CheckCodeDto, @Request() request)
    {
        console.log('checkCode Login' + checkCodeDto.Nickname)
        console.log(request)
        return this.loginService.CheckCode(checkCodeDto)
    }
}
