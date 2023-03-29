import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm"
import { User } from "./Users.entity";
import { Chat } from "./Chat.entity"

@Entity() 
export class Message {
    @PrimaryGeneratedColumn()
    mess_id: number

    @ManyToOne((type) => Chat, chat => chat.messages, {onDelete: 'CASCADE'})
    chanel: Chat

    @ManyToOne((type) => User,)
    sender: User

    @Column()
    text: string

    @CreateDateColumn({
        type: 'time',
        precision: 0
    })
    createdAtTime: string;

    @CreateDateColumn({
        type: 'date'
    })
    createdAtDate: string;
}