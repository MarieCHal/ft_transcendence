import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Friends, User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UsersService {
    constructor (
        @InjectRepository(User) private usersRepository: Repository<User>,
        //@InjectRepository(Avatar) private avatarRepository: Repository<Avatar>
    ) {}

    
    // checks if the user already loggedin once, else create a profile with default 
    // pic and login as nickname
    async createProfile(login: string)
    {
    }
    
    // upload the avatar profile picture
    async upLoadProfilePic()
    {

    }

}
