import { Controller, Request, Post, UseGuards, Body, ValidationPipe, UsePipes, UnauthorizedException } from '@nestjs/common';
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

    
    @Post('token')
    async test(@Body() body : any) {
        console.log("this is the sent state: ", body.result);
        /*let result = await this.authService.checkDoubleAuth(body.state);
        if (result === 0)
            return this.authService.getAccessToken(body.state);
        else if (result === 1)
            return {
                doubleAuth: true
            }
        else 
            throw new UnauthorizedException("Incorrect State");*/
        //return this.authService.getAccessToken(body.result);
    }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('code')
    async DoubleAuthentification(@Request() req: any) {
        console.log("this is the req.body:", req.body);
        return this.authService.generateAccessToken(req.user);
    }
}
