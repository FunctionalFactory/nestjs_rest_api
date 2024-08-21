import { IsEmail, IsString } from 'class-validator';

// 로그인 요청을 처리하기 위한 DTO 클래스
export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}