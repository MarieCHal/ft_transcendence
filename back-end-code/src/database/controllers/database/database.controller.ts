import { 
    Body,
Controller,
Get,
Param,
ParseArrayPipe,
ParseIntPipe,
Post,
UsePipes,
ValidationPipe,
} from '@nestjs/common';
import { CreateDatabaseDto } from 'src/database/dto/database.dto';
import { DatabaseService } from 'src/database/services/database/database.service';

@Controller('database')
export class DatabaseController {
    constructor(private readonly databaseService: DatabaseService) {}

    @Get('name/:name')
    findUserById(@Param('name', ParseArrayPipe) name: string) {
        return this.databaseService.findUserByName(name);
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createUser(@Body() createDatabaseDto: CreateDatabaseDto) {
        return this.databaseService.createUser(createDatabaseDto);
    }
}
