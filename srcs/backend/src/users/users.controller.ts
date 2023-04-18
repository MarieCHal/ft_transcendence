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

    @Get('me')
    //@UseGuards(JwtAuthGuard)
    async getMySelf(@Request() req: any) {
        console.log('me', req.user);
        return await this.usersService.mySelf(req.user.user_id);
    }

    @Get('avatar/:id')
    async getAllUsers(@Param('id') id: number, @Res({passthrough: true}) res: Response)
    {
        
        res.set({'Content-Type': 'image/jpeg'});

        const user = await this.usersService.findOne(id);
        const imageLocation = join(process.cwd(), 'uploads/avatars', user.avatar);
        const file = createReadStream(imageLocation);
        return new StreamableFile(file);
    }

    @Get('profile/:id') 
    //@UseGuards(JwtAuthGuard)
    async getProfile (@Param('id') id: number){
        return await this.usersService.returnProfile(id);
    }

    @Get('all') 
    //@UseGuards(JwtAuthGuard)
    async getAllProfile (@Request() req: any) {
        console.log("get all profile", req.user);
        return await this.usersService.findAll(req.user);
    }


    @Post('friend-request')
    //@UseGuards(JwtAuthGuard)
    async friendRequest(@Request() req: any) {
        console.log('friend-request', req.body);
        console.log('re.user: ', req.user);
        return await this.usersService.friendRequest(req.user, req.body.id)
    }

    @Post('friend-accept')
    //@UseGuards(JwtAuthGuard)
    async acceptFriends(@Request() req: any) {
        console.log('friend-accept', req.body.id);
        console.log('friend-accept', req.body.decision);
        if (req.body.decision == true)
            return await this.usersService.acceptFriendRequest(req.user, req.body.id)
        else if (req.body.decision == false)
            return await this.usersService.rejectFriendRequest(req.user, req.body.id);
    }

    @Post('delete-friend')
    //@UseGuards(JwtAuthGuard)
    async deleteFriend(@Request() req: any) {
        return this.usersService.stopFrienship(req.user, req.body.id);
    }

    @Post('doubleAuth')
    async modifyDoubleAuth(@Request() req: any) {
        console.log("doubleAuth:", req.body);
        return await this.usersService.doubleAuth(req.user, req.body.doubleAuth);
    }

    @Get('match-history/:id')
    async getMatchHistory(@Request() req: any, @Param('id') id: number) {
        return await this.usersService.returnMatch(id)
    }

}