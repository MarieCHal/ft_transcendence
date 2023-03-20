import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { config } from 'process';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { ProfileModule } from './profile/profile.module';
import { MailModule } from './mail/mail.module';
import { FriendsModule } from './friends/friends.module';
import { AppGateway } from './app/app.gateway';
import { GameService } from './game/game.service';
import { ChatModule } from './chat/chat.module';
import { GameController } from './game/game.controller';


@Module({
  imports: [
    /*ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../Front_end/dist'), 
    }),*/
    ConfigModule.forRoot({isGlobal: true}), // load and parse .env and imports it (true)
    TypeOrmModule.forRootAsync (typeOrmConfigAsync),
    MailModule,
    AuthModule,
    UsersModule,
    ProfileModule,
    HttpModule,
    FriendsModule,
    ChatModule,
  ],
  controllers: [AppController, GameController],
  providers: [AppService, AppGateway, GameService
    /*{
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }, */
  ],
})
export class AppModule {}
