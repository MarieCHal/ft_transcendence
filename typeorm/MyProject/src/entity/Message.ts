import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinTable, CreateDateColumn } from "typeorm"
import { User } from "./User"
import { Chat } from "./Chat"

@Entity() 
export class Message {
    @PrimaryGeneratedColumn()
    mess_id: number

    @ManyToOne((type) => Chat, chat => chat.messages)
    channel: Chat

    @ManyToOne((type) => User,)
    sender: User

    @Column()
    text: string

    @CreateDateColumn()
    createdAt: Date;
}