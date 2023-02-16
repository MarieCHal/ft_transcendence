import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from '../DTO/create-user.dto';
import { SignInService } from '../Services/sign_in.service';

@Controller('sign_in')
export class SignInController {
    constructor(private readonly signInService: SignInService) {}

    @Post()
    @UsePipes(ValidationPipe)
    createUser(@Body() createUserDto: CreateUserDto){
        return this.signInService.creatuserService(createUserDto);
    }
}
