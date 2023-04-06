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
import { Stats, Users } from 'src/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { HttpModule } from '@nestjs/axios';
import { ProfileService } from 'src/profile/profile.service';

// to remove (profile service)
@Module({
  imports: [UsersModule, 
            ProfileModule,
            PassportModule,
            MailModule,
            HttpModule,
            JwtModule.registerAsync(jwtConfig),
            TypeOrmModule.forFeature([Users, Stats])],
  providers: [AuthService, LocalStrategy, JwtStrategy, ProfileService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
