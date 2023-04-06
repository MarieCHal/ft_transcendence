import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm"

@Entity() 
export class MatchHistory { 

    @PrimaryGeneratedColumn()
    match_id: number

    @Column()
    player1: string

    @Column()
    player2: string

    @Column()
    score: string;

    @CreateDateColumn({
        type: 'date'
    })
    date: string;

}