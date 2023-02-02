import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { users } from 'src/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { LoginUserDto } from 'src/users/dto/users_login.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UsersService {
    constructor (
        @InjectRepository(users) private readonly usersRepository: Repository<users>, private mailService: MailService
    ) {}

    userSigninService(createUsersDto: CreateUserDto) {
        if (createUsersDto.password == createUsersDto.password2)
        {
            const newUser = this.usersRepository.create(createUsersDto);
            const checkNick = this.usersRepository.find({
                where: {
                    Nickname: newUser.Nickname
                }
            })
            if (checkNick) {
                throw new BadRequestException('Nickname already taken')
            }
            const checkMail = this.usersRepository.find({
                where: {
                    email: newUser.email
                }
            })
            if (checkMail) {
                throw new BadRequestException('Email already taken')
            }
            this.usersRepository.save(createUsersDto);
                return "Sign in successful";
        }
        throw new BadRequestException('Passwords do not correspond')
    }

    async UserLogin(loginUserDto: LoginUserDto) {

        const checkLogin = this.usersRepository.find({
            select: {
                Nickname: true,
                password: true,
            },
            where: {
                Nickname: loginUserDto.Nickname,
                password: loginUserDto.password,
            }
        })
        /*if (checkLogin) {
            const userEmail = this.usersRepository.find({
                select: {
                    email: true
                },
                where: {
                    Nickname: loginUserDto.Nickname
                }
            })
        }*/
        await this.mailService.sendUserConfirmation(loginUserDto.Nickname, 'rubin.gael@gmail.com');
        return 'you are successfuly logged in'
    }

    showAllUsers() {
        return this.usersRepository.find()
    }
}
