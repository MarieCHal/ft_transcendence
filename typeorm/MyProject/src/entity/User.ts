import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinTable, ManyToMany } from "typeorm"
import { Friends } from "./Friends"
import { Chat } from "./Chat"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    user_id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @OneToMany((type) => Friends, (friends) => friends.friend_one)
    friends: Friends[];

    @ManyToMany((type) => Chat, (chat) => chat.users)
    channel: Chat[]; 
}
