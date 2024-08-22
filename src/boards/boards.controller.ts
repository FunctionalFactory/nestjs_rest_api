import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { ICreateBoard, IUpdateBoard } from './interfaces/board.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createBoardDto: ICreateBoard) {
        return this.boardsService.create(createBoardDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param('id') id: number, @Body() updateBoardDto: IUpdateBoard) {
        return this.boardsService.update(id, updateBoardDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.boardsService.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.boardsService.findAll();
    }
    
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.boardsService.findOne(id);
    }
}
