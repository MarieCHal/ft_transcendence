import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { Users, Stats } from 'src/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { AuthService } from 'src/auth/services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Stats])],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService]
})
export class ProfileModule {}
