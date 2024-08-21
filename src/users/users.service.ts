import { Injectable } from '@nestjs/common';
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
    const { id, email, name, createdAt, updatedAt } = user;
    return { id, email, name, createdAt, updatedAt };
  }

  // 이메일로 사용자 찾기
  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
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


}