import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        {
            FirstName: "Marie", 
            LastName: "Chalard"
        },
        {
            FirstName: "yolo", 
            LastName: "number two"
        },
    ];

    UserInfo(): User[] {
        return this.users;
    }
}
