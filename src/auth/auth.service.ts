import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  // 회원가입
  async register(registerDto: RegisterDto) {
    const { email, password, name } = registerDto;
    // 이미 가입한 이메일인지 확인(중복성 검사)
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('이미 가입한 이메일입니다.');
    }
    // 비밀번호를 해싱하여 저장
    const hashedPassword = await bcrypt.hash(password, 10);
    // 사용자 생성
    const user = await this.usersService.create({
      email,
      password: hashedPassword,
      name,
    });
    // 회원가입 완료 메시지 반환
    return { message: '회원가입이 완료되었습니다.', userId: user.id };
  }

  // 로그인
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    // 사용자가 존재하는지 확인(존재하지 않으면 예외 발생)
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
    // 비밀번호가 일치하는지 확인
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
    // JWT 토큰 생성(디지털 신분증)
    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    await this.usersService.setRefreshToken(user.id, refreshToken);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  // 리프레쉬 토큰 생성
  async refreshToken(userId: number, refreshToken: string) {
    // 리프레쉬 토큰이 유효한지 확인
    const user = await this.usersService.getUserProfile(userId);
    if (!user || user.refreshToken !== refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    // 액세스 토큰 생성
    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    return {
      access_token: accessToken,
    };
  }
}