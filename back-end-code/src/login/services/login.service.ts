import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { users } from 'src/typeorm';
import { Repository } from 'typeorm';
import { LoginUserDto } from '../dto/login.dto';
import { CheckCodeDto } from '../dto/CheckCode.dto';
import { MailService } from 'src/mail/mail.service';
import { LoginInterface } from '../interfaces/login.interface';


@Injectable()
export class LoginService {
    constructor (
        @InjectRepository(users) private readonly usersRepository: Repository<users>, 
        private mailService: MailService,
    ) {}
    private loginInterface: LoginInterface[] = [];
    async UserLogin(loginUserDto: LoginUserDto) {

        const checkLogin = await this.usersRepository.find({
            select: {
                Nickname: true,
                Password: true,
            },
            where: {
                Nickname: loginUserDto.Nickname,
                Password: loginUserDto.Password,
            }
        })
        return checkLogin
        if (checkLogin.length > 0)
        {
            const userEmail = await this.usersRepository.find({
                select: {
                    Email: true
                },
                where: {
                    Nickname: loginUserDto.Nickname
                }
            })
            console.log(checkLogin)
            const rdmNumber = Math.floor(4000 + (Math.random() * 5000))
            console.log(rdmNumber)
            this.loginInterface.push({
                Nickname: loginUserDto.Nickname,
                Code: rdmNumber,
            });
            //await this.mailService.sendUserConfirmation(loginUserDto.Nickname, userEmail[0].Email, rdmNumber);
            return 
        }
        throw new BadRequestException ('invalid username or pwd')
    }

    async CheckCode(checkCodeDto: CheckCodeDto) {
        console.log(this.loginInterface)
        for (let i=0; i < this.loginInterface.length; i++)
        {
            const tmp = this.loginInterface[i];
            console.log(tmp.Code, tmp.Nickname);
            if (tmp.Nickname == checkCodeDto.Nickname && tmp.Code == checkCodeDto.Code)
            {
                this.loginInterface.splice(i, 1)
                return 'You are successfuly logged in!!!'
            }
        }
        return 'Incorect Code, please retry'
    }
}
