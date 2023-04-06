import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { CodeInterface } from '../interfaces/code.interface';
import { LoginUserDto } from '../dto/login.dto';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
import { Users } from 'src/typeorm';
import { ProfileService } from 'src/profile/profile.service';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { StateInterface } from '../interfaces/state.interface';


@Injectable()
export class AuthService {
    constructor(
        //private usersService: UsersService, 
        @InjectRepository(Users) private readonly userRepository: Repository<Users>,
        private profileService: ProfileService,
        private jwtService: JwtService, 
        private mailService: MailService,
        private readonly httpService: HttpService
        ) {}
        
    private verifCode: CodeInterface [] = []

    /** @description ask the api for infos about the user using its token
     * check if the returned login exists in our database
     * -> if it doesn't it will create a new user using the infos returned by the api
     * -> it will then link the user (new or old) to the state
     */
    async registerUser(apiToken: any) {
        try {
            const {data} = await firstValueFrom(this.httpService.get(`https://api.intra.42.fr/v2/me`,
            {
              headers: { Authorization: `Bearer ${apiToken}`},
            },
          ))
          //console.log(data.nickname)
          console.log(data.email)
          const user = await this.userRepository.findOne({ // cherche le user dans la base de donnee
            where: {
                email: data.email,
                }
            })
            console.log("user: ", user);
            if (!user) // if the user never went on the website
            {
                const newUser = await this.profileService.createProfile(data);
                console.log("this is the new user:", newUser);
                return this.generateAccessToken(newUser)
            } 
            else
            {
                console.log("this is the user:", user);
                if (user.doubleAuth == true) {
                    this.sendMail(user);
                    return {
                        doubleAuth: true,
                        nickname: user.nickname
                    }
                }
                else
                    return this.generateAccessToken(user)
            }
        } 
        catch (error) {
        console.log("error in api request in register user", error);
        throw new BadRequestException(error.response?.statusText);
        }
    }
    
    /** @description */
    /** returns a Token, the user and the doubleAuth */
    async generateAccessToken(user: any) {
        const payload = {username: user.mail, sub: user.user_id};
        let access_token = this.jwtService.sign(payload)
        console.log("access_token: ", access_token);
        return {
            doubleAuth: false,
            accessToken: access_token,
            user
        };
    }
    
    async checkDoubleAuthCode(nickname: string, code: number): Promise<any> {

        const user = await this.userRepository.findOne({
            where: {
                nickname: nickname,
            }
        })
        console.log("nickname: ", nickname)
        console.log("pwd: ", code)
        for (let i = 0; i < this.verifCode.length; i++)
        {
            const tmp = this.verifCode[i];
            console.log("tmp: ", tmp);
            if (tmp.nickname == nickname && tmp.Code == code)
            {
                this.verifCode.splice(i, 1)
                const user = await this.userRepository.findOne({
                    where: {
                        nickname: nickname
                    }
                });
                return this.generateAccessToken(user);
            }
        }
        throw new BadRequestException("Invalid Code")
    }

    async sendMail(user: Users) {

        for (let i = 0; i < this.verifCode.length; i++)
        {
            const tmp = this.verifCode[i];
            if (this.verifCode[i].nickname == user.nickname)
            this.verifCode.splice(i, 1)
        }
        const rdmNumber = Math.floor(4000 + (Math.random() * 5000))
        console.log(rdmNumber)
        this.verifCode.push({
            nickname: user.nickname,
            Code: rdmNumber,
        });
        await this.mailService.sendUserConfirmation(user.nickname, user.email, rdmNumber);
    }
}
