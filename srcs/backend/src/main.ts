import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.setGlobalPrefix('api');
  app.enableCors({                          // enable cores (other domains)
    origin: '*',
    credentials: true,
    methods: ['POST', 'PUT', 'DELETE', 'GET'] 
  });
  await app.listen(3000)
}
bootstrap();
