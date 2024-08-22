import { IsNotEmpty, IsString, IsOptional } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardDto } from './create-board.dto';
import { IUpdateBoard } from "../interfaces/board.interface";

export class UpdateBoardDto extends PartialType(CreateBoardDto) implements IUpdateBoard {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  content?: string;
}