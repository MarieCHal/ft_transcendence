import { Injectable, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Friends, User } from 'src/typeorm';
import { Not, Repository } from 'typeorm';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UsersService {
    constructor (
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(Friends) private friendsRepository: Repository<Friends>,
    ) {}

    
    async findAll(userId: number) {
        const users = await this.usersRepository
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.stats", "stats")
        .select(['user.user_id', 'user.nickname', 'user.isActive', 'stats'])
        .where("user.user_id != :id", {id: userId})
        .getRawMany()
        console.log(users);
        const friends = await this.getFriends(userId);
        console.log(friends);
        return {
            allUsers: users,
            myFriends: friends
        }
    }

    async getFriends(userId: number) {

        const friends = await this.friendsRepository
                            .createQueryBuilder("friends")
                            .leftJoinAndSelect("friends.friend_one", "user")
                            .leftJoinAndSelect("user.stats", "stats")
                            .select(['user.user_id', 'user.nickname', 'user.isActive', 'stats'])
                            .where("friends.friend_two = :id", {id: userId})
                            .andWhere("friends.status = :status", {status: true})
                            .getRawMany()
        console.log(friends);
        return friends        
    }

    async findOne(id: number) {
        const user = await this.usersRepository.findOne({
            where: {
                user_id: id, 
            }
        })
        return user;
    }

    async returnProfile(userID: number) {
        const user = await this.usersRepository
                                .createQueryBuilder('user')
                                .leftJoinAndSelect('user.stats', 'stats')
                                .select(['user.nickname', 'user.user_id', 'user.isActive', 'stats'])
                                .where('user.user_id = :id', {id: userID})
                                .getRawOne()
        return user;
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
                                        .getMany()
        console.log(friendRequests);
        return {
            me,
            pending: friendRequests
        }
    }

    async friendRequest(userId: number, friendId: number) { 

        if (userId == friendId)
            "I hope you don't need to ask yourSelf to be friend with your own person"

        const requester = await this.findOne(userId);
        const otherUser = await this.findOne(friendId);

        const pending = await this.friendsRepository
                        .createQueryBuilder('friends')
                        .leftJoinAndSelect('friends.friend_one', 'friend_one')
                        .where('friends.friend_one.user_id = :user_id', {user_id: friendId})
                        .andWhere('friends.friend_two = :id', {id: userId})
                        .getOne()
        if (pending)
            return "You guys are already friends :))"

        const newFriends1 = new Friends();
        newFriends1.friend_one = requester;
        newFriends1.friend_two = otherUser.user_id;
        await this.friendsRepository.save(newFriends1);


        const friendRequests = await this.friendsRepository
                                .createQueryBuilder('friends')
                                .leftJoinAndSelect('friends.friend_one', 'friend_one')
                                .where("friends.status = :status", {status: false})
                                .getMany()
        return friendRequests
    }

    /** @brief */
    /* accept a friend request, create new row in friend table with friend one being the personne that made the request
     * set the two rows corresponfin to the friendship to status = true
     */
    async acceptFriendRequest(userId: number, friendId: number) {
        console.log("l'autre: ", friendId)
        console.log("moi: ", userId)
        const pending = await this.friendsRepository
                        .createQueryBuilder('friends')
                        .leftJoinAndSelect('friends.friend_one', 'friend_one')
                        .where('friends.friend_one.user_id = :user_id', {user_id: friendId})
                        .andWhere('friends.friend_two = :id', {id: userId})
                        .getOne()
        
        console.log("friendReq in accept", pending);
        const newFriends = new Friends();
        const user = await this.findOne(userId)

        newFriends.friend_one = user;
        newFriends.friend_two = pending.friend_one.user_id;
        newFriends.status = true;
        pending.status = true;
        await this.friendsRepository.save(pending);
        await this.friendsRepository.save(newFriends);
        return 'request succefully accepted';
    }

    /** @brief reject a friend request and remove the corresponding row  */
    async rejectFriendRequest(userId: number, firendId: number)
    {
        const pending = await this.friendsRepository
                        .createQueryBuilder('friends')
                        .leftJoinAndSelect('friends.friend_one', 'friend_one')
                        .where('friends.friend_one.user_id = :id', {id: firendId})
                        .andWhere('friends.friend_two = :id', {id: userId})
                        .getOne()
        await this.friendsRepository.remove(pending);
        return 'request succefully rejected';
    }

    /** @brief remove both rows in friend table concerning the friendship */
    async stopFrienship(userId: number, friendId: number)
    {
        const toStop = await this.friendsRepository
                                    .createQueryBuilder('friends')
                                    .leftJoinAndSelect('friends.friend_one', 'friend_one')
                                    .where('friends.friend_one.user_id = :id', {id: friendId})
                                    .andWhere('friends.friend_two = :id', {id: userId})
                                    .getOne()
        
        const toStop2 = await this.friendsRepository
                                .createQueryBuilder('friends')
                                .leftJoinAndSelect('friends.friend_one', 'friend_one')
                                .where('friends.friend_one.user_id = :id', {id: userId})
                                .andWhere('friends.friend_two = :id', {id: friendId})
                                .getOne()

        await this.friendsRepository.remove([toStop, toStop2]);
    }


    /** @brief change the double authentification  */
    async doubleAuth(userId: number, doubleAuth: boolean) {
        const user = await this.usersRepository.findOne({
            where: {
                user_id: userId
            }
        })
        user.doubleAuth = doubleAuth;
        return await this.usersRepository.save(user);
    }

    async isActive(userId: number, status: boolean) {

        console.log(userId)
        const user = await this.findOne(userId);
        user.isActive = status;
        await this.usersRepository.save(user);
    }
}
