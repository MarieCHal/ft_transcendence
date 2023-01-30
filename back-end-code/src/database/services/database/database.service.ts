import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDatabaseDto } from 'src/database/dto/database.dto';
import { database } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DatabaseService {
    constructor(
        @InjectRepository(database) private readonly databaseRepository: Repository<database>,
    ) {}

    createUser(CreateDatabaseDto: CreateDatabaseDto) {
        const newDatabase = this.databaseRepository.create(CreateDatabaseDto);
        return this.databaseRepository.save(newDatabase);
    }

    findUserByName(name: string) {
        return this.databaseRepository.find()
    }
}
