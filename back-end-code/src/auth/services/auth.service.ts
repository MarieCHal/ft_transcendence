import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CodeInterface } from '../code.interface';
import { LoginUserDto } from '../dto/login.dto';
import { MailService } from 'src/mail/mail.service';


@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, 
        private jwtService: JwtService, 
        private mailService: MailService
        ) {}
        
    private verifCode: CodeInterface [] = []

    async validateUser(loginUserDto: LoginUserDto) {
        console.log('coucou')
        const user = await this.usersService.findOne(loginUserDto.Nickname);
        console.log(user)
        if (user && user.Password === loginUserDto.Password)
        {
            for (let i = 0; i < this.verifCode.length; i++)
            {
                const tmp = this.verifCode[i];
                if (this.verifCode[i].Nickname == loginUserDto.Nickname)
                    this.verifCode.splice(i, 1)
            }
            const rdmNumber = Math.floor(4000 + (Math.random() * 5000))
            console.log(rdmNumber)
            this.verifCode.push({
                Nickname: loginUserDto.Nickname,
                Code: rdmNumber,
            });
            await this.mailService.sendUserConfirmation(loginUserDto.Nickname, user.Email, rdmNumber);
            return rdmNumber;
        }
        return 'Invalid username or password';
    }

    async generateAccessToken(user: any) {
        const payload = {username: user.Nickname, sub: user.id};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async checkDoubleAuth(Nickname: string, Code: number): Promise<any> {
        for (let i = 0; i < this.verifCode.length; i++)
        {
            const tmp = this.verifCode[i];
            if (tmp.Nickname == Nickname && tmp.Code == Code)
            {
                this.verifCode.splice(i, 1)
                const user = await this.usersService.findOne(Nickname);
                const { Password, ...result } = user;
                return result;
            }
        }
        return null
    }
}
