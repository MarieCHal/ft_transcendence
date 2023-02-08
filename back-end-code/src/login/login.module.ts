import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/mail/mail.module';
import { users } from 'src/typeorm';
import { LoginController } from './controllers/login.controller';
import { LoginService } from './services/login.service';

@Module({
  imports: [TypeOrmModule.forFeature([users]), MailModule],
  controllers: [LoginController],
  providers: [LoginService]
})
export class LoginModule {}
