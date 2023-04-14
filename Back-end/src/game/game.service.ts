import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users, Stats, MatchHistory } from 'src/typeorm';
import { GameInterface } from './game.interface';
import { UsersService } from 'src/users/users.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Interval } from '@nestjs/schedule'
import { Repository } from 'typeorm';

@Injectable()
export class GameService {
    constructor (
        private userService: UsersService,
        @InjectRepository(Users) private usersRepository: Repository<Users>,
        @InjectRepository(Stats) private statsRepository: Repository<Stats>,
        @InjectRepository(MatchHistory) private matchHistory: Repository<MatchHistory>
    ) {}
    private gameList: GameInterface [] = []

    listMatch: number[] = [];

    async addToList(userId: number) {
        for (let i = 0; this.listMatch[i]; i++)
        {
            if (this.listMatch[i] == userId)
                return
        }
        this.listMatch.push(userId);
        for (let i = 0; this.listMatch[i]; i++)
        {
            //console.log("list matchmaking: ", this.listMatch[i]);
        }
    }

    async initGame(userId1: number, userId2: number, roomId: string)
    {
        this.gameList.push({
            room: roomId,
            player1: userId1, // id player1
            player2: userId2, // id player 2

            posX1: 10, // palet user 1 y 
            posY1: 400/2 - 100/2, // palet user 1 y 

            posX2: 580, // palet user 2 y 
            posY2: 400/2 - 100/2, // palet user 2 y 

            // heigth and width of paddle of plyer 1 and 2
            heigth1: 100,
            width1: 10,

            heigth2: 100,
            width2: 10,

            // variable of the ball
            ballX: 600/2,
            ballY: 400/2,
            velocityX: 5,
            velocityY: 5,
            bRadius: 8,
            speed: 8,

            score1: 0,
            score2: 0,
        })
    }

    async matchMaking(userId: number) {
        if (userId == this.listMatch[0])
        {
            //console.log("index 1: ", userId)
            let room = 'room' + userId
            return room;
        }
        else if (userId == this.listMatch[1])
        {
            //console.log("index 2: ", userId)
            let room = 'room' + this.listMatch[0]
            //let game = await this.findGame(room);
            await this.initGame(this.listMatch[0], userId, room)
            this.listMatch.splice(0, 2);
            //game.player2 = userId;
            ////console.log("game: ", game);
            return room;
        }
    }

    deleteMatch(userId: number) {
        for (let i = 0; this.listMatch[i]; i++) {
            if (userId == this.listMatch[i])
                this.listMatch.splice(i, 1);
        }
        return 'Successfully removed from MatchMaking';
    }

    newGame(roomId: string, user1: number, user2: number) {
        this.initGame(user1, user2, roomId);
    }

    stopGame(roomId: string) {
        for(let i= 0; this.gameList[i]; i++)
        {
            if (this.gameList[i].room == roomId)
            {
                this.gameList.splice(i, 1);
            }
        }
    }

    // resets the ball in the middle of the canvas
    async resetBallright(game: GameInterface) {
        game.posY1 = 150;
        game.posY2 = 150;
        game.ballX = 600/2;
        game.ballY = 400/2;
        game.speed = 6;
        game.velocityX = -5;
        game.velocityY = -5;
    }

    async resetBallLeft(game: GameInterface) {
        //game.player1 = 150;
        //game.player2 = 150;
        game.posY1 = 150;
        game.posY2 = 150;
        game.ballX = 600/2;
        game.ballY = 400/2;
        game.speed = 6;
        game.velocityX = 5;
        game.velocityY = 5;
    }

    collision(game: GameInterface, player: number) {

        let bTop = game.ballY - game.bRadius;
        let bBottom = game.ballY + game.bRadius;
        let bLeft = game.ballX - game.bRadius;
        let bRigth = game.ballX + game.bRadius;

        if (player == 1) {
            let pTop = game.posY1
            let pBottom = game.posY1 + game.heigth1;
            let pLeft = game.posX1;
            let pRigth = game.posX1 + game.width1;
            return bRigth > pLeft && bBottom > pTop && bLeft < pRigth && 
                    bTop < pBottom;
        }
        else if (player == 2) {
            let pTop = game.posY2
            let pBottom = game.posY2 + game.heigth2;
            let pLeft = game.posX2;
            let pRigth = game.posX2 + game.width2;
            return bRigth > pLeft && bBottom > pTop && bLeft < pRigth && 
                    bTop < pBottom;
        }
    }

    // player1 is on the left side and player 2 on the right side of the canevas
    // 
    @Interval(1000/50)
    handleInterval() {
        ////console.log('handleInterval');
        if (this.gameList.length > 0)
        {
            //console.log(this.gameList.length)
            ////console.log('updateGame');
            this.updateGame();
        }
    }

    updateGame() {
        let game: GameInterface;
        for (let i = 0; this.gameList[i]; i++) // find the game corresponding to the room
        {
            game = this.gameList[i];
            // check for scores and reset
            if (game.ballX - game.bRadius <= 0) {
                game.score2++;
                //console.log("score for user 1");
                this.resetBallright(game);
            }
            else if (game.ballX + game.bRadius >= 600)
            {
                game.score1++;
                //console.log("score for user 2");
                this.resetBallLeft(game);
            }
    
            // increases the position od the ball
            game.ballX += game.velocityX;
            game.ballY += game.velocityY;
    
            // if velocity nananinana
            if (game.ballY + game.bRadius > 400 || game.ballY - game.bRadius < 0) {
                game.velocityY = - game.velocityY;
            }
    
            let coll;
            // check on which side the ball is 
            if (game.ballX <= 300) // plyer1
            {
                ////console.log('if game')
                // the ball is on the left side 
                coll = this.collision(game, 1);
                //coll = false
                if (coll) {
                    ////console.log("if game collision true ")
                    let collidePoint = (game.ballY - (game.posY1 + game.heigth1/2));
                    collidePoint = collidePoint/(game.heigth1/2);
    
                    // calculate angle in Radian
                    let angleRad = collidePoint * Math.PI/4;
    
                    // X direction of the ball hit (depending on rigth or left side)
                    let direction = (game.ballX + game.bRadius < 600/2) ? 1: -1;
    
                    // change velcity x and y
                    game.velocityX = direction * game.speed * Math.cos(angleRad);
                    game.velocityY = game.speed * Math.sin(angleRad);
                    
                    if(game.speed != 19)
                        game.speed += 0.5
                    
                }
            }
            else //player2 
            {
                ////console.log('else game')
                coll = this.collision(game, 2);
                //coll = false
                if (coll) {
                    //console.log("else game collision true ")
                    let collidePoint = (game.ballY - (game.posY2 + game.heigth2/2));
                    collidePoint = collidePoint/(game.heigth2/2);
    
                    // calculate angle in Radian
                    let angleRad = collidePoint * Math.PI/4;
    
                    // X direction of the ball hit (depending on rigth or left side)
                    let direction = (game.ballX + game.bRadius < 600/2) ? 1: -1;
    
                    // change velcity x and y
                    game.velocityX = direction * game.speed * Math.cos(angleRad);
                    game.velocityY = game.speed * Math.sin(angleRad);
                    
                    if(game.speed != 19)
                        game.speed += 0.5
                }
            }
        }

    }

    // updates the pos of the paddle of the players
    // pos being the data recieved on 'play'
    async updatePlayerPos(roomId: string, userId: number, pos: number) {
        let game = this.findGame(roomId);
        if (!game)
            return ;
        // updates the Y pos according to the userId passed as argument
        if (game.player1 == userId)
            game.posY1 = pos;
        else if (game.player2 == userId)
            game.posY2 = pos;
    }

    findGame(roomId: string) {
        let game: GameInterface;
        for (let i = 0; this.gameList[i]; i++) // find the game corresponding to the room
        {
            if (this.gameList[i].room == roomId)
            {
                game = this.gameList[i];
            }
        }
        return game;
    }

    async whoWon(roomId: string) { // return the id of the player that won
        let game = this.findGame(roomId);
        if (!game)
            return;
        let winner: number;
        if (game.score1 > game.score2)
            winner = game.player1;
        else 
            winner = game.player2;
        //await this.gameStats(game, winner);
        await this.stopGame(roomId); // removes the game from the game list 
        return winner
    }

    async gameStats(game: GameInterface) {
        let winner: number;
        if (game.score1 > game.score2)
            winner = game.player1;
        else 
            winner = game.player2;

        //console.log("game: ", game);
        
        const user1 = await this.userService.findOne(game.player1);
        const user2 = await this.userService.findOne(game.player2);

        let score = game.score1.toString() + '-' + game.score2.toString();
        ////console.log("score in string: ", score);
        
        const match = new MatchHistory();
        match.player1 = user1;
        match.player2 = user2;
        match.score = score;

        await this.matchHistory.save(match);
        /*const match2 = new MatchHistory();
        match2.player1 = user2;
        match2.player2 = user1.nickname;
        match2.score = score;*/

        //await this.matchHistory.save(match2)
        //console.log('match: ', newMatch)              

        //console.log("user1: ", user1)
        //console.log("user2: ", user2)

        let stat1 = await this.statsRepository.createQueryBuilder('stats')
                                                .leftJoinAndSelect('stats.user', 'user')
                                                .where('user.user_id = :user_id', {user_id: game.player1})
                                                .getOne()
        
        let stat2 = await this.statsRepository.createQueryBuilder('stats')
                                                .leftJoinAndSelect('stats.user', 'user')
                                                .where('user.user_id = :user_id', {user_id: game.player2})
                                                .getOne()
        
        //console.log("stat1: ", stat1, " stat2: ", stat2);

        /*if (!stat1)
        {
            stat1 = new Stats();
            stat1.user = user1;
            stat1.games = 1;
            if (user1.user_id == winner) {
                stat1.victories = 1;
                stat1.defeats = 0;
            }
            else {
                stat1.victories = 0;
                stat1.defeats = 1;
            }
            //stat1 = await this.statsRepository.save(stat1)
        }
        if (!stat2)
        {
            stat2 = new Stats();
            stat2.games = 1;
            stat2.user = user2;
            if (user2.user_id == winner) {
                stat2.victories = 1;
                stat2.defeats = 0;
            }
            else {
                stat2.victories = 0;
                stat2.defeats = 1;
            }
        }*/
        //else {
            stat1.games++;
            stat2.games++;
            if (user1.user_id == winner) {
                stat1.victories++;
                stat2.defeats++;
            }
            else if (user2.user_id == winner) {
                stat2.victories++;
                stat1.defeats++;
            }
        //}

        const newStat1 = await this.statsRepository.save(stat1);
        const newStat2 = await this.statsRepository.save(stat2);
        await this.userService.isActive(user1, 1);
        await this.userService.isActive(user2, 1);

        console.log("newStat1: ", newStat1)
        console.log("newStat2: ", newStat2)

        return winner;
    }

}
