import { Controller, Post, UseGuards, Request, Delete } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
    constructor( private gameService: GameService) {}

    @Post('matchmaking')
    @UseGuards(JwtAuthGuard)
    async matchMaking(@Request() req: any) {
        console.log("request body", req.user.user_id)
        return this.gameService.matchMaking(req.user.user_id);
    }

    @Delete('matchmaking')
    @UseGuards(JwtAuthGuard)
    async deleteMatch(@Request() req: any) {
        console.log("userId: match delete ", req.user.user_id)
        return this.gameService.deleteMatch(req.user.user_id);
    }
}
