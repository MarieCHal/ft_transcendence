
import {
  WebSocketGateway,
WebSocketServer,
SubscribeMessage,
OnGatewayConnection,
OnGatewayDisconnect,
} from '@nestjs/websockets'
import { Socket, Server} from 'socket.io';
import { ChatService } from 'src/chat/chat.service';
import { UsersService } from 'src/users/users.service';

@WebSocketGateway({
  cors: {
      origin: '*',
  },
}) // allow us to make use of the socket.io functionality


export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private usersService: UsersService,
              private chatService: ChatService) {}
  @WebSocketServer() server: Server;
  users: number = 0; 

  async handleConnection(client: Socket, ...args: any[]) {
      // A client has connected
      console.log(args);
      console.log(client.data)

      this.users++;

      console.log("auth: ", client.handshake.auth)
      let client_id = +client.handshake.auth.myId;
      await this.usersService.isActive(client_id, true);

      // Notify connected clients of current users
      console.log(`client connected: ${client.id}`)
      this.server.emit('users', this.users);
    }
  
    async handleDisconnect(client: Socket) {
      // A client has disconnected
      this.users--;
  
      // Notify connected clients of current users
      console.log(`client disconnected: ${client.id}`)
      console.log("auth: ", client.handshake.auth)
      let client_id = +client.handshake.auth.myId;
      await this.usersService.isActive(client_id, false);
      this.server.emit('users', this.users);
    }
  
    @SubscribeMessage('join') // used to listening to incoming messages.
    async joinChat(client: Socket, payload: string) { // client (reference to a socket), message( data from client)

      console.log("========");
      console.log("client id: ", client.id);
      //console.log("client handshake: ", client.handshake)
      console.log("socket rooms: ", client.rooms)
      console.log("user: ", client.handshake.auth.myId, "this is the chat id: ", payload);

      let client_id = +client.handshake.auth.myId;
      let chan_id = payload;
      console.log("clientId: ", client_id);
      console.log("chanelId: ", chan_id)

      client.join(payload);
      const user = await this.usersService.findOne(client_id);
      //const chat = await this.chatService.findOne(chan_id);

      let message = user.nickname + " just joined the channel: ";

      this.server.to(payload).emit('join', message)
      //this.server.emit('join', payload); // any client listening on event 'chat' will recieve the message
    }

    @SubscribeMessage('chat')
    async sendMess(client: Socket, payload: string) {
      console.log("this is the message: ", payload, "from id: ", client.handshake.auth.myId);
      console.log(payload[0])
      console.log(payload[1])
      console.log(client.id)
      console.log("rooms: ", this.server.sockets.adapter.rooms)
      let roomUsers = await this.server.in(payload[1]).fetchSockets()
      console.log(roomUsers)
      
      // retrieving user id and chat id and creating a new message
      let channelId = +payload[1];
      let UserId = +client.handshake.auth.myId
      await this.chatService.newMessage(UserId, channelId, payload[0])

      // sending to all user on chatRoom
      this.server.to(payload[1]).emit('chat', payload[0])
      //this.server.emit('chat', payload);
    }

    // connect to a room
    @SubscribeMessage('startgame')
    async startGame(client: Socket, payload: string ) { // , payload: number (userId)
      
      let client_id = +client.handshake.auth.myId;
      console.log('start game');
      console.log("clientId: ", client_id);
      client.join('coucou')
      var test = await this.server.in('coucou').fetchSockets()
      
      console.log('test = ', test.length)
      //console.log("rooms: ", this.server.sockets.adapter.rooms['coucou'])
      if (test.length == 1)
        this.server.to(client.id).emit('startgame', 1, false);
      if (test.length == 2)
      {
        this.server.to(client.id).emit('startgame', 2, false);
        this.server.to('coucou').emit('startgame', 3, true)
        //client.broadcast.to('coucou').emit('startgame', 'You are going to start a game with Marie')
      }
    }

    @SubscribeMessage('play')
    async playGame(client: Socket, payload: number) {
      console.log("playgame userId: ", client.handshake.auth.myId)
      console.log("otherpos: ", payload)
      console.log('play');
      console.log("rooms: ", this.server.sockets.adapter.rooms['coucou'])
      //this.server.to('coucou').emit('play', payload)
      //this.server.to('coucou').emit('join', message)
      client.broadcast.to('coucou').emit('play', payload)
    }

    @SubscribeMessage('ball')
    async ballPosition(client: Socket, payload: any)
    {
      console.log("ball position userId: ", client.handshake.auth.myId)
      console.log("ball x: ", payload[0], "ball y: ", payload[1])
      console.log('score 1: ', payload[2])
      console.log('score 2: ', payload[3])
      if (payload[0] == 'stop')
      {
        this.server.in('coucou').socketsLeave('coucou');
        console.log("The Game is done");
      }
      client.broadcast.to('coucou').emit('ball', payload[0], payload[1], payload[2], payload[3])
    }
}
