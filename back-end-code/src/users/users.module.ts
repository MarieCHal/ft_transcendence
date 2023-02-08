import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/mail/mail.module';
import { users } from 'src/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([users]), MailModule],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
