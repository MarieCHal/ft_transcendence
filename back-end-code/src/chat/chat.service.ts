import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { Chat } from 'src/typeorm';
import { Message } from 'src/typeorm';
import { Mute } from 'src/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { RolesService } from './roles.service';
import * as bcrypt from 'bcrypt';
import { AppGateway } from 'src/app/app.gateway';
import { SocketService } from 'src/socket/socket.service';
import { Socket, Server} from 'socket.io';
import {
    WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  } from '@nestjs/websockets'


@Injectable()
export class ChatService {
   constructor (
     @InjectRepository(Chat) private readonly chatRepository: Repository<Chat>,
     @InjectRepository(Message) private readonly messRepository: Repository<Message>,
     @InjectRepository(User) private readonly userRepository: Repository<User>,
    private userService: UsersService,
    private rolesService: RolesService,
    private socketService: SocketService
    //private appGateway: AppGateway,
   ) {}

   async findOne(chanelId: number) {
    const chan = await this.chatRepository.findOne({
        where: {
            chat_id: chanelId
        }
    })
    return chan;
   }

   // to remove
   async getChannelInfo(chanelId: number) {
    const chan = await this.chatRepository
                        .createQueryBuilder('chat')
                        .leftJoinAndSelect('chat.banned', 'banned')
                        .leftJoinAndSelect('chat.muted', 'muted')
                        .leftJoinAndSelect('muted.users', 'user')
                        .leftJoinAndSelect('chat.admins', 'admins')
                        .leftJoinAndSelect('chat.users', 'users')
                        .leftJoinAndSelect('chat.owner', 'owner')
                        .where('chat.chat_id = :id', {id: chanelId})
                        .getOne()
        console.log("this is the chanel: ", chan);
        return chan
   }

   async checkChanExist(name: string) {
    let checkExist = await this.chatRepository.createQueryBuilder('chat')
                                .where('chat.name = :chat_name', {chat_name: name})
                                .getOne()
    return checkExist;
   }

   //creates a new chat 
   //!!!!! check the boleans condition private
    async createChanel(userId: number, params: any) {
        const owner = await this.userService.findOne(userId);

        //check for specificities of the chat
        if (params.private == true) // if it is a privmsg
        {
            const other = await this.userService.findOne(params.otherId);
            let name:string;
            name = owner.nickname + '-' + other.nickname;
            let checkExist = await this.checkChanExist(name);
            if (!checkExist)
            {
                name = other.nickname + '-' + owner.nickname;
                checkExist = await this.checkChanExist(name);
            }
            if (checkExist)
                return this.getChanHistory(userId, checkExist.chat_id)
            //console.log("private")
            const newChan = new Chat();
            newChan.owner = owner;
            newChan.admins = [owner];
            console.log("owner:", owner);
            console.log("other: ", other);
            newChan.name = name;
            newChan.isPrivate = true;
            newChan.users = [other, owner];
            newChan.nb_users = 2;
            const chat = await this.chatRepository.save(newChan)
            //const toReturn = await this.userContext(userId, chat.chat_id);
            const toReturn = await this.chatRepository
                                .createQueryBuilder('chanel')
                                .leftJoinAndSelect('chanel.users', 'users')
                                .select(['chanel.name', 'chanel.chat_id', 'chanel.isProtected'])
                                .where('chanel.chat_id = :chat_id', {chat_id: chat.chat_id})
                                .andWhere('chanel.isPrivate = :status', {status: true})
                                .andWhere('users.user_id = :user_id', {user_id: userId})
                                .getRawOne()
            return toReturn;
        }
        const checkChanExist = await this.checkChanExist(params.name);
        if (checkChanExist)
            return 'Please choose another name this channel already exists';
        const newChan = new Chat();
        newChan.owner = owner;
        newChan.admins = [owner];
        newChan.name = params.name;
        newChan.users = [owner];
        newChan.nb_users = 1;
        if (params.protected == true)
        {
            const salt = await bcrypt.genSalt();
            newChan.pwd = await bcrypt.hash(params.pwd, salt); // hash chan's pwd
            newChan.isProtected = true;
            const chat = await this.chatRepository.save(newChan)
            const toReturn = await this.chatRepository
                                .createQueryBuilder('chanel')
                                .leftJoinAndSelect('chanel.users', 'users')
                                .select(['chanel.name', 'chanel.chat_id', 'chanel.isProtected'])
                                .where('chanel.chat_id = :chat_id', {chat_id: chat.chat_id})
                                .andWhere('users.user_id = :user_id', {user_id: userId})
                                .andWhere('chanel.isPrivate = :status', {status: false})
                                .getRawOne()
            return toReturn;
        }
        const chat = await this.chatRepository.save(newChan)
        const toReturn = await this.chatRepository
                                .createQueryBuilder('chanel')
                                .leftJoinAndSelect('chanel.users', 'users')
                                .select(['chanel.name', 'chanel.chat_id', 'chanel.isProtected'])
                                .where('chanel.chat_id = :chat_id', {chat_id: chat.chat_id})
                                .andWhere('users.user_id = :user_id', {user_id: userId})
                                .andWhere('chanel.isPrivate = :status', {status: false})
                                .getRawOne()
        return toReturn;
    }

    async deleteChan(userId: number, chanelId: number) {
        
        const chan = await this.findOne(chanelId);
        if (!chan)
            return 'No such Channel';
        const owner = await this.rolesService.isOwner(userId, chanelId);
        if (owner)
        {
            await this.chatRepository.remove(chan);
            return "channel succesfuly removed"
        }
        return 'you are not the owner of this channel'
    }

    // get all the discussions of the user
    async getMyChans(userId: number) {
        
        console.log("userId get My chans: ", userId);
        const userChan = await this.userRepository.createQueryBuilder('user')
                                        .leftJoinAndSelect('user.chanel', 'chanel')
                                        .where('user.user_id = :user_id', {user_id: userId})
                                        .getOne()

        console.log("userChan", userChan);

        const privMsg = await this.userRepository
                                    .createQueryBuilder('user')
                                    .leftJoinAndSelect('user.chanel', 'chanel')
                                    .leftJoinAndSelect('chanel.users', 'users')
                                    .select(['chanel.name', 'chanel.chat_id', 'users.nickname'])
                                    .where('chanel.isPrivate = :status', {status: true})
                                    .andWhere('users.user_id != :users_id', {users_id: userId})
                                    .andWhere('user.user_id = :user_id', {user_id: userId})
                                    .getRawMany()
        
        console.log("privmsg: ", privMsg);
        const Mychanels = await this.chatRepository
                                    .createQueryBuilder('chanel')
                                    .leftJoinAndSelect('chanel.users', 'users')
                                    .select(['chanel.name', 'chanel.chat_id', 'chanel.isProtected'])
                                    .where('chanel.isPrivate = :status', {status: false})
                                    .andWhere('users.user_id = :user_id', {user_id: userId})
                                    .getRawMany()
        
            console.log("Mychans: ", Mychanels)
            let chanIds = [];
            for (let i = 0; Mychanels[i]; i++)
            {
                chanIds[i] = Mychanels[i].chanel_chat_id;
            }
            console.log("chanIds: ", chanIds);

            if (chanIds.length < 1)
            {
                const chanels = await this.chatRepository
                                    .createQueryBuilder('chanel')
                                    .where('chanel.isPrivate = :status', {status: false})
                                    .select(['chanel.name', 'chanel.chat_id', 'chanel.isProtected'])
                                    .getRawMany();

                console.log("chans: ", chanels)
                return {
                    privMsg,
                    Mychanels,
                    chanels
                }
            }
            else {
                const chanels = await this.chatRepository
                                        .createQueryBuilder('chanel')
                                        .where('chanel.chat_id NOT IN (:...chanIds)', {chanIds})
                                        .andWhere('chanel.isPrivate = :status', {status: false})
                                        .select(['chanel.name', 'chanel.chat_id', 'chanel.isProtected'])
                                        .getRawMany();

                console.log("chans: ", chanels)
                return {
                    privMsg,
                    Mychanels,
                    chanels
                }
            }                        
    }

    async userContext(userId: number, chanelId: number) {
        
        console.log(userId, chanelId);
        const chan = await this.findOne(chanelId);
        const user = await this.userService.findOne(userId);
        
        const banned = await this.rolesService.isBanned(userId, chanelId);
        let pwd = false;
        let isProtected = chan.isProtected;
        const muted = await this.rolesService.isMuted(userId, chanelId);
        const owner = await this.rolesService.isOwner(userId, chanelId);
        const admin = await this.rolesService.isAdmin(userId, chanelId);

        const checkUser = await this.rolesService.isInChanel(userId, chanelId);
        if (checkUser == true)
            return {
                isProtected,
                banned,
                pwd,
                muted,
                owner,
                admin
            }
        if (chan.isProtected == true)
            pwd = true;
        if (pwd == false && banned == false)
        {
            chan.nb_users += 1;
            const newchan = await this.chatRepository.save(chan);
            const result = await this.chatRepository
                                    .createQueryBuilder()
                                    .relation(Chat, "users")
                                    .of(newchan)
                                    .add(user)
            let room = chan.chat_id.toString();
            console.log("room  = ", room)
            //this.socketService.socket.emit('notifChat', 'userInChan')
            console.log(user)
            console.log(result)
        }
        return {
            isProtected,
            banned,
            pwd,
            muted,
            owner,
            admin
        }
    }

    async leaveChanel(userId: number, chanelId: number) {
        console.log("userId: ", userId);
        console.log("chanelId: ", chanelId);
        const user = await this.userRepository
                                    .createQueryBuilder('user')
                                    .leftJoinAndSelect('user.chanel', 'chanel')
                                    .where('user.user_id = :user_id', {user_id: userId})
                                    .andWhere('chanel.chat_id = :chat_id', {chat_id: chanelId})
                                    .getOne()

        console.log("user: ", user);
        if (!user)
            return `No such channel`;
        const chan = await this.findOne(chanelId);
        chan.nb_users--;
        if ((await this.rolesService.isOwner(userId, chanelId)) == true)
            chan.owner = null;
        let newChan = await this.chatRepository.save(chan);
    
        if ((await this.rolesService.isAdmin(userId, chanelId)) == true)
        {
            await this.chatRepository
            .createQueryBuilder()
            .relation(Chat, "admins")
            .of(newChan)
            .remove(user)
        }
        await this.chatRepository
            .createQueryBuilder()
            .relation(Chat, "users")
            .of(newChan)
            .remove(user)

        let room = newChan.chat_id.toString();
        console.log("room: ", room);
        //this.socketService.socket.to(room).emit('notifChat', 'userInChan')
        const result = this.getChannelInfo(chanelId)
        console.log("chan infos after user leaving: ", result)

    }

    async toKick(userId: number, toBeKicked: number, chanelId: number) {
        const checkKick = await this.rolesService.isInChanel(toBeKicked, chanelId);
        const toKick = await this.userService.findOne(toBeKicked);
        if (!checkKick)
            return {
                message: `${toKick.nickname} is not in Channel`,
                kick: false
            }
            
        const isAdmin = await this.rolesService.isAdmin(userId, chanelId);
        if (isAdmin == false)
            return{
                message: `You cannot kick ${toKick.nickname}, you are not Admin of this Chanel`,
                kick: false
            } 
        
        const isOwner = await this.rolesService.isOwner(toBeKicked, chanelId);
        if (isOwner == true)
        return{
            message: `You cannot kick ${toKick.nickname}, they are the owner of the channel`,
            kick: false
        } 
        await this.leaveChanel(toBeKicked, chanelId);
        return {
            message: `You successfully kicked ${toKick.nickname}`,
            kick: true
        }
    }

    async toBan(userId: number, toBeBanned: number, chanelId: number) {
        const checkBan = await this.rolesService.isBanned(toBeBanned, chanelId);
        const toBan = await this.userService.findOne(toBeBanned);
        if (checkBan == true)
            return {
                message: `${toBan.nickname} is already banned`,
                ban: false
            }

        const isAdmin = await this.rolesService.isAdmin(userId, chanelId);
        if (isAdmin == false)
        return {
            message: `You cannot ban ${toBan.nickname}, you are not Admin of this Chanel`,
            ban: false
        }
        
        const isOwner = await this.rolesService.isOwner(toBeBanned, chanelId);
        if (isOwner == true)
        return {
            message: `You cannot ban ${toBan.nickname}, they are the owner of the channel`,
            ban: false
        }
        await this.leaveChanel(toBeBanned, chanelId);
        const chan = await this.findOne(chanelId);
        const result = await this.chatRepository
                                    .createQueryBuilder()
                                    .relation(Chat, "banned")
                                    .of(chan)
                                    .add(toBan)

            return {
            message: `You successfully banned ${toBan.nickname}`,
            ban: false
        }
    }


    async checkChanPwd(UserId: number, chanelId: number, pwd: string) {
        const chanel = await this.findOne(chanelId);
        const user = await this.userService.findOne(UserId);
        const isInChan = await this.rolesService.isInChanel(UserId, chanelId)
        const isMatch = await bcrypt.compare(pwd, chanel.pwd)
        console.log("isMatch: ", isMatch)
        if (isMatch)
        {
            if (isInChan)
                return `you are in ${chanel.name}`;
            chanel.nb_users += 1;
            const newchan = await this.chatRepository.save(chanel);
            const result = await this.chatRepository 
                                    .createQueryBuilder()
                                    .relation(Chat, "users")
                                    .of(newchan)
                                    .add(user)
            //return `you are in ${chanel.name}`;
            return true;
        }
        else
            return false;
            //return `Incorrect Password ${chanel.name}`;
    }

    async getChanHistory(userId: number, chanelId: number) {
        const chan = await this.rolesService.getBlocked(userId)
        console.log('blocked users: ', chan);
        let blocked = [];
        for (let i = 0; chan[i] &&  chan[i].blocked_user_id != null; i++) {
            blocked[i] = chan[i].blocked_user_id;
        }
        console.log(blocked)

        if (blocked.length > 0) // if the users blocked other users
        {
            console.log("if blocked:, ", blocked.length)
            const history = await this.chatRepository
                                .createQueryBuilder('chanel')
                                .leftJoinAndSelect('chanel.messages', 'messages')
                                .leftJoinAndSelect('messages.sender', 'sender')
                                .where('chanel.chat_id = :id', {id: chanelId})
                                .andWhere('sender.user_id NOT IN (:...blocked)', {blocked})
                                .select(['messages.text', 'messages.createdAtTime', 'messages.createdAtDate','sender.user_id', 'sender.nickname'])
                                .getRawMany()
            console.log("hisotry of chan: ", history);
            return {
                history
            }
        }
        else {
            console.log("else blocked")
            const history = await this.chatRepository
                                    .createQueryBuilder('chanel')
                                    .leftJoinAndSelect('chanel.messages', 'messages')
                                    .leftJoinAndSelect('messages.sender', 'sender')
                                    //.leftJoinAndSelect('messages.createdAt', 'createdAt')
                                    .where('chanel.chat_id = :id', {id: chanelId})
                                    .select(['messages.text', 'messages.createdAtTime', 'messages.createdAtDate','sender.user_id', 'sender.nickname'])
                                    .getRawMany()
        
        console.log("hisotry of chan: ", history);
        return {
            history
        }
        }
    }

    /** MESSAGES */ 
    async newMessage(userId: number, chanelId: number, text: string) : Promise<Message> {
        const isMuted = await this.rolesService.isMuted(userId, chanelId);
        if (isMuted == true)
            return null
        const user = await this.userService.findOne(userId);
        const chanel = await this.chatRepository.findOne({
            where: {
                chat_id: chanelId
            }
        })
        const Mess = new Message();
        Mess.chanel = chanel;
        Mess.sender = user;
        Mess.text = text;
        const newMess = await this.messRepository.save(Mess);
        console.log(newMess);
        const returnMess = await this.chatRepository
                                        .createQueryBuilder('chanel')
                                        .leftJoinAndSelect('chanel.messages', 'messages')
                                        .leftJoinAndSelect('messages.sender', 'sender')
                                        //.leftJoinAndSelect('messages.createdAt', 'createdAt')
                                        .where('chanel.chat_id = :id', {id: chanelId})
                                        .andWhere('messages.mess_id = :mess_id', {mess_id: newMess.mess_id})
                                        .select(['messages.text', 'messages.createdAtTime', 'messages.createdAtDate','sender.user_id', 'sender.nickname'])
                                        .getRawOne() 
        return returnMess;
    }

    async changePwd(userId: number, ChanelId: number, pwd: string)
    {
        const chan = await this.findOne(ChanelId);
        const isOwner = await this.rolesService.isOwner(userId, ChanelId);
        if (!isOwner)
            return "You cannot change the password of the channel you are not the owner";
        if (pwd.length < 1)
        {
            chan.isProtected = false
            await this.chatRepository.save(chan);
            return `channel ${chan.name} is now public`;    
        }
        else
        {
            chan.isProtected = true;
            chan.pwd = pwd;
            await this.chatRepository.save(chan);
            return `password of channel ${chan.name} succesfuly changed`;
        }
    }
}


