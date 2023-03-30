import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Friends, Stats, MatchHistory } from 'src/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([User, Friends, Stats, MatchHistory])],
    providers: [GameService, UsersService],
    exports: [GameService]
})
export class GameModule {}
