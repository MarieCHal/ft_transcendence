import { Injectable } from '@nestjs/common';
import { User } from 'src/typeorm';
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
            await this.usersRepository.save(user);
            console.log(user.nickname);
            return user;
    }
    

    async modifyNickname(nickname: string, userId: number) 
    {
        const user = await this.usersRepository.findOne({
            where: { 
                nickname: nickname
            }
        })
        if (!user)
        {
            const updateUser = await this.usersRepository.findOneBy({
                user_id: userId
            })
            updateUser.nickname = nickname;
            await this.usersRepository.save(updateUser);
            return "Your nickname is changed"
        }
        return {
            status:  418,
            message: "Nickname already taken" };
    }

    async modifyAvatar(avatar: string, userId: number)
    {
        const updateUser = await this.usersRepository.findOne({
            where: {
                user_id: userId
            }
        })
        console.log(updateUser.avatar)
        updateUser.avatar = avatar;
        const newPic = await this.usersRepository.save(updateUser);
        console.log(newPic);
        return "Your avatar is changed"
    }
}
