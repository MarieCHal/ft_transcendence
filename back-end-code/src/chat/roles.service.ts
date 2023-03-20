import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mute, User } from 'src/typeorm';
import { Chat } from 'src/typeorm';
import { UsersService } from 'src/users/users.service';
import { createQueryBuilder, Repository } from 'typeorm';
import { ChatService } from 'src/chat/chat.service';



@Injectable()
export class RolesService {
   constructor (
     @InjectRepository(Chat) private readonly chatRepository: Repository<Chat>,
     @InjectRepository(User) private readonly userRepository: Repository<User>,
     @InjectRepository(Mute) private readonly muteRepository: Repository<Mute>,
    private userService: UsersService,
    //private chatService: ChatService
    ) {}
    
    async isOwner(userId: number, chanelId: number) {
        const isOwner = await this.chatRepository
                                .createQueryBuilder('chat')
                                .leftJoinAndSelect('chat.owner', 'owner')
                                .where('chat.chat_id = :id', {id: chanelId})
                                .andWhere('owner.user_id = :user_id', {user_id: userId})
                                .getRawOne()
        console.log("isOwner: ", isOwner);
        if (isOwner)
            return true;
        else
            return false;
    }

    async isBanned(userId: number, chanelId: number) {
        console.log(chanelId);
        console.log("user_id", userId);
        const isBanned = await this.chatRepository.createQueryBuilder('chat')
                                    .leftJoinAndSelect('chat.banned', 'banned')
                                    .select(['banned.user_id'])
                                    .where('chat.chat_id = :chat_id', {chat_id: chanelId})
                                    .andWhere('banned.user_id = :user_id', {user_id: userId})
                                    .getRawOne()

    console.log("isBanned: ", isBanned)
    if (isBanned)
        return true;
    return false;
    }

   async isAdmin(userId: number, chanelId: number) {
    const isAdmin = await this.chatRepository
                .createQueryBuilder('chat')
                .leftJoinAndSelect('chat.admins', 'admins')
                .select('admins.user_id')
                .where('chat.chat_id = :chat_id', {chat_id: chanelId})
                .andWhere('admins.user_id = :user_id', {user_id: userId})
                .getRawOne()

    console.log("isAdmin: ", isAdmin);
    if (isAdmin)
        return true;
    //console.log("isAdmin: ", isAdmin)
    /*for (let i = 0; isAdmin[i]; i++)
    {
       if (isAdmin[i].admins_user_id == userId)
            return true
    }*/
    return false;
    }

    async isMuted(userId: number, chanelId: number)
    {
        /*const isMuted = await this.chatRepository
                                    .createQueryBuilder('chat')
                                    .leftJoinAndSelect('chat.muted', 'muted')
                                    .where('chat.chat_id = :id', {id: chanelId})
                                    .andWhere('muted.user_id = :id', {id: userId})
                                    .getOne()
        if (isMuted)
            return  true
        else*/
            return false
    }

    async isInChanel(userId: number, chanelId: number) {
        const isChanel = await this.chatRepository
                    .createQueryBuilder('chat')
                    .leftJoinAndSelect('chat.users', 'users')
                    .where('chat.chat_id = :id', {id: chanelId})
                    //.andWhere('admins.user_id = :id', {id: userId})
                    .getRawMany()
    
        //console.log("isChanel: ", isChanel)
        for (let i = 0; isChanel[i]; i++)
        {
           if (isChanel[i].users_user_id == userId)
                return true
        }
            return false;
    }


    async getAllUsers(userId: number, chanelId: number) {
        const isInChan = await this.isInChanel(userId, chanelId);
        if (isInChan == false)
            return "Sorry, you can't access that data, you are not part of this channel";
        const users = await this.chatRepository
                                    .createQueryBuilder('chanel')
                                    .leftJoinAndSelect('chanel.users', 'users')
                                    .select(['users.user_id', 'users.nickname', 'users.isActive'])
                                    .where('chanel.chat_id = :chat_id', {chat_id: chanelId})
                                    .andWhere('users.user_id != :user_id', {user_id: userId})
                                    .getRawMany()
        console.log("chanel users: ", users);
        return {
            users
        }
    }

    async toAdmin(userId: number, toBeAdmin: number, chanelId: number)
    {
        console.log("userId: ", userId)
        console.log("otherId: ", toBeAdmin)
        console.log("chanelId: ", chanelId)
        const toAdmin = await this.userService.findOne(toBeAdmin);
        const isAlready = await this.isAdmin(toBeAdmin, chanelId);
        if (isAlready == true)
            return {
                message: `${toAdmin.nickname} is already an Admin`
            }
        
        const isAllowed = await this.isAdmin(userId, chanelId);
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
        return {
            message: `You succesfuly made ${toAdmin.nickname} admin of th channel: ${chan.name}`
        }
    }

    async toMute(userId: number, toBemute: number, chanelId: number) {
        console.log("userId: ", userId)
        console.log("otherId: ", toBemute)
        console.log("chanelId: ", chanelId)
        const toMute = await this.userService.findOne(toBemute);
        
        const isAllowed = await this.isAdmin(userId, chanelId);

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
        const newMuted = await this.chatRepository
                                    .createQueryBuilder()
                                    .relation(Chat, "muted")
                                    .of(newChat)
                                    .add(toMute);
        //console.log(newMuted);
        return {
            message: `You successfully made ${toMute.nickname} admin of channel ${chat.name}`
        }
    }

    async isBlocked(userId: number, otherId: number) {
        console.log("userId: ", userId)
        console.log("otherId: ", otherId)

        const isBlocked = await this.userRepository
                                    .createQueryBuilder('user')
                                    .leftJoinAndSelect('user.blocked', 'blocked')
                                    .select('blocked')
                                    .where('user.user_id = :user_id', {user_id: userId})
                                    .andWhere('blocked.user_id = :blocked_id', {blocked_id: otherId})
                                    .getRawOne()
        console.log("isBlocked", isBlocked)
        if (isBlocked)
            return true
        else
            return false
    }

    async blockUser(userId: number, otherId: number) {
        const checkBlock = await this.isBlocked(userId, otherId)

        const user = await this.userService.findOne(userId);

        const other = await this.userService.findOne(otherId);
        if (checkBlock == true)
            return {
                message: `you already blocked ${other.nickname}`
            }
        const user2 = await this.userRepository
                                .createQueryBuilder()
                                .relation(User, "blocked")
                                .of(user)
                                .add(other)
        //console.log(user2);
        return {
            message: `you successfully blocked ${other.nickname}`
        }
    }

    async getBlocked(userId: number) {
        const blocked = await this.userRepository
                                .createQueryBuilder('user')
                                .leftJoinAndSelect('user.blocked', 'blocked')
                                .where('user.user_id = :user_id', {user_id: userId})
                                .getOne();
        return blocked
    }

}