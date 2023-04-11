import {
    ClassSerializerInterceptor,
    Controller,
    Header,
    Post, 
    UseInterceptors,
    Res,
    UseGuards,
    Req,
    Body,
    UnauthorizedException,
}   from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/typeorm';
import { TwoFactorAuthenticationService } from '../services/twoFactorAuthentication.service';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { AuthService } from '../services/auth.service';

@Controller('2fa')
@UseInterceptors(ClassSerializerInterceptor)
export class TwoFactorAuthenticationController {
    constructor(
        private readonly twoFactorAuthenticationService : TwoFactorAuthenticationService,
        private readonly usersService: UsersService,
        private readonly authservice: AuthService,
        @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    ) {}
    
    @Post('authenticate')
    async authenticate(@Req() req: any) {
        console.log("req nickname: ", req.body.nickname, "req code: ", req.body.code);
        const user = await this.userRepository.findOne({
            where: {
                nickname: req.body.nickname
            }
        })
        console.log("user: ", user);
        const isValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(req.body.code, user);
        if (!isValid) {
            throw new UnauthorizedException("Wrong authentication code");
        }
        return this.authservice.generateAccessToken(user);
    }

    @Post('generate')
    async register(@Res() response: Response, @Req() request: any)
    {
        console.log("IAM IN GENERATE");
        console.log("request ============================ : ", request.user)
        const { otpauthUrl } = await this.twoFactorAuthenticationService.generateTwoFactSecret(request.user);
        return await this.twoFactorAuthenticationService.pipeQrCodeStream(response, otpauthUrl);
    }

    @Post('change')
    async turnOnTwoFactorAuth( @Req() req: any) {
        console.log("req user: ", req.user, "req code: ", req.body.code, "req double auth value: ", req.body.doubleAuth);
        const isValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(req.body.code, req.user);
        if (!isValid) {
            throw new UnauthorizedException("Wrong authentication code");
        }
        await this.usersService.doubleAuth(req.user, req.body.doubleAuth);
    }

}
