import { Module, NestModule, MiddlewareConsumer,  } from '@nestjs/common';
import { AuthorizationMiddleware } from './authorization.middleware';
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
import { typeOrmConfigAsync } from './config/typeorm.config';
import { ProfileModule } from './profile/profile.module';
import { MailModule } from './mail/mail.module';
import { AppGateway } from './app/app.gateway';
import { ChatModule } from './chat/chat.module';
import { ScheduleModule } from '@nestjs/schedule'
import { GameModule } from './game/game.module';
import { JwtModule } from '@nestjs/jwt';
import { SocketModule } from './socket/socket.module';
import { RequestMethod } from '@nestjs/common';


@Module({
  imports: [
    /*ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../Front_end/dist'), 
    }),*/
    ConfigModule.forRoot({isGlobal: true}), // load and parse .env and imports it (true)
    TypeOrmModule.forRootAsync (typeOrmConfigAsync),
    ScheduleModule.forRoot(),
    MailModule,
    AuthModule,
    UsersModule,
    ProfileModule,
    HttpModule,
    ChatModule,
    GameModule,
    JwtModule,
    SocketModule
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway
    /*{
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }, */
  ],
  //exports: [AppGateway]
})
//export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware)
      .exclude('auth/(.*)')
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }}
