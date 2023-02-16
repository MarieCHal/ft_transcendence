import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignInController } from './sign_in/Controller/sign_in.controller';
import { SignInService } from './sign_in/Services/sign_in.service';
import { SignInModule } from './sign_in/sign_in.module';

@Module({
  imports: [SignInModule],
  controllers: [AppController, SignInController],
  providers: [AppService, SignInService],
})
export class AppModule {}
