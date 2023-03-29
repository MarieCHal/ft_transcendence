import { Injectable } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@Injectable()
export class SocketService {

    //public socket: Server = null;
    //@WebSocketServer() socket: Server;
    public socket: Server

}