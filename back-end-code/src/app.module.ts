import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailModule } from './mail/mail.module';
import { config } from 'process';
import { RegisterController } from './register/controllers/register.controller';
import { RegisterModule } from './register/register.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { typeOrmConfigAsync } from './config/typeorm.config';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../Front_end/dist'), 
    }),
    ConfigModule.forRoot({isGlobal: true}), // load and parse .env and imports it (true)
    TypeOrmModule.forRootAsync (typeOrmConfigAsync),
    MailModule,
    RegisterModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, 
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }, 
  ],
})
export class AppModule {}
