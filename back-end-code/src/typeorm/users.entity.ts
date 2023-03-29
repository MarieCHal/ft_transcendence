import { Column, Entity, PrimaryGeneratedColumn, OneToMany,
        JoinTable,
        OneToOne,
        JoinColumn,
        ManyToMany,
        ManyToOne, } from "typeorm";
import { Chat } from "./Chat.entity";
import { Friends } from "./Friends.entity";
import { Stats } from "./Stats.entity";

@Entity()
export class User {

    //Primary generated column unique id
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'user_id',
    })
    user_id: number;

    // 42 Login
    @Column({
        default: '',
    })
    login: string;

    //choosable nickname
    @Column({
        default: '',
    })
    nickname: string;

    // true user is logeed in - false user isn't
    @Column('boolean', {default: false})
    isActive: boolean = false;

    // true send mail when login for double auth
    @Column('boolean', {default: false})
    doubleAuth: boolean = false;


    @Column({
        nullable: true
    })
    avatar: string;

    @ManyToMany(() => User)
    @JoinTable()
    blocked: User

    // -------- Relations with other tables ----------- 
    // one to one unidirectional relationship with avatar table
    // query can only be done from the user side
    @OneToMany((type) => Friends, (friends) => friends.friend_one)
    friends: Friends[];

    @ManyToMany((type) => Chat, (chat) => chat.users)
    chanel: Chat[]; 

    @OneToOne(() => Stats, (stats) => stats.user)
    @JoinColumn()
    stats: Stats

}