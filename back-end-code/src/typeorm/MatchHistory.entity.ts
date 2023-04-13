import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm"
import { Users } from "./Users.entity";

@Entity() 
export class MatchHistory { 

    @PrimaryGeneratedColumn()
    match_id: number

    @ManyToOne((type) => Users)
    player1: Users;

    /*@Column()
    player1: string*/

    /*@Column()
    player2: string*/

    @ManyToOne((type) => Users)
    player2: Users;

    @Column()
    score: string;

    @CreateDateColumn({
        type: 'date'
    })
    date: string;

}