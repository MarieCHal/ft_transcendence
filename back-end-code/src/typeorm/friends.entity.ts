import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, TableForeignKey} from "typeorm"
import { ForeignKeyMetadata } from "typeorm/metadata/ForeignKeyMetadata";
import { User } from "./users.entity";

@Entity()
export class Friends {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'firend_request',
    })
    id: number;

    // the user'id of the one that requested
    @Column()
    friend_one: number;

    // the usser's id of the one that recieved the request
    @Column()
    friend_two: number;

    // the status of the friend request (false = pending, true = accepted)
    @Column('boolean', {default: false})
    status: boolean = false;

    /*@ManyToMany(() => User, user => user.friends)
    users: User[];8*/
}