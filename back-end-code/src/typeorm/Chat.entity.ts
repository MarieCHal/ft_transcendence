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

    // if set to true = privmsg
    @Column('boolean', {default: false})
    isPrivate: boolean = false

    // true = protected by a password
    @Column('boolean', {default: false})
    isProtected: boolean = false

    @Column()
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