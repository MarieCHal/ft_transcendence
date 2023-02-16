import { Body, Controller, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';
import { RegisterService } from '../services/register.service';
import { Public } from 'src/public';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('sign-in')
export class RegisterController {
    constructor (private readonly RegisterService : RegisterService) {}

    /*@Public()
    @Post()
    @UsePipes(ValidationPipe)
    Register(@Body() registerDto: RegisterDto){
        return this.RegisterService.RegisterServ(registerDto)
    }*/

    @Public()
    @Post()
    @UseInterceptors(FileInterceptor('Avatar'))
    @UsePipes(ValidationPipe)
    Register(@Body() registerDto: RegisterDto, @UploadedFile() Avatar: Express.Multer.File){
        console.log(Avatar)
        return this.RegisterService.RegisterServ(registerDto, Avatar.buffer)
    }
}
