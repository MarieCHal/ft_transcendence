import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class users {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'user_id',
    })
    id: number;

    @Column({
        nullable: false,
        default: '',
    })
    Firstname: string;

    @Column({
        //name: 'email_address',
        nullable: false,
        default: '',
    })
    Lastname: string;

    @Column({
        //name: 'email_address',
        nullable: false,
        default: '',
    })
    Nickname: string;

    @Column({
        //name: 'email_address',
        nullable: false,
        default: '',
    })
    email: string;

    @Column({
        nullable: false,
        default: '',
    })
    password: string;    
}