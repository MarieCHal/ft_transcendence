import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, TableForeignKey} from "typeorm"
import { ForeignKeyMetadata } from "typeorm/metadata/ForeignKeyMetadata";
import { User } from "./User";

@Entity()
export class Friends {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'friend_request',
    })
    id: number;

    // the user'id of the one that requested
    @ManyToOne((type) => User, user => user.friends)
    friend_one: User;

    // the usser's id of the one that recieved the request
    @Column()
    friend_two: number;

    // the status of the friend request (false = pending, true = accepted)
    @Column('boolean', {default: false})
    status: boolean = false;

}