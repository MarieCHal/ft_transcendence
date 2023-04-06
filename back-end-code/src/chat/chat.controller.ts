import { Controller, Post, UseGuards, Response, Request, Get, Put, Param, Delete, Body } from '@nestjs/common';
import { ChatService } from './chat.service';
import { RolesService } from './roles.service';

@Controller('chat')
export class ChatController {
    constructor(private chatService: ChatService,
                private rolesService: RolesService) {}

    @Post('create')
    async createChannel (@Request() req: any) {
        console.log("create");
       console.log("body: ", req.body);
       console.log("req.user: ", req.user);
       return await this.chatService.createChanel(req.user, req.body);
    }

    @Get('all')
    async getAll(@Request() req: any) {
        return await this.chatService.getMyChans(req.user);
    }

    @Get('join/:id')
    async getChan(@Param('id') id: any, @Request() req: any, @Response() res: any) {
        //console.log('req.body: ')
        if (id === undefined) {
            return res.status(400).json({ message: `id in ${req.baseUrl} is undefined` });
        }
        console.log("join id: ", id);
        //return await this.chatService.userContext(req.user, id);
        return res.status(200).json(await this.chatService.userContext(req.user, id));  
        
    }

    @Get('update/:id')
    async updateChat(@Param('id') id: number, @Request() req: any) {
        let isKicked = await this.rolesService.isInChanel(req.user, id)
        if (isKicked == true)
            isKicked = false;
        else
            isKicked = true;
        const userContext = await this.chatService.userContext(req.user, id);
        return {
            isKicked,
            userContext
        }
    }

    @Post('code')
    async checkCodeChan(@Request() req: any)
    {
        console.log("chat/code: ", req.body);
        return await this.chatService.checkChanPwd(req.user, req.body.chanId, req.body.checkCode);
    }

    @Post('pwd')
    async pwdChan(@Request() req: any)
    {
        console.log("ped: ", req.body.chanelId)
        console.log("pwd: ", req.body.pwd)
        return await this.chatService.changePwd(req.user, req.body.chanelId, req.body.pwd)
    }

    @Delete('del/:id')
    async gdelChan(@Param('id') id: any, @Request() req: any, @Response() res: any) {
        //console.log('req.body: ')
        if (id === undefined) {
            return res.status(400).json({ message: `id in ${req.baseUrl} is undefined` });
        }
        console.log("join id: ", id);
        return res.status(200).json(await this.chatService.deleteChan(req.user, id));  
        //return await this.chatService.deleteChan(req.user, id);
    }

    @Post('quit')
    async quitChan(@Request() req: any) {
        console.log("quit chan: ", req.body.chanelId);
        await this.chatService.leaveChanel(req.user, req.body.chanelId)
        console.log("ok leaving");
        return await this.chatService.getMyChans(req.user);
    }

    @Get('history/:id')
    async getHistory(@Param('id') id: any, @Request() req: any, @Response() res: any) {
        //console.log('req.body: ')
        if (id === undefined) {
            return res.status(400).json({ message: `id in ${req.baseUrl} is undefined` });
        }
        return res.status(200).json(await this.chatService.getChanHistory(req.user, id));  
        //return await this.chatService.getChanHistory(req.user, id);
    }

    // to remove
    @Post('message/:id')
    async createMess(@Param('id') id: any, @Request() req: any, @Response() res: any) {
        //console.log('req.body: ')
        if (id === undefined) {
            return res.status(400).json({ message: `id in ${req.baseUrl} is undefined` });
        }
        return res.status(200).json(await this.chatService.newMessage(req.user, id, req.body.text));  
        //return await this.chatService.newMessage(req.user, id, req.body.text);
    }

    // to remove
    @Get('chanels/:id')
    async getChans(@Param('id') id: any, @Request() req: any, @Response() res: any) {
        //console.log('req.body: ')
        if (id === undefined) {
            return res.status(400).json({ message: `id in ${req.baseUrl} is undefined` });
        }
        console.log(req.user)
        console.log("chanel id:", id);
        return res.status(200).json(await this.chatService.getChannelInfo(id));  
        //return await this.chatService.getChannelInfo(id);
    }

    @Get('users/:id')
    async getAllUsers(@Param('id') id: any, @Request() req: any, @Response() res: any) {
        //console.log('req.body: ')
        if (id === undefined) {
            return res.status(400).json({ message: `id in ${req.baseUrl} is undefined` });
        }
        //return await this.rolesService.getAllUsers(req.user, id);
        return res.status(200).json(await this.rolesService.getAllUsers(req.user, id))
    }

    @Post('kick')
    async kickUser(@Request() req: any) {
        console.log("kick: ", req.body);
        return await this.chatService.toKick(req.user, req.body.otherId, req.body.chanelId)
    }

    @Post('bann')
    async banUser(@Request() req: any) {
        console.log("ban: ", req.body);
        return await this.chatService.toBan(req.user, req.body.otherId, req.body.chanelId)
    }

    @Post('mute')
    async muteUser(@Request() req: any) {
        console.log("mute: ", req.body);
        return await this.rolesService.toMute(req.user, req.body.otherId, req.body.chanelId);
    }

    @Get('isMuted/:id')
    async getMuted(@Param('id') id: any, @Request() req: any, @Response() res: any) {
        //console.log('req.body: ')
        if (id === undefined) {
            return res.status(400).json({ message: `id in ${req.baseUrl} is undefined` });
        }
        return res.status(200).json(await this.rolesService.isMuted(req.user, id))
        // return this.rolesService.isMuted(req.user, id)
    }

    @Post('admin')
    async adminUser(@Request() req: any) {
        console.log("admin: ", req.body);
        return await this.rolesService.toAdmin(req.user, req.body.otherId, req.body.chanelId)
    }

    @Post('block')
    async blockUser(@Request() req: any) {
        console.log(req.body.otherId);
        return this.rolesService.blockUser(req.user, req.body.otherId);
    }

    @Get('blocked')
    async getMyblocked(@Request() req: any) {
        return await this.rolesService.getBlocked(req.user)
    }

}
