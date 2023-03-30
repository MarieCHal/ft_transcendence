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

    @Column({default: 0})
    games: number;

    @Column({default: 0})
    victories: number;

    @Column({default: 0})
    defeats: number;
}