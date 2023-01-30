import { Module } from '@nestjs/common';
import { DatabaseController } from './controllers/database/database.controller';
import { DatabaseService } from './services/database/database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { database } from 'src/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([database]),],
  controllers: [DatabaseController],
  providers: [DatabaseService]
})
export class DatabaseModule {}
