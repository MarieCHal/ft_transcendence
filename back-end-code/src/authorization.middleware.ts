import { Injectable, NestMiddleware, Next, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request, Response, NextFunction } from "express";
import { nextTick } from "process";
import { UsersService } from "./users/users.service";

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware{
   constructor(
      private jwtService: JwtService,
      private usersService: UsersService,
      private configService: ConfigService
   ){}  
   async use(req: Request, res: Response, next: NextFunction){
      // get token and decode or any custom auth logic
      let token = req.headers.authorization;
      let cleanToken = token.replace('Bearer','').trim();
      console.log("token before: ", token)
      console.log("token after: ", cleanToken)
      if (!token)
      {
         console.log("no token")
         throw new UnauthorizedException;
      }
      console.log("token secret: ", this.configService.get('APP_SECRET'))
      let userToken = this.jwtService.verify(
         cleanToken, {
           secret: this.configService.get('APP_SECRET')
         }
       );
      console.log("token: ", userToken)
      let user = await this.usersService.findOne(userToken.sub)
      if (!user)
         throw new UnauthorizedException;
      console.log("user in middleware: ", user)
      req.user = user;
      next(); 
   }
}