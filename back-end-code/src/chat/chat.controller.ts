import { Controller, Post, UseGuards, Request, Get, Put, Param, Delete, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ChatService } from './chat.service';
import { RolesService } from './roles.service';

@Controller('chat')
export class ChatController {
    constructor(private chatService: ChatService,
                private rolesService: RolesService) {}

    @Get('isMuted/:id')
    @UseGuards(JwtAuthGuard)
    async getMuted(@Param('id') id: any, @Request() req: any) {
        //console.log('req.body: ')
        return this.rolesService.isMuted(req.user.user_id, id)
    }

    @Post('create')
    @UseGuards(JwtAuthGuard)
    async createChannel (@Request() req: any) {
        console.log("create");
       console.log("body: ", req.body);
       console.log("req.user.user_id: ", req.user.user_id);
       return await this.chatService.createChanel(req.user.user_id, req.body);
    }

    @Get('all')
    @UseGuards(JwtAuthGuard)
    async getAll(@Request() req: any) {
        return await this.chatService.getMyChans(req.user.user_id);
    }

    @Get('join/:id')
    @UseGuards(JwtAuthGuard)
    async getChan(@Param('id') id: any, @Request() req: any) {
        console.log("join id: ", id);
        return await this.chatService.userContext(req.user.user_id, id);
    }

    @Post('code')
    @UseGuards(JwtAuthGuard)
    async checkCodeChan(@Request() req: any)
    {
        console.log("chat/code: ", req.body);
        return await this.chatService.checkChanPwd(req.user.user_id, req.body.chanId, req.body.checkCode);
    }

    @Post('pwd')
    @UseGuards(JwtAuthGuard)
    async pwdChan(@Request() req: any)
    {
        console.log("ped: ", req.body.chanelId)
        console.log("pwd: ", req.body.pwd)
        return await this.chatService.changePwd(req.user.user_id, req.body.chanelId, req.body.pwd)
    }

    @Delete('del/:id')
    @UseGuards(JwtAuthGuard)
    async gdelChan(@Param('id') id: any, @Request() req: any) {
        console.log("join id: ", id);
        return await this.chatService.deleteChan(req.user.user_id, id);
    }

    @Post('quit')
    @UseGuards(JwtAuthGuard)
    async quitChan(@Request() req: any) {
        console.log("quit chan: ", req.body.chanelId);
        await this.chatService.leaveChanel(req.user.user_id, req.body.chanelId)
        return await this.chatService.getMyChans(req.user.user_id);
    }

    // for test
    @Get('history/:id')
    @UseGuards(JwtAuthGuard)
    async getHistory(@Param('id') id: any, @Request() req: any) {
        return await this.chatService.getChanHistory(req.user.user_id, id);
    }

    //for test 
    @Post('message/:id')
    @UseGuards(JwtAuthGuard)
    async createMess(@Param('id') id: any, @Request() req: any) {
        return await this.chatService.newMessage(req.user.user_id, id, req.body.text);
    }

    // to remove
    @Get('chanels/:id')
    @UseGuards(JwtAuthGuard)
    async getChans(@Param('id') id: any, @Request() req: any) {
        console.log(req.user.user_id)
        console.log("chanel id:", id);
        return await this.chatService.getChannelInfo(id);
    }

    @Get('users/:id')
    @UseGuards(JwtAuthGuard)
    async getAllUsers(@Param('id') id: any, @Request() req: any) {
        return await this.rolesService.getAllUsers(req.user.user_id, id);
    }

    @Post('kick')
    @UseGuards(JwtAuthGuard)
    async kickUser(@Request() req: any) {
        console.log("kick: ", req.body);
        return await this.chatService.toKick(req.user.user_id, req.body.otherId, req.body.chanelId)
    }

    @Post('bann')
    @UseGuards(JwtAuthGuard)
    async banUser(@Request() req: any) {
        console.log("ban: ", req.body);
        return await this.chatService.toBan(req.user.user_id, req.body.otherId, req.body.chanelId)
    }

    // to do
    @Post('mute')
    @UseGuards(JwtAuthGuard)
    async muteUser(@Request() req: any) {
        console.log("mute: ", req.body);
        return await this.rolesService.toMute(req.user.user_id, req.body.otherId, req.body.chanelId);
    }

    @Post('admin')
    @UseGuards(JwtAuthGuard)
    async adminUser(@Request() req: any) {
        console.log("admin: ", req.body);
        return await this.rolesService.toAdmin(req.user.user_id, req.body.otherId, req.body.chanelId)
    }

    @Post('block')
    @UseGuards(JwtAuthGuard)
    async blockUser(@Request() req: any) {
        console.log(req.body.otherId);
        return this.rolesService.blockUser(req.user.user_id, req.body.otherId);
    }

    // to remove
    @Get('blocked')
    @UseGuards(JwtAuthGuard)
    async getMyblocked(@Request() req: any) {
        return await this.rolesService.getBlocked(req.user.user_id)
    }

    @Get('myHistory/:id')
    @UseGuards(JwtAuthGuard)
    async getMyHistory(@Request() req: any) {
    }

}
