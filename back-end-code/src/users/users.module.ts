import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { users } from 'src/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([users]),],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
