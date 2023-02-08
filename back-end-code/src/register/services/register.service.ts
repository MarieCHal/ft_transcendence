import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { users } from 'src/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class RegisterService {

    constructor (
        @InjectRepository(users) private readonly usersRepository: Repository<users>) {}

    async RegisterServ(registerDto: RegisterDto) {
        const checkNick = await this.usersRepository.find({
            where: {
                Nickname: registerDto.Nickname
            }
        })
        if (checkNick.length > 0) {
            console.log(checkNick)
            throw new BadRequestException('Nickname already taken');
        }
        const checkMail = await this.usersRepository.find({
            where: {
                Email: registerDto.Email
            }
        })
        if (checkMail.length > 0) {
            console.log(checkMail)
            throw new BadRequestException('Email already taken');
        }
        else
        {
            const newUser = this.usersRepository.create(registerDto);
            this.usersRepository.save(registerDto);
            return "Sign in successful";
        }
    }
}

