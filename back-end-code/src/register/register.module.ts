import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterService } from './services/register.service';
import { users } from 'src/typeorm';
import { RegisterController } from './controllers/register.controller';


@Module({
  imports: [TypeOrmModule.forFeature([users])],
  controllers: [RegisterController],
  providers: [RegisterService]
})
export class RegisterModule {}
