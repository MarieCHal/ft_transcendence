import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterService } from './services/register.service';
import { User } from 'src/typeorm';
import { RegisterController } from './controllers/register.controller';



@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [RegisterController],
  providers: [RegisterService]
})
export class RegisterModule {}
