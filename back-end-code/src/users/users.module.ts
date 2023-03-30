import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/mail/mail.module';
import { Friends, User } from 'src/typeorm';
import { UserController } from './users.controller';
import { MatchHistory } from 'src/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, Friends, MatchHistory]), MailModule],
  providers: [UsersService],
  controllers: [UserController],
  exports: [UsersService]
})
export class UsersModule {}
