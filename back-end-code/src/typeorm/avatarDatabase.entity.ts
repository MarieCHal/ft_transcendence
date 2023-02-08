import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AvatarDatabase {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    filename: string;

    @Column({
        type: 'bytea',
    })
    data: Buffer;
}