import { Injectable } from '@nestjs/common';
import { appendFile } from 'fs';
import { CreateUserDto } from '../DTO/create-user.dto';

@Injectable()
export class SignInService {
    creatuserService(createUserDto: CreateUserDto) {
        return("coucou");
    }
}
