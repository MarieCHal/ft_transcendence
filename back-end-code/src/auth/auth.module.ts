import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';
import { MailModule } from 'src/mail/mail.module';
import { ProfileModule } from 'src/profile/profile.module';
import { User } from 'src/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [UsersModule, 
            ProfileModule,
            PassportModule,
            MailModule,
            HttpModule,
            JwtModule.registerAsync(jwtConfig),
            TypeOrmModule.forFeature([User])],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
