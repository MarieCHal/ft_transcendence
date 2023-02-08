import { Controller, Request, Post, UseGuards, Body, ValidationPipe, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalStrategy } from '../strategy/local.strategy';
import { LocalAuthGuard } from '../guards/local_auth.guard';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Public } from 'src/public';
import { LoginUserDto } from '../dto/login.dto';



@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('login')
    @UsePipes(ValidationPipe)
    login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.validateUser(loginUserDto)
    }
    
    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('code')
    async DoubleAuthentification(@Request() req: any) {
        console.log(req.body);
        return this.authService.generateAccessToken(req.user);
    }

}
