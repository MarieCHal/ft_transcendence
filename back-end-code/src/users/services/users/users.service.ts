import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { users } from 'src/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/users/dto/users_signin.dto';
import { LoginUserDto } from 'src/users/dto/users_login.dto';

@Injectable()
export class UsersService {
    constructor (
        @InjectRepository(users) private readonly usersRepository: Repository<users>,
    ) {}

    UserSignin(createUsersDto: CreateUserDto) {
        if (createUsersDto.password == createUsersDto.password2)
        {
            this.usersRepository.create(createUsersDto);
            this.usersRepository.save(createUsersDto);
                return ;
        }
        return 'Incorect Password';
    }

    UserLogin(loginUserDto: LoginUserDto) {
        return this.usersRepository.find({
            select: {
                Nickname: true,
                password: true,
            },
            where: {
                Nickname: loginUserDto.Nickname,
                password: loginUserDto.password,
            }
        })
    }

    showAllUsers() {
        return this.usersRepository.find()
    }
}
