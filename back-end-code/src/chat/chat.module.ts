import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { Friends, MatchHistory, Message, Mute } from 'src/typeorm';
import { Chat } from 'src/typeorm';
import { User } from 'src/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { RolesService } from './roles.service';
import { AppGateway } from 'src/app/app.gateway';
import { SocketService } from 'src/socket/socket.service';




@Module({
  imports: [TypeOrmModule.forFeature([User, Chat, Friends, Message, Mute, MatchHistory])],
  providers: [ChatService,  UsersService, RolesService, SocketService],
  controllers: [ChatController],
  exports: [ChatService]
})
export class ChatModule {}
