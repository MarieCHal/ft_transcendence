import { Column, Entity, PrimaryGeneratedColumn, OneToOne} from "typeorm";
import { User } from "./Users.entity";

@Entity()
export class Stats {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'stats_id',
    })
    stats_it: number;

    @OneToOne(() => User, (user) => user.stats)
    user: User;

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