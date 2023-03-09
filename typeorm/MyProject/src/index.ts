import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import { Friends } from "./entity/Friends"
import { Message } from "./entity/Message"
import { Chat } from "./entity/Chat"
import { createQueryBuilder } from "typeorm"
import { request } from "http"


AppDataSource.initialize().then(async () => {

    const userRepository = await AppDataSource.getRepository(User)
    const friendsRepository = await AppDataSource.getRepository(Friends)
    const chatRepository = await AppDataSource.getRepository(Chat)
    const messageRepository = await AppDataSource.getRepository(Message)

    /*console.log("Inserting a new user into the database...")
    const user = new User()
    user.firstName = "Marie3"
    user.lastName = "lala5"
    user.age = 23
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)*/

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)

    console.log("- - - - - - - - - - - - - - - - - \n")

   const user1 = await userRepository.findOne({
        where: {
            user_id: 2
        }
    })

    const user2 = await userRepository.findOne({
        where: {
            user_id: 3
        }
    })

    console.log("user1: ", user1);
    console.log("user2: ", user2);
    //create a new friend request
    //console.log("Creating new friend request...")
    /*const friend1 = new Friends();
    friend1.friend_one = user1;
    friend1.friend_two = user2.user_id;
    await friendsRepository.save(friend1);*/

    //user1.friends = [friend1];
    //await userRepository.save(user1);

    /*const amis = await friendsRepository
                    .createQueryBuilder('friends')
                    .leftJoinAndSelect('friends.friend_one', 'friend_one')
                    .getMany()
    
    console.log("friend requests: ", amis);*/
    
    //create a new channel and message
    /*const channel = new Chat();
    channel.owner = user1;
    channel.name = "salutlescopains";
    const newChannel = await chatRepository.save(channel);*/

    //create two new messages
    /*const message = new Message();
    message.sender = user1;
    message.channel = newChannel;
    message.text = "ouai super superrrr";
    const message2 = new Message();
    message2.sender = user2;
    message2.channel = newChannel;
    message2.text = "coucouuuu ";

    await messageRepository.save(message);
    await messageRepository.save(message2);*/

    const chan = await chatRepository.findOne({
        where: {
            chat_id: 8
        }
    })

    chan.users = [user1, user2];
    await chatRepository.save(chan);

    const allChan = await chatRepository.createQueryBuilder('chat')
                            .leftJoinAndSelect('chat.owner', 'owner')
                            .leftJoinAndSelect('chat.messages', 'messages')
                            .leftJoinAndSelect('chat.users', 'users')
                            .where("chat.chat_id = :chat_id", {chat_id: 8})
                            .getOne()
    
    console.log(" Chan: ", allChan)

    const all = await chatRepository.find();

    console.log("all: ", all);

    const userChan = await userRepository.createQueryBuilder("user")
                            .leftJoinAndSelect('user.channel', 'channel')
                            .where("user.user_id = :user_id", {user_id: 3})
                            .getOne()

    console.log(userChan);
    //create a new friend request
    console.log("Creating new friend request...")
    const friend1 = new Friends();
    friend1.friend_one = user1;
    friend1.friend_two = user2.user_id;
    await friendsRepository.save(friend1);

    user1.friends = [friend1];
    await userRepository.save(user1);

    const friend = await friendsRepository.createQueryBuilder('friends')
                    .leftJoinAndSelect('friends.friend_one', 'user')
                    .where("friends.status = :status", {status: false})
                    .andWhere("friends.friend_two = :user_id", {user_id: user2.user_id})
                    .getMany()
    
    console.log("friend requests: ", friend);

}).catch(error => console.log(error))

    
