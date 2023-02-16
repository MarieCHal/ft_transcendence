import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { Public } from './public';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

}
