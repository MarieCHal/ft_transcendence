import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class users {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'user_id',
    })
    id: number;

    @Column({
        nullable: true,
        type: 'bytea'
    })
    Avatar: Buffer;
    
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
        //nullable: true,
        default: '',
    })
    Email: string;

    @Column({
        nullable: false,
        default: '',
    })
    Password: string; 
    
}