import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mute, Users } from 'src/typeorm';
import { Chat } from 'src/typeorm';
import { UsersService } from 'src/users/users.service';
import { createQueryBuilder, Repository } from 'typeorm';
import { ChatService } from 'src/chat/chat.service';
import { SocketService } from 'src/socket/socket.service';
import { Socket, Server} from 'socket.io';



@Injectable()
export class RolesService {
   constructor (
     @InjectRepository(Chat) private readonly chatRepository: Repository<Chat>,
     @InjectRepository(Users) private readonly userRepository: Repository<Users>,
     @InjectRepository(Mute) private readonly muteRepository: Repository<Mute>,
    private userService: UsersService,
    private socketService: SocketService,
    ) {}
    
    //server: Server = this.socketService.getServer()

    async isOwner(user: Users, chanelId: number) {
        const isOwner = await this.chatRepository
                                .createQueryBuilder('chat')
                                .leftJoinAndSelect('chat.owner', 'owner')
                                .where('chat.chat_id = :id', {id: chanelId})
                                .andWhere('owner.user_id = :user_id', {user_id: user.user_id})
                                .getRawOne()
        if (isOwner)
            return true;
        else
            return false;
    }

    async isBanned(user: Users, chanelId: number) {
        console.log(chanelId);
        const isBanned = await this.chatRepository.createQueryBuilder('chat')
                                    .leftJoinAndSelect('chat.banned', 'banned')
                                    .select(['banned.user_id'])
                                    .where('chat.chat_id = :chat_id', {chat_id: chanelId})
                                    .andWhere('banned.user_id = :user_id', {user_id: user.user_id})
                                    .getRawOne()

    //console.log("isBanned: ", isBanned)
    if (isBanned)
        return true;
    return false;
    }

   async isAdmin(user: Users, chanelId: number) {
    const isAdmin = await this.chatRepository
                .createQueryBuilder('chat')
                .leftJoinAndSelect('chat.admins', 'admins')
                .select('admins.user_id')
                .where('chat.chat_id = :chat_id', {chat_id: chanelId})
                .andWhere('admins.user_id = :user_id', {user_id: user.user_id})
                .getRawOne()

    if (isAdmin)
        return true;
    return false;
    }

    async isMuted(user: Users, chanelId: number)
    {
        const now = new Date();
        const time = 30000; // 30 sec in millisec
        //console.log('now: ', now);
        const muted = await this.muteRepository.createQueryBuilder('muted')
                                    .leftJoinAndSelect('muted.users', 'users')
                                    .leftJoinAndSelect('muted.chat', 'chat')
                                    .where('users.user_id = :user_id', {user_id: user.user_id})
                                    .andWhere('chat.chat_id = :chat_id', {chat_id: chanelId})
                                    .getOne()
        if (muted == null)
            return false

        const diff = now.getTime() - muted.createdAt.getTime();

        const chan = await this.chatRepository.findOne({
            where: {
                chat_id: chanelId
            }
        })
        if (diff > time)
        {
            await this.chatRepository
            .createQueryBuilder()
            .relation(Chat, "muted")
            .of(chan)
            .remove(muted)

            await this.muteRepository.delete(muted)
            return false
        }
        return true
    }

    async isInChanel(user: Users, chanelId: number) {
        const isChanel = await this.chatRepository
                    .createQueryBuilder('chat')
                    .leftJoinAndSelect('chat.users', 'users')
                    .where('chat.chat_id = :id', {id: chanelId})
                    //.andWhere('admins.user_id = :id', {id: user.user_id})
                    .getRawMany()
    
        for (let i = 0; isChanel[i]; i++)
        {
           if (isChanel[i].users_user_id == user.user_id)
                return true
        }
            return false;
    }


    async getAllUsers(user: Users, chanelId: number) {
        const isInChan = await this.isInChanel(user, chanelId);
        if (isInChan == false)
            return "Sorry, you can't access that data, you are not part of this channel";
        const users = await this.chatRepository
                                    .createQueryBuilder('chanel')
                                    .leftJoinAndSelect('chanel.users', 'user')
                                    .leftJoinAndSelect('user.stats', 'stats')
                                    .select(['user.user_id', 'user.nickname', 'user.isActive', 'user.stats'])
                                    .where('chanel.chat_id = :chat_id', {chat_id: chanelId})
                                    .andWhere('user.user_id != :user_id', {user_id: user.user_id})
                                    .getRawMany()
        console.log("chanel users: ", users);
        return {
            users
        }
    }

    async toAdmin(user: Users, toBeAdmin: number, chanelId: number)
    {
        console.log("user.user_id: ", user.user_id)
        console.log("otherId: ", toBeAdmin)
        console.log("chanelId: ", chanelId)
        const toAdmin = await this.userService.findOne(toBeAdmin);
        const isAlready = await this.isAdmin(toAdmin, chanelId);
        if (isAlready == true)
            return {
                message: `${toAdmin.nickname} is already an Admin`
            }
        
        const isAllowed = await this.isAdmin(user, chanelId);
        const chan = await this.chatRepository.findOne({
            where : {
                chat_id: chanelId
            }
        })

        if (isAllowed == false) 
            return {
                message: `You are not admin or owner of channel ${chan.name}`
            }
        
        const newAdmin = await this.chatRepository
                                    .createQueryBuilder()
                                    .relation(Chat, "admins")
                                    .of(chan)
                                    .add(toAdmin)
        
        console.log("newAdmin: ", newAdmin);
        //let room = chan.chat_id.toString();
        let server: Server = this.socketService.getServer()
        //server.to(room).emit('notifChat', 'userContext')
        //console.log("ADMIIIINNNN ")
        //this.socketService.returnAll();
        let socket = this.socketService.getSocket(toAdmin);
        console.log("admin socket: ", socket)
        server.to(socket).emit('notifChat', 'userContext')
        return {
            message: `You succesfuly made ${toAdmin.nickname} admin of th channel: ${chan.name}`
        }
    }

    async toMute(user: Users, toBemute: number, chanelId: number) {
        console.log("user.user_id: ", user.user_id)
        console.log("otherId: ", toBemute)
        console.log("chanelId: ", chanelId)
        const toMute = await this.userService.findOne(toBemute);
        
        const isAllowed = await this.isAdmin(user, chanelId);

        const chat = await this.chatRepository.findOne({
            where: {
                chat_id: chanelId
            }
        })
        const toMuteChat = new Mute();
        toMuteChat.users = toMute;
        toMuteChat.chat = chat;
        const newChat = await this.muteRepository.save(toMuteChat);

        if (isAllowed == false)
            return {
                message: `You are not admin or owner of channel ${chat.name}`
            }
        await this.chatRepository
                        .createQueryBuilder()
                        .relation(Chat, "muted")
                        .of(newChat)
                        .add(toMute);
        //console.log(newMuted);
        let server: Server = this.socketService.getServer()
        let socket = this.socketService.getSocket(toMute);
        server.to(socket).emit('notifChat', 'userContext')
        return {
            message: `You successfully made ${toMute.nickname} admin of channel ${chat.name}`
        }
    }

    async isBlocked(user: Users, otherId: number) {
        const isBlocked = await this.userRepository
                                    .createQueryBuilder('user')
                                    .leftJoinAndSelect('user.blocked', 'blocked')
                                    .select('blocked')
                                    .where('user.user_id = :user_id', {user_id: user.user_id})
                                    .andWhere('blocked.user_id = :blocked_id', {blocked_id: otherId})
                                    .getRawOne()
        if (isBlocked)
            return true
        else
            return false
    }

    // remove otherId from the user.user_id's list of blocked users
    async unBlock(user: Users, otherId: number) {
         const user_blocked = await this.userRepository.createQueryBuilder('user')
                                    .leftJoinAndSelect('user.blocked', 'blocked')
                                    .where('user.user_id = :user_id', {user_id: user.user_id})
                                    .andWhere('blocked.user_id = :other_id', {other_id: otherId})
                                    .getOne()

        const other = await this.userService.findOne(otherId)
        if (!user_blocked)
            return `User ${other.nickname} isn't blocked`;
        const remove = await this.userRepository.createQueryBuilder()
                                    .relation(Users, "blocked")
                                    .of(user)
                                    //.of(user_blocked)
                                    .remove(other)
        console.log(remove)
        return remove;
    }

    // adds otherId to user.user_id's list of blocked users
    async blockUser(user: Users, otherId: number) {
        const checkBlock = await this.isBlocked(user, otherId)

        const other = await this.userService.findOne(otherId);
        if (checkBlock == true)
        {
            await this.unBlock(user, otherId);
            const blocked = await this.getBlocked(user);
            return {
                blocked,
                message: `you removed ${other.nickname} from your blocked contact`
            }
        }
        const user2 = await this.userRepository
                                    .createQueryBuilder()
                                    .relation(Users, "blocked")
                                    .of(user)
                                    .add(other)
        const blocked = await this.getBlocked(user);
        return {
            message: `you successfully blocked ${other.nickname}`,
            blocked: blocked
        }
    }

    // returns an array containing the ids of the users blocked by user.user_id
    async getBlocked(user: Users) {
        const blocked = await this.userRepository
                                .createQueryBuilder('user')
                                .leftJoinAndSelect('user.blocked', 'blocked')
                                .select('blocked.user_id')
                                .where('user.user_id = :user_id', {user_id: user.user_id})
                                .getRawMany();
        return blocked
    }
}