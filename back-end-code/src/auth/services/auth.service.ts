import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { CodeInterface } from '../interfaces/code.interface';
import { LoginUserDto } from '../dto/login.dto';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm';
import { ProfileService } from 'src/profile/profile.service';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { StateInterface } from '../interfaces/state.interface';


@Injectable()
export class AuthService {
    constructor(
        //private usersService: UsersService, 
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private profileService: ProfileService,
        private jwtService: JwtService, 
        private mailService: MailService,
        private readonly httpService: HttpService
        ) {}
        
    private verifCode: CodeInterface [] = []
    private stateInterface: StateInterface [] = []

    /** @description ask the api for infos about the user using its token
     * check if the returned login exists in our database
     * -> if it doesn't it will create a new user using the infos returned by the api
     * -> it will then link the user (new or old) to the state
     */
    async registerUser(apiToken: any, state: string) {
        try {
            const {data} = await firstValueFrom(this.httpService.get(`https://api.intra.42.fr/v2/me`,
            {
              headers: { Authorization: `Bearer ${apiToken}`},
            },
          ))
          console.log(data.login)
          console.log(data.email)
          const user = await this.userRepository.findOne({ // cherche le user dans la base de donnee
            where: {
                login: data.login,
                }
            })
            if (!user) // if the user never went on the website
            {
                const newUser = await this.profileService.createProfile(data);
                this.stateInterface.push({
                    state: state,
                    userId: newUser.id
                })
                console.log("this is the new user:", user);
                return this.generateAccessToken(user)
            } 
            else
            {
                this.stateInterface.push({
                    state: state,
                    userId: user.id
                })
                console.log("this is the user:", user);
                return this.generateAccessToken(user)
                //return user;
            }
        } 
        catch (error) {
        console.log("error in api request in register user", error);
        throw new BadRequestException(error.response?.statusText);
        }
    }

    /** @description */
    /** checks if the sent state correspond to a token and if it does 
     * errases the stored state and api token and retun a token 
     */
    async getAccessToken(state: string) {
        console.log("getAccessToken")
        for (let i = 0; i < this.stateInterface.length; i++)
        {
            const tmp = this.stateInterface[i];
            console.log(tmp);
            if (this.stateInterface[i].state == state)
            {
                const user = await this.userRepository.findOne({
                    where: {
                        id: this.stateInterface[i].userId
                    }
                })
                if (user) {
                    console.log(user);
                    this.stateInterface.splice(i, 1)
                    return this.generateAccessToken(user);
                }
            }
        }
        /*const user = await this.userRepository.findOne({
            where: {
                id: this.stateInterface[i].userId
            }
        })
        if (user) {
            console.log(user);
            this.stateInterface.splice(i, 1)
            return this.generateAccessToken(user);
        }*/
    }
    
    /** @description */
    /** returns a Token, the user and the doubleAuth */
    async generateAccessToken(user: any) {
        const payload = {sub: user.id};
        return {
            doubleAuth: false,
            accessToken: this.jwtService.sign(payload),
            user
        };
    }
    
    async checkDoubleAuth(state: string) {
        console.log("checkDoubleAuth")
        for (let i = 0; i < this.stateInterface.length; i++)
        {
            const tmp = this.stateInterface[i];
            console.log(tmp);
            if (this.stateInterface[i].state == state)
            {
                const user = await this.userRepository.findOne({
                    where: {
                        id: this.stateInterface[i].userId
                    }
                })
                if (user.doubleAuth == true) 
                    return 1;
                else
                    return 0;
            }
        }
        return 2;
    }

    async checkDoubleAuthCode(login: string, code: number): Promise<any> {
        for (let i = 0; i < this.verifCode.length; i++)
        {
            const tmp = this.verifCode[i];
            if (tmp.login == login && tmp.Code == code)
            {
                this.verifCode.splice(i, 1)
                const user = await this.userRepository.findOne({
                    where: {
                        login: login
                    }
                });
                return this.generateAccessToken(user);
            }
        }
        return "Invalid Code";
    }

    /*async validateUser(loginUserDto: LoginUserDto) {
       
        //connect to 42 api
        // send pwd and login
        // if not found in 42
        //return 'Invalid username or password';
        const user = await this.userRepository.findOne({
            where: {
                login: loginUserDto.login
            }
        })

        if (!user) // if the user never went on the website
            return this.profileService.createProfile(loginUserDto.login);
        
        else if (user && user.doubleAuth === true)
        {
            // get the mail from 42 api to send code
            for (let i = 0; i < this.verifCode.length; i++)
            {
                const tmp = this.verifCode[i];
                if (this.verifCode[i].login == loginUserDto.login)
                this.verifCode.splice(i, 1)
            }
            const rdmNumber = Math.floor(4000 + (Math.random() * 5000))
            console.log(rdmNumber)
            this.verifCode.push({
                login: loginUserDto.login,
                Code: rdmNumber,
            });
            //await this.mailService.sendUserConfirmation(loginUserDto.Nickname, user.Email, rdmNumber);
            return {
                doubleAuth: true
            }
        }

        else // if the user exists but did not activate the doubleAuth
            return this.generateAccessToken(user);
    }*/
}
