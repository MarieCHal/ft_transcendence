import { Controller, Get, Request, Post, UseGuards, Body, ValidationPipe, UsePipes, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalStrategy } from '../strategy/local.strategy';
import { LocalAuthGuard } from '../guards/local_auth.guard';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Public } from 'src/public';
import { LoginUserDto } from '../dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ProfileService } from 'src/profile/profile.service';



@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,
        private profileService: ProfileService,
        private jwtService: JwtService) {}

    // to remove
    @Public()
    @Post('token')
    async test(@Body() body: any) {
        const payload = {username: 'marie', sub: body.id};
        console.log(body.id);
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    // to remove
    @Public()
    @Post('test')
    async createUSer(@Body() body: any) {
        console.log("test");
        const newUSer = await this.profileService.createProfile(body);
        console.log("newUser: ", newUSer);
        return await this.authService.generateAccessToken(newUSer)
    }

    @UseGuards(JwtAuthGuard)
    @Get('test')
    testtest(@Request() req: any ){
        console.log(req.user)
    }

    @Public()
    //@UseGuards(LocalAuthGuard)
    @Post('code')
    async DoubleAuthentification(@Request() req: any) {
        console.log("this is the req.body:", req.body);
        return this.authService.checkDoubleAuthCode(req.body.nickname, req.body.codeMail);
    }

}
