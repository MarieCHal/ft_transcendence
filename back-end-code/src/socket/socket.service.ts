import { Injectable, Scope } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Users } from 'src/typeorm';

@Injectable({ scope: Scope.DEFAULT})
export class SocketService {

    //public socket: Server = null;
    //@WebSocketServer() socket: Server;
    private static socket: Server; // maybe not static
    private static usersSockets: {[Key: string]: Users;} = {}

    getServer()
    {
        return SocketService.socket;
    }

    setServer(server: Server) 
    {
        SocketService.socket = server;
    }

    getUser(key : string) : Users {
        return SocketService.usersSockets[key];
    }

    getSocket(user: Users) : string {
        for (const key of Object.keys(SocketService.usersSockets)) 
        {
            if (this.getUser(key).user_id == user.user_id)
                return key;
        }
        return null
    }

    setSocket(key: string, user: Users) {
        SocketService.usersSockets[key] = user;
    }

    removeSocket(key: string) {
        delete SocketService.usersSockets[key];
    }

    returnAll() {
        return SocketService.usersSockets;
    }
}