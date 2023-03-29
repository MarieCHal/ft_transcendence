import { Column, Entity, CreateDateColumn, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Chat } from "./Chat.entity";
import { User } from "./Users.entity";

@Entity()
export class Mute {
    @PrimaryGeneratedColumn( {
        type: 'bigint',
        name: 'mute_id'
    })
    mute_id: number

    @ManyToOne((type) => User)
    @JoinColumn()
    users: User

    @ManyToOne(() => Chat, (chat) => chat.muted)
    chat: Chat

    @CreateDateColumn({
    })
    createdAt: Date;
}