import "reflect-metadata"
import { DataSource } from "typeorm"
import { Friends } from "./entity/Friends"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "mchalard",
    password: "mchalard",
    database: "back",
    synchronize: true,
    logging: false,
    entities: [User, Friends],
    migrations: [],
    subscribers: [],
})
