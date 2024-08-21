import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Module({
  // 사용자 모듈 설정
  imports: [TypeOrmModule.forFeature([User])],
  // 사용자 컨트롤러 등록
  controllers: [UsersController],
  // 사용자 서비스 등록
  providers: [UsersService],
  // 사용자 서비스 내보내기
  exports: [UsersService]
})
export class UsersModule {}