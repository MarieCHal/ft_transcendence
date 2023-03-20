import { Body, Controller, Delete, Get, Injectable, Param, Post, Query, Request, Res, StreamableFile, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Public } from 'src/public';
import { UsersService } from './users.service';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';



@Controller('users')
export class UserController {
    constructor(private usersService: UsersService) {}


    @Get('avatar/:id')
    @UseGuards(JwtAuthGuard)
    async getAllUsers(@Param('id') id, @Res({passthrough: true}) res: Response)
    {
        console.log("get Avatar: ", id)
        res.set({'Content-Type': 'image/jpeg'});

        const user = await this.usersService.findOne(id);
        const imageLocation = join(process.cwd(), 'uploads/avatars', user.avatar);
        const file = createReadStream(imageLocation);
        return new StreamableFile(file);
    }

    @Get('profile/:id') 
    @UseGuards(JwtAuthGuard)
    async getProfile (@Param('id') id: any){
        return this.usersService.returnProfile(id);
    }


    /** @brief  */
    @Get('all') 
    @UseGuards(JwtAuthGuard)
    async getAllProfile (@Request() req: any) {
        console.log("get all profile", req.user.user_id);
        return this.usersService.findAll(req.user.user_id);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    async getMySelf(@Request() req: any) {
        console.log('me', req.user.user_id);
        return this.usersService.mySelf(req.user.user_id);
    }

    @Post('friend-request')
    @UseGuards(JwtAuthGuard)
    async friendRequest(@Request() req: any) {
        console.log('friend-request', req.body);
        console.log('re.user: ', req.user.user_id);
        return this.usersService.friendRequest(req.user.user_id, req.body.id)
    }

    @Post('friend-accept')
    @UseGuards(JwtAuthGuard)
    async acceptFriends(@Request() req: any) {
        console.log('friend-accept', req.body.id);
        console.log('friend-accept', req.body.decision);
        if (req.body.decision == true)
            return this.usersService.acceptFriendRequest(req.user.user_id, req.body.id)
        else if (req.body.decision == false)
            return this.usersService.rejectFriendRequest(req.user.user_id, req.body.id);
    }

    @Post('delete-friend')
    @UseGuards(JwtAuthGuard)
    async deleteFriend(@Request() req: any) {
        return this.usersService.stopFrienship(req.user.user_id, req.body.id);
    }

    @Post('doubleAuth')
    @UseGuards(JwtAuthGuard)
    async modifyDoubleAuth(@Request() req: any) {
        console.log("doubleAuth:", req.body);
        this.usersService.doubleAuth(req.user.user_id, req.body.doubleAuth);
    }

}