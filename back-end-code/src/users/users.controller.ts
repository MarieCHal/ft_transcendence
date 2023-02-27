import { Controller, Get, Injectable, Param, Post, Query, Res, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get } from 'http';
import { Public } from 'src/public';
import { User} from 'src/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { Readable } from 'stream';
import { Response } from 'express';


@Controller('users')
export class UserController {
    constructor(private usersService: UsersService) {}

    /*@Public()
    @Get('avatar')
    async returnAvatar(@Query('nickname') Nickname : string, @Res({passthrough: true}) response: Response) {
        const Avatar = await this.usersService.returnAvatar(Nickname);

        console.log("nickname: ", Nickname);
        const stream = Readable.from(Avatar);
        
        response.set({
            'Content-Type': 'image'
        })
        return new StreamableFile(stream);
    }

    @Public()
    @Get('all/profile')
    async getAllUsers() {
        return this.usersService.findAll();
    }

    @Public()
    @Get('all/avatar')
    async getAllAvatar() {
        return this.usersService.returnAllAvatar();
    }
    */
    /*@Post('update/avatar')
    async updataAvatar()*/

}