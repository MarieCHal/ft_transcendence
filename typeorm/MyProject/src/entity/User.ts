import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinTable } from "typeorm"
import { Friends } from "./Friends"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @OneToMany((type) => Friends, (friends) => friends.friend_one)
    friends: Friends[];
}
