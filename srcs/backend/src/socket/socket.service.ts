import { Injectable, Scope } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { off } from 'process';
import { Server, Socket } from 'socket.io';
import { Users } from 'src/typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable({ scope: Scope.DEFAULT})
export class SocketService {

    //public socket: Server = null;
    //@WebSocketServer() socket: Server;
    constructor(
        private usersService: UsersService
    ) {}
    private static socket: Server; // maybe not static
    //private static usersSockets: {[Key: string]: Users;} = {} 
    
    private static usersSocketsID: {[Key: string]: number;} = {}            // key contains the socket'id and the user_id as value
    private static usersSockets: {[Key: number]: Socket;} = {}              // key is the user_id and the corresponding socket


    getServer() // return the server instance
    {
        return SocketService.socket;
    }

    setServer(server: Server) // set the server instance (appGateway)
    {
        SocketService.socket = server;
    }

    setUser(client: Socket, user_id: number) {              // stores the user's id, socket and socketid
        SocketService.usersSocketsID[client.id] = user_id;  // the socket id (key) and the user id (value)
        SocketService.usersSockets[user_id] = client;       // the user id (key) and the Socket (value)
    }

    async getUser(key : string) : Promise<Users> {     // return the user corresonding to the socket.id
        
        const id = SocketService.usersSocketsID[key];
        //console.log("id in getUser: ", id);
        const user = await this.usersService.findOne(id);
        return user;
    }


    getSocketID(userId: number) : string {       // return the socket id
        if (SocketService.usersSockets[userId])
        {
            let socketID = SocketService.usersSockets[userId].id;
            console.log("socket id: ", socketID)
            return socketID;
        }
        return null;
    }

    getSocket(userId: number) : Socket{
        return SocketService.usersSockets[userId];
    }

    /*setSocket(key: string, user: Users) {
        SocketService.usersSockets[key] = user;
    }*/

    /*removeSocket(key: string) {
        delete SocketService.usersSockets[key];
    }*/
    removeUser(key: string) : void {
        const id = SocketService.usersSocketsID[key];
        delete SocketService.usersSocketsID[key];
        delete SocketService.usersSockets[id];
    }

    /*async returnUserNotif(nickname: string, id: number ) : Promise<Users> {
        //console.log("id: ", id, "nckname: ", nickname);
        let user: Users;
        if (nickname != null)
            user = await this.usersService.findNickname(nickname);
        else if (id != -1)
            user = await this.usersService.findOne(id);
        for (const key of Object.keys(SocketService.usersSocketsID))
        {
            if (SocketService.usersSocketsID[key] = user.user_id)
                return user;
        }
        return null;
    }*/
}