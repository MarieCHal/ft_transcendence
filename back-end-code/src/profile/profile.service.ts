import { Injectable } from '@nestjs/common';
import { Stats, User } from 'src/typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { config } from 'process'; 
import { AuthService } from 'src/auth/services/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class ProfileService {

    constructor (
        @InjectRepository(User) private usersRepository: Repository<User>,
    ) {}

    // checks if the user already loggedin once, else create a profile with default 
    // pic and login as nickname
    async createProfile(data: any)
    {
            const newUser = await this.usersRepository.create({login: data.login, avatar: 'super.png'});
            await this.usersRepository.save(newUser);
            const user = await this.usersRepository.findOne ({
                where: {
                    login : data.login
                }
            })
            user.nickname = 'user' + user.user_id;
            user.stats = new Stats()
            const userSave = await this.usersRepository.save(user);

            /*const stat = new Stats()
            stat.user = userSave*/
            console.log(user.nickname);
            return user;
    }
    

    async modifyNickname(nickname: string, user: User) 
    {
        const other = await this.usersRepository.findOne({
            where: { 
                nickname: nickname
            }
        })
        if (!other)
        {
            user.nickname = nickname;
            await this.usersRepository.save(user);
            return "Your nickname is changed"
        }
        return {
            status:  418,
            message: "Nickname already taken" };
    }

    async modifyAvatar(avatar: string, user: User)
    {
        user.avatar = avatar;
        await this.usersRepository.save(user);
        return "Your avatar is changed"
    }
}
