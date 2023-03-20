import { Injectable } from '@nestjs/common';
import { User } from 'src/typeorm';
import { ListInterface } from './list.interface';

@Injectable()
export class GameService {
    private usersList: ListInterface [] = []

    matchMaking(userId: number) {
        
    }

    deleteMatch(userId: number) {

    }
}
