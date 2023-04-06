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
      
      // check the token 
      let token = req.headers.authorization;
      let cleanToken = token.replace('Bearer','').trim();
      if (!token)
      {
         console.log("no token")
         throw new UnauthorizedException;
      }
      let userToken = this.jwtService.verify(
         cleanToken, {
           secret: this.configService.get('APP_SECRET')
         }
       );
      console.log("token: ", userToken)
      let user = await this.usersService.findOne(userToken.sub)
      if (!user)
         throw new UnauthorizedException;
      req.user = user;

      // check the content of the req.body to check if undefined variables are present
      const bodyFields = [];
      for (const field in req.body) // field 
      {
         if (req.body.hasOwnProperty(field) && req.body[field] === undefined) {
            bodyFields.push(field);
      }
     }
     if (bodyFields.length > 0) { // if there are undefined files in the body the request will not be proceeded
       return res.status(400).json({ message: `Missing fields: ${bodyFields.join(', ')}` });
     }

     // check the id in the param
     /*const id = req.params.id
     if (id === undefined) {
      return res.status(400).json({ message: `id in ${req.baseUrl} is undefined` });
     }*/

      next(); 
   }
}