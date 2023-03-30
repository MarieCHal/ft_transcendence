
import {
  WebSocketGateway,
WebSocketServer,
SubscribeMessage,
OnGatewayConnection,
OnGatewayDisconnect,
OnGatewayInit,
} from '@nestjs/websockets'
import { Socket, Server} from 'socket.io';
import { ChatService } from 'src/chat/chat.service';
import { GameService } from 'src/game/game.service';
import { UsersService } from 'src/users/users.service';
import { Interval } from '@nestjs/schedule'
import { User } from 'src/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SocketService } from 'src/socket/socket.service';
import { ConfigService } from '@nestjs/config';

@WebSocketGateway({
  cors: {
      origin: '*',
  },
}) // allow us to make use of the socket.io functionality

//OnGatewayInit,

export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private usersService: UsersService,
              private chatService: ChatService, 
              private gameService: GameService,
              private jwtService: JwtService,
              private socketService: SocketService,
              private configService: ConfigService) {}
  @WebSocketServer() server: Server;

  /*afterInit(server: Server) {
    console.log('init: server')
    this.socketService.socket = server;
  }*/

  rooms: string[] = [];                     // number of rooms for the game that are active (emit on the every x time to update positions)
  usersSockets: {[Key: string]: User;} = {}   // dictionary with key being the user's socket and the data the user itself
  invite: {                                 // an array of invite accepted containing the room name and IDs, used to attribute a room to the players in startgame
    user1: number,
    user2: number,
    room: string
  } []

  async handleConnection(client: Socket, ...args: any[]) {
      
    let token = client.handshake.auth.token;
      if (!token)
        client.disconnect()
      let userToken = this.jwtService.verify(
        token, {
          secret: this.configService.get('APP_SECRET')
        }
      );
      let user = await this.usersService.findOne(userToken.sub)
      if (!user) // if no user in database with user_id (extracted from token) diaconnect socket
        client.disconnect()
      else {
        console.log("user: ", user)
        //if (!this.usersSockets) { // init usersSockets
          //this.usersSockets = {} 
        //}
        this.usersSockets[client.id] = user; // add a new socket/user to userSockets
  
        if (!this.invite) // init invite
          this.invite = [];
  
        await this.usersService.isActive(user, 1);
  
        console.log(`client connected: ${client.id}`)
      }
    }
  
    async handleDisconnect(client: Socket) {

      const user = this.usersSockets[client.id];
      console.log(`client disconnected: ${client.id}`)
     
      await this.usersService.isActive(user, 0); // the user is not any more active
      delete this.usersSockets[client.id]; // delete the socket from the lists of active users
      
    }
  
    @SubscribeMessage('join') // used to listening to incoming messages.
    async joinChat(client: Socket, payload: string) { // client (reference to a socket), message( data from client)

      const user = this.usersSockets[client.id];
      let chan_id = payload;
      console.log("chanelId: ", chan_id)

      client.join(payload);

      let message = user.nickname + " just joined the channel: ";

      this.server.to(payload).emit('join', message)
    }

    @SubscribeMessage('chat')
    async sendMess(client: Socket, payload: string) {

      const user = this.usersSockets[client.id];
      console.log("this is the message: ", payload, "from id: ", client.handshake.auth.myId);
      console.log(payload[0])
      console.log(payload[1])
      console.log("rooms: ", this.server.sockets.adapter.rooms)
      let channelId = +payload[1];
      const newMess = await this.chatService.newMessage(user, channelId, payload[0])
      if ( newMess != null)
        this.server.to(payload[1]).emit('chat', newMess)
    }


    @Interval(1000/50)
    async handleInterval() {
        if (this.rooms.length > 0)
        {
          for(let i = 0; this.rooms[i]; i++)
          {
            let room = await this.gameService.findGame(this.rooms[i]);
            if (!room)
              return ;
            else 
            {
              if (room.score1 >= 5 || room.score2 >= 5)
              {
                const game = this.gameService.findGame(room.room)
                this.gameService.stopGame(room.room);
                const winner = await this.gameService.gameStats(game);
                this.server.to(this.rooms[i]).emit('startgame', -1, winner, true, 'game finished');
                this.rooms.splice(i, 1)
                this.server.in(room.room).socketsLeave(room.room)
              }
              else
                this.server.to(this.rooms[i]).emit('game', room.ballX, room.ballY, room.posY1, room.posY2, room.score1, room.score2)
            }
          }
        }
    }
    

    // connet to a room 
    @SubscribeMessage('startgame')
    async startGame(client: Socket, payload: any) { 
      const user = this.usersSockets[client.id];
      let room: string

      if (payload[0] === false) // if it is a game from an invite 
      {
        console.log("false")
        const other = await this.usersService.findNickname(payload[1])
        for (let i = 0; this.invite[i]; i++) // find the corresponding room in the list of invites
        {
          if ((this.invite[i].user1 == user.user_id || this.invite[i].user2 == user.user_id) // user1 or user2 correspond to user
                && (this.invite[i].user1 == other.user_id || this.invite[i].user2 == other.user_id)) // user1 or user2 correspond to the user passed in payload
          {
            room = this.invite[i].room
            break;
          }
        }
      }

      else if (payload[0] === true) // if it from matchmaking
      {
        console.log("true")
        await this.gameService.addToList(user.user_id); // add to list matchmaking
        room = await this.gameService.matchMaking(user.user_id); // gives a room
      }
      console.log("this is the room: ", room, "of: ", user.user_id);

      client.join(room); // add the player to the room
      var numberUser = await this.server.in(room).fetchSockets() // depending on the number of clients in room the game starts or not
      if (numberUser.length == 1) // if only one is present then his id as player is sent
      {
        this.server.to(client.id).emit('startgame', 1, false, false);
        await this.usersService.isActive(user, 3);
      }
      else if (numberUser.length == 2)
      {
        this.server.to(client.id).emit('startgame', 2, false, false); // send player id to the seccond player
        if (payload[0] == false)
        {
          for (let i = 0; this.invite[i]; i++)
          {
            if (this.invite[i].room == room)
            {
              this.gameService.newGame(room, this.invite[i].user1, this.invite[i].user2) // if it is from invite add the game to the game list
              this.invite.slice(i, 1);
            }
          }
        }
        await this.usersService.isActive(user, 3);
        this.server.to(room).emit('startgame', room, true, false); // emit to start the game
        this.rooms.push(room);
      }
    }

    /** @summary initialize the postion of the ball and the player's pads */
    @SubscribeMessage('init') 
    initPlay(client: Socket) {
      this.server.to(client.id).emit('init', 300, 200, 150, 150) // emit: ballX, ballY, y palyer1, y player2
    }

    /** @summary recieves infos about the position of the paddle of each player and updates the values in the game object */
    @SubscribeMessage('player')
    async palyerPos(client: Socket, payload: string) {
      const user = this.usersSockets[client.id];
      let pos = +payload[1];
      this.gameService.updatePlayerPos(payload[0], user.user_id, pos)
    }

    /** @summary */
    /** used by the server to emit the positions of each element in the game needed by the clients to render
     * communicates the end of the game as well
     * used by the client to communicate to the server if it wants to quit the game
     */
    @SubscribeMessage('game')
    async gameInfo(client: Socket, payload: any) {
      const user = this.usersSockets[client.id];

      if (payload[1] == 'quit') // when quitting payload[0] = the room and payload[1] = key word 'quit'
      {
        const nb_user = await this.server.in(payload[0]).fetchSockets() // checks nb of connection on the given room
        if (nb_user.length == 1) // meaning the match did not start yet 
        {
          this.gameService.deleteMatch(user.user_id);
          this.server.to(client.id).emit('startgame', -1, false, true, 'You left the game');
        }
        else if (nb_user.length == 2) { // the game already started
          const message = user.nickname + 'left the game'; 
          const game = await this.gameService.findGame(payload[0]);
          let winner: number;
          if (user.user_id == game.player1)
            winner = game.player2;
          else
            winner = game.player1;
          this.gameService.stopGame(payload[0])
          this.server.to(client.id).emit('startgame', -1, winner, true, 'You left the game'); // mess to the one that quit
          client.broadcast.to(payload[0]).emit('startgame', -1, winner, true, message); // message to the other user
          for (let i = 0; this.rooms[i]; i++)
          {
            if (this.rooms[i] == payload[0])
              this.rooms.splice(i, 1);
          }
        }
        this.server.in(payload[0]).socketsLeave(payload[0]);
      }
    }

    /** @summary event used to send notifications about an invitation to play */
    @SubscribeMessage('notif') 
    async invitePlay(client: Socket, payload: any) {
      const user = this.usersSockets[client.id];
      let mess: string
      mess = user.nickname;
      if (payload[1] == true) // if payload 1 is true it is an invite to play to user_id payload[0]
      {
        for (const key of Object.keys(this.usersSockets)) {
          if (this.usersSockets[key].user_id == payload[0])
          {
            if (this.usersSockets[key].isActive == 3)
              this.server.to(client.id).emit('notif', mess, true, false)
            else
              this.server.to(key).emit('notif', mess, true, false)
          }
        }
      }
      else if (payload[1] == false) // else it is the response to an invite
      {
        for (const key of Object.keys(this.usersSockets)) {
          if (this.usersSockets[key].nickname == payload[0])
          {
            this.server.to(key).emit('notif', mess, false, payload[2])
          }
        }
        if (payload[2] == true) // if the response is positive
        {
          const other = await this.usersService.findNickname(payload[0])
          let name = 'invite-' + user.user_id + '-' + other.user_id; // create the room name and add it to the list of invite
          this.invite.push({
            user1: user.user_id,
            user2: other.user_id,
            room: name
          })
        }
      }
    }
}
