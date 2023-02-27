import { Column, Entity, PrimaryGeneratedColumn, OneToMany,
        JoinTable,
        OneToOne,
        JoinColumn,
        ManyToMany, } from "typeorm";
import { Friends } from "./friends.entity";

@Entity()
export class User {

    //Primary generated column unique id
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'user_id',
    })
    id: number;

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
        default: '',
    })
    avatar: string;
    // -------- Relations with other tables ----------- 
    // one to one unidirectional relationship with avatar table
    // query can only be done from the user side
    /*@OneToOne(() => Avatar)
    @JoinColumn()
    avatar: Avatar;*/

    /*@ManyToMany(() => Friends, (friends) => friends.users)
    @JoinTable()
    friends: Friends[];*/

}