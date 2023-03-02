import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import { Friends } from "./entity/Friends"
import { createQueryBuilder } from "typeorm"


AppDataSource.initialize().then(async () => {

    const userRepository = await AppDataSource.getRepository(User)
    const friendsRepository = await AppDataSource.getRepository(Friends)

    console.log("Inserting a new user into the database...")
    const user = new User()
    user.firstName = "Marie2"
    user.lastName = "lala"
    user.age = 25
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)

    console.log("- - - - - - - - - - - - - - - - - \n")

    const user1 = await userRepository.findOne({
        where: {
            id: 1
        }
    })

    const user2 = await userRepository.findOne({
        where: {
            id: 2
        }
    })
    
    console.log("user1:", user1)
    console.log("user2:", user2)

    //create a new friend request
    const friends = new Friends()
    friends.friend_one = user1;
    friends.friend_two = user2.id;
    await friendsRepository.save(friends);

    user1.friends = [friends];
    await userRepository.save(user1);

    const user3 = await userRepository.find({
        where: {
            id: 1,
        },
        relations: {
            friends: true
        }
    })

    const friend = await friendsRepository.find({
        relations: {
            friend_one: true,
        }
    })

   /*const user3 = await userRepository
                    .createQueryBuilder()
                    .leftJoinAndSelect("user.friends", "friends")
                    .where("user.id = id", {id: "1"})
                    .getOne()*/

    console.log("user2 with friends:", user3)
    console.log("friend requests: ", friend)
    //console.log("user2's friend: ", user3[0].friends[7].friend_one)
    //console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
