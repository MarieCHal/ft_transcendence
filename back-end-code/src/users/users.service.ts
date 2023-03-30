import { Injectable, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Friends, User } from 'src/typeorm';
import { Not, Repository } from 'typeorm';
import { MatchHistory } from 'src/typeorm';
import { MailService } from 'src/mail/mail.service';


@Injectable()
export class UsersService {
    constructor (
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(Friends) private friendsRepository: Repository<Friends>,
        @InjectRepository(MatchHistory) private matchHistory: Repository<MatchHistory>
    ) {}

    /** @summary returns all users excepted yourself in public mode */
    async findAll(user: User) {
        const users = await this.usersRepository
                        .createQueryBuilder("user")
                        .leftJoinAndSelect("user.stats", "stats")
                        .select(['user.user_id', 'user.nickname', 'user.isActive', 'stats'])
                        .where("user.user_id != :id", {id: user.user_id})
                        .getRawMany()
        console.log(users);
        const friends = await this.getFriends(user);
        //const blocked = await this.getBlocked(user.user_id);
        console.log(friends);
        return {
            allUsers: users,
            myFriends: friends,
            //blocked: blocked
        }
    }

    /** @summary return an array of users in public mode corresponding to the user's friends*/
    async getFriends(user: User) {

        const friends = await this.friendsRepository
                            .createQueryBuilder("friends")
                            .leftJoinAndSelect("friends.friend_one", "user")
                            .leftJoinAndSelect("user.stats", "stats")
                            .select(['user.user_id', 'user.nickname', 'user.isActive', 'stats'])
                            .where("friends.friend_two = :id", {id: user.user_id})
                            .andWhere("friends.status = :status", {status: true})
                            .getRawMany()
        console.log(friends);
        return friends        
    }

    /** @summary get one by id*/
    async findOne(id: number) {
        const user = await this.usersRepository.findOne({
            where: {
                user_id: id, 
            }
        })
        return user;
    }

    /** @summary get one by nickname (used in app.gateway) */
    async findNickname(nickname: string) {
        const user = await this.usersRepository.findOne({
            where: {
                nickname: nickname
            }
        })
        return user;
    }

    /** @summary return a specific profile (public) */
    async returnProfile(userId: number) {
        const user = await this.usersRepository
                                .createQueryBuilder('user')
                                .leftJoinAndSelect('user.stats', 'stats')
                                .select(['user.nickname', 'user.user_id', 'user.isActive', 'stats'])
                                .where('user.user_id = :id', {id: userId})
                                .getRawOne()
        const matchHistory = await this.returnMatch(user)
        return {
            user,
            matchHistory
        }
    }
    

    /** @brief return the profile of the user itself, its stats, friends and friend request */
    async mySelf(id: number) {

        const me = await this.usersRepository
                                .createQueryBuilder('users')
                                .where('users.user_id = :user_id', {user_id: id})
                                .getOne()
        
        console.log("me: ", me);

        const friendRequests = await this.friendsRepository.createQueryBuilder('friends')
                                        .leftJoinAndSelect('friends.friend_one', 'user')
                                        .where("friends.status = :status", {status: false})
                                        .andWhere("friends.friend_two = :user_id", {user_id: id})
                                        .select(['user.user_id', 'user.nickname'])
                                        .getRawMany()

        const matchHistory = await this.returnMatch(me);
        console.log(friendRequests);
        return {
            me,
            pending: friendRequests,
            matchHistory
        }
    }

    async returnMatch(user: User) {
        const history = await this.matchHistory.createQueryBuilder('match')
                                    .where('match.player1 = :player1_id', {player1_id: user.nickname})
                                    .orWhere('match.player2 = :player2_id', {player2_id: user.nickname})
                                    .getMany()

        console.log("history return: ", history)
        return history
    }

    /** @summary creates a new friend request if not yet existing (from user to friendId) */
    async friendRequest(user: User, friendId: number) { 

        if (user.user_id == friendId)
            "I hope you don't need to ask yourSelf to be friend with your own person"

        const requester = await this.findOne(user.user_id);
        const otherUser = await this.findOne(friendId);

        const oneWay = await this.friendsRepository
                        .createQueryBuilder('friends')
                        .leftJoinAndSelect('friends.friend_one', 'friend_one')
                        .where('friends.friend_one.user_id = :user_id', {user_id: friendId})
                        .andWhere('friends.friend_two = :id', {id: user.user_id})
                        .getOne()
        
        const otherWay = await this.friendsRepository
                        .createQueryBuilder('friends')
                        .leftJoinAndSelect('friends.friend_one', 'friend_one')
                        .where('friends.friend_one.user_id = :user_id', {user_id: user.user_id})
                        .andWhere('friends.friend_two = :id', {id: friendId})
                        .getOne()
        
        if (oneWay || otherWay)
            return "You guys are already friends :))"

        const newFriends1 = new Friends();
        newFriends1.friend_one = requester;
        newFriends1.friend_two = otherUser.user_id;
        await this.friendsRepository.save(newFriends1);

        return `Your friend request was send`
    }

    /** @brief */
    /* accept a friend request, create new row in friend table with friend one being the personne that made the request
     * set the two rows corresponfin to the friendship to status = true
     */
    async acceptFriendRequest(user: User, friendId: number) {
        console.log("l'autre: ", friendId)
        console.log("moi: ", user)
        const pending = await this.friendsRepository
                        .createQueryBuilder('friends')
                        .leftJoinAndSelect('friends.friend_one', 'friend_one')
                        .where('friends.friend_one.user_id = :user_id', {user_id: friendId})
                        .andWhere('friends.friend_two = :friend_id', {friend_id: user.user_id})
                        .getOne()
        
        console.log("friendReq in accept", pending);
        const newFriends = new Friends();

        newFriends.friend_one = user;
        newFriends.friend_two = pending.friend_one.user_id;
        newFriends.status = true;
        pending.status = true;
        await this.friendsRepository.save(pending);
        await this.friendsRepository.save(newFriends);
        return 'request succefully accepted';
    }

    /** @brief reject a friend request and remove the corresponding row  */
    async rejectFriendRequest(user: User, friendId: number)
    {
        console.log("l'autre: ", friendId)
        console.log("moi: ", user.user_id)
        const pending = await this.friendsRepository
                        .createQueryBuilder('friends')
                        .leftJoinAndSelect('friends.friend_one', 'friend_one')
                        .where('friend_one.user_id = :user_id', {user_id: friendId})
                        .andWhere('friends.friend_two = :friend_two', {friend_two: user.user_id})
                        .getOne()
        console.log('friend pending: ', pending);
        await this.friendsRepository.remove(pending);
        return 'request succefully rejected';
    }

    // front
    /** @brief remove both rows in friend table concerning the friendship */
    async stopFrienship(user: User, friendId: number)
    {
        const toStop = await this.friendsRepository
                                    .createQueryBuilder('friends')
                                    .leftJoinAndSelect('friends.friend_one', 'friend_one')
                                    .where('friends.friend_one.user_id = :user_id', {user_id: friendId})
                                    .andWhere('friends.friend_two = :friend_id', {friend_id: user.user_id})
                                    .getOne()
        
        const toStop2 = await this.friendsRepository
                                .createQueryBuilder('friends')
                                .leftJoinAndSelect('friends.friend_one', 'friend_one')
                                .where('friends.friend_one.user_id = :user_id', {user_id: user.user_id})
                                .andWhere('friends.friend_two = :friend_id', {friend_id: friendId})
                                .getOne()

        await this.friendsRepository.remove([toStop, toStop2]);
    }


    /** @brief change the double authentification  */
    async doubleAuth(user: User, doubleAuth: boolean) {
        user.doubleAuth = doubleAuth;
        return await this.usersRepository.save(user);
    }

    /** @summary change status state */
    async isActive(user: User, status: number) {
        user.isActive = status;
        await this.usersRepository.save(user);
    }
}
