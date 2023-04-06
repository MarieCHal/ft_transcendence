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
  /*const server = createServer();       // create standard http server

  const io = new Server(server);                    // test1
  app.useWebSocketAdapter(new IoAdapter(io));       // test1*/

  /*const httpServer = createServer();
  const io = new Server(httpServer);
  app.useWebSocketAdapter(new IoAdapter(io));*/


  app.enableCors({                          // enable cores (other domains)
    origin: '*',
    credentials: true,
    methods: ['POST', 'PUT', 'DELETE', 'GET'] 
  });
  //app.useWebSocketAdapter(new IoAdapter(server)); // convert the http server to socket.io server        // test2
  //await app.listen(3000);
  await app.listen(4000)
  //const io = new Server(server);
  //await app.listen(3500);
  //module.exports = io;
}
bootstrap();
