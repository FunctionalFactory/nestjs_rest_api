import { IsEmail, IsString, MinLength } from 'class-validator';

// 회원가입 요청을 처리하기 위한 DTO 클래스
export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  name: string;
}