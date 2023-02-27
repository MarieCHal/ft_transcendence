import { Controller, Get, Res, Post, UseGuards, BadRequestException, HttpStatus, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { Public } from './public';
import { HttpService } from '@nestjs/axios';
import { response } from 'express';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { Headers } from '@nestjs/common';
import { AuthService } from './auth/services/auth.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly httpService: HttpService,
    private readonly authService: AuthService
    )  {}

  @Post('wellcome')
  async helloFriend( @Body() body: any) {
    console.log(body.code)
    //console.log("body state:", body.state)
    const {data} = await firstValueFrom(this.httpService.post(`https://api.intra.42.fr/oauth/token`, {
            grant_type: 'authorization_code',
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            code: body.code,
            redirect_uri: 'http://localhost:5173/register',
            //state: body.state,
        }).pipe(
          catchError((error: AxiosError) => {
            console.error(error.response.data);
            throw 'An error has happened! ' 
          })
        )
      )
    console.log("data: ", data);

    return this.authService.registerUser(data.access_token, "coucou");
    //return "ok Gael :)"
  }

}
