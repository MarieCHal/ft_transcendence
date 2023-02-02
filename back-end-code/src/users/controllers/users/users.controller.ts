import {
Body,
Controller,
Get,
Param,
ParseArrayPipe,
ParseIntPipe,
Post,
UsePipes,
ValidationPipe,
} from '@nestjs/common'; 
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { LoginUserDto } from 'src/users/dto/users_login.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('name')
    getAllUsers()
    {
        return this.usersService.showAllUsers();
    }

    @Post('login')
    @UsePipes(ValidationPipe)
    UserLogin(@Body() loginUserDto: LoginUserDto) {
        return this.usersService.UserLogin(loginUserDto);
    }

    @Post('sign_in')
    @UsePipes(ValidationPipe) // checks if the body corresponds to the defined rules in the dto
    userSignin(@Body() createUserDto: CreateUserDto) {
        return this.usersService.userSigninService(createUserDto);
    }
}
