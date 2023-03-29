import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Friends, Stats } from 'src/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([User, Friends, Stats])],
    providers: [GameService, UsersService],
    exports: [GameService]
})
export class GameModule {}
