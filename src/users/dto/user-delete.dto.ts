import { IsString } from 'class-validator';

export class deleteDto {
  @IsString()
  password: string;
}