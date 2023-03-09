import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinTable, ManyToMany } from "typeorm"
import { User } from "./User"
import { Message } from "./Message"

@Entity()
export class Chat {
     @PrimaryGeneratedColumn()
     chat_id: number

     @Column()
     name: string

     @ManyToOne(() => User)
     owner: User;

     @OneToMany(() => Message, (message) => message.channel)
     messages: Message[];

     @ManyToMany(() => User, (user) => user.channel)
     @JoinTable()
     users: User[];
}