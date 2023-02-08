import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { users } from 'src/typeorm';
import { Repository } from 'typeorm';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UsersService {
    constructor (
        @InjectRepository(users) private usersRepository: Repository<users>,
        //private avatarService: AvatarService,
        private mailService: MailService,
    ) {}

    async findOne(Nickname: string) {
        const User = await this.usersRepository.find({
            where: {
                Nickname: Nickname,
            }
        })
        return User[0]; //check login is an array of users
    }

    /*async addAvatar(userId: number, imageBuffer: Buffer, filename: string) {
        const avatar = await this.avatarService.uploadAvatar(imageBuffer, filename);
        await this.usersRepository.update(userId,  {
            avatarId: avatar.id
        })
        return avatar
    }*/
}
