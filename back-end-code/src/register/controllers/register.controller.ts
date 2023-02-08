import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';
import { RegisterService } from '../services/register.service';
import { Public } from 'src/public';

@Controller('sign-in')
export class RegisterController {
    constructor (private readonly RegisterService : RegisterService) {}

    @Public()
    @Post()
    @UsePipes(ValidationPipe)
    Register(@Body() registerDto: RegisterDto){
        return this.RegisterService.RegisterServ(registerDto)
    }
}
