import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../services/auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }
    
    /*async validate(state: string, password: number): Promise<any> {
        console.log(state, password)
        const user = await this.authService.checkDoubleAuthCode(username, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }*/
}