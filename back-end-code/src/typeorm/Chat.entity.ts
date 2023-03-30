import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinTable, ManyToMany } from "typeorm"
import { User } from "./Users.entity";
import { Message } from "./Message.entity"
import { Mute } from "./Mute.entity";

@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
    chat_id: number

    @Column({
        'nullable': false
    })
    name: string

    @Column({
        default: '',
    })
    pwd: string

    @Column('boolean', {default: false})
    isDirect: boolean = false

    // if set to true = private channel
    @Column('boolean', {default: false})
    isPrivate: boolean = false


    // true = protected by a password
    @Column('boolean', {default: false})
    isProtected: boolean = false

    @Column({default: 0})
    nb_users: number;
    
    @OneToMany(() => Message, (message) => message.chanel)
    messages: Message[];

    @ManyToOne(() => User)
    owner: User;
    
    @ManyToMany(() => User)
    @JoinTable()
    admins: User[];

    @ManyToMany(() => User, (user) => user.chanel, {
        cascade: true
    })
    @JoinTable()
    users: User[];


    @ManyToMany(() => User, {
        cascade: true
    })
    @JoinTable()
    banned: User[];

    @OneToMany(() => Mute, (muted) => muted.chat)
    @JoinTable()
    muted: Mute[]
}