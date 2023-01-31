import { database } from "./database.entity";
import { users } from "./users.entity";

const entities = [database, users];
//const entities = [users,];

export {database};
export {users};
export default entities;