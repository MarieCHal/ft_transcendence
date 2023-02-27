import { Injectable } from '@nestjs/common';
import { User } from 'src/typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { config } from 'process'; 
import { AuthService } from 'src/auth/services/auth.service';

@Injectable()
export class ProfileService {

    constructor (
        @InjectRepository(User) private usersRepository: Repository<User>,
    ) {}

    // checks if the user already loggedin once, else create a profile with default 
    // pic and login as nickname
    async createProfile(data: any)
    {
            const newUser = this.usersRepository.create({login: data.login, nickname: 'newUser', avatar: data.image.link})
            await this.usersRepository.save(newUser);
            return newUser;
    }
    
    // upload the avatar profile picture
    /*async uploadAvatar(avatar: Buffer, nickname: string)
    {
        const user = await this.usersRepository.findOne({
            where: { 
                nickname: nickname
            }
        })
        const newAvatar = this.avatarRepository.create({picture: avatar})
        user.avatar = newAvatar;
        return newAvatar;
    }*/

    /*async changeNickname(nickname: string, userId: number) 
    {
        const user = await this.usersRepository.find({
            where: { 
                nickname: nickname
            }
        })
        if (!user)
        {
            await this.usersRepository
                .createQueryBuilder()
                .update(User)
                .set({nickname: nickname})
                .where("User.id = :id", {id: userId})
                .execute()
            return "Your nickname is changed"
        }
        return "Nickname already taken";
    }*/
}
