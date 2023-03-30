import { Friends } from "./Friends.entity";
import { User } from "./Users.entity";
import { Chat } from "./Chat.entity";
import { Message } from "./Message.entity";
import { Stats } from "./Stats.entity";
import { Mute } from "./Mute.entity";
import { MatchHistory } from "./MatchHistory.entity";

const entities = [User, Friends, Chat, Message, Stats, Mute, MatchHistory];


export {User, Friends, Chat, Message, Stats, Mute, MatchHistory};
export default entities;