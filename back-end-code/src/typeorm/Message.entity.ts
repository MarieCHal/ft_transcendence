import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm"
import { Users } from "./Users.entity";
import { Chat } from "./Chat.entity"

@Entity() 
export class Message {
    @PrimaryGeneratedColumn()
    mess_id: number

    @ManyToOne((type) => Chat, chat => chat.messages, {onDelete: 'CASCADE'})
    chanel: Chat

    @ManyToOne((type) => Users,)
    sender: Users

    @Column()
    text: string

    @CreateDateColumn({
        type: 'time',
        precision: 0
    })
    createdAtTime: string;

    /*@CreateDateColumn({ type: "time" }) // Use "time" data type for storing hour and minutes
    createdAtTime: Date;*/

    @CreateDateColumn({
        type: 'date'
    })
    createdAtDate: string;
}