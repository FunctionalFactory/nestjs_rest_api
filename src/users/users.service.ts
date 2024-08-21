import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { IUserCreate, IUserProfile } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // 자주사용하는 혹은 재사용하는 함수는 따로 위치시키기!!!
  // 사용자 프로필 조회
  async getUserProfile(userId: number): Promise<IUserProfile> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    return this.mapUserToProfile(user);
  }

  // 사용자 정보를 프로필 형식으로 변환
  private mapUserToProfile(user: User): IUserProfile {
    const { id, email, name, createdAt, updatedAt, refreshToken } = user;
    return { id, email, name, createdAt, updatedAt, refreshToken };
  }

  // 이메일로 사용자 찾기
  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  // 리프레쉬 토큰 저장
  async setRefreshToken(userId: number, refreshToken: string): Promise<void> {
    await this.usersRepository.update(userId, { refreshToken });
  }

  // 사용자 생성
  async create(userData: IUserCreate): Promise<IUserProfile> {
    const { email, password, name } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      email,
      password: hashedPassword,
      name,
    });
    const savedUser = await this.usersRepository.save(user);
    return this.mapUserToProfile(savedUser);
  }

  // 사용자 탈퇴
  async delete(userId: number, password: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    await this.usersRepository.softDelete(userId);
  }
}