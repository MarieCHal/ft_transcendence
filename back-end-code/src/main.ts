import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as http from 'http';
import { createServer } from 'http';
import { Server} from 'socket.io';
//import { Server}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.setGlobalPrefix('api');
  app.enableCors({                          // enable cores (other domains)
    origin: '*',
    credentials: true,
    methods: ['POST', 'PUT', 'DELETE', 'GET'] 
  });
  //wait app.listen(3000);
   //await app.listen(4000)
   await app.listen(4500);
}
bootstrap();

