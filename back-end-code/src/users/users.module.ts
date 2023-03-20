import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/mail/mail.module';
import { Friends, User } from 'src/typeorm';
import { UserController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Friends]), MailModule],
  providers: [UsersService],
  controllers: [UserController],
  exports: [UsersService]
})
export class UsersModule {}
