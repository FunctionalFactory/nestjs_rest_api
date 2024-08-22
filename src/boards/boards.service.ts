import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import { ICreateBoard, IUpdateBoard } from './interfaces/board.interface';


@Injectable()
export class BoardsService {

    constructor(
        @InjectRepository(Board)
        private boardsRepository: Repository<Board>
    ){}

    async findAll(): Promise<Board[]> {
        return this.boardsRepository.find();
    }

    async findOne(id: number): Promise<Board> {
        return this.boardsRepository.findOne({ where: { id } });
    }

    async create(createBoard: ICreateBoard): Promise<Board> {
        const board = this.boardsRepository.create(createBoard);
        return this.boardsRepository.save(board);
    }

    async update(id: number, updateBoard: IUpdateBoard): Promise<Board> {
        const board = await this.boardsRepository.findOne({ where: { id } });
        if (!board) {
          throw new NotFoundException(`해당 게시물을 찾을 수 없습니다.`);
        }
        Object.assign(board, updateBoard);
        return this.boardsRepository.save(board);
      }

    async delete(id: number): Promise<void> {
        await this.boardsRepository.softDelete(id);
    }
}
