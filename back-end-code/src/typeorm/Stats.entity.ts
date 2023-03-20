import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Stats {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'stats_id',
    })
    stats_it: number;

    @Column({
    })
    games: number;

    @Column({
    })
    victories: number;

    @Column({
    })
    defeats: number;
}