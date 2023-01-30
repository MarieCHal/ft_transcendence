import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users-dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get() // http request used to get info
    UserInfo() : User[] {
        return this.userService.UserInfo();
    }

    @Get(':id')
    OneUserInfo(@Param() param) : string {
        return `user id: ${param.id}`;
    }

    @Post() // http request used to create new info
    signIn(@Body() createUserDto: CreateUsersDto): string {
        return `First Name: ${createUserDto.FirstName}, Last Name: ${createUserDto.LastName}`; 
    }
}
