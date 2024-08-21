import { Body, Controller, Delete, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from './entities/user.entity';
import { GetUser } from '../common/decorators/get-user.decorator';
import { deleteDto } from './dto/user-delete.dto';
// 사용자 컨트롤러
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 사용자 프로필 조회
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@GetUser() user: User) {
    return this.usersService.getUserProfile(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('withdraw')
  async withdraw(@GetUser() user: User, @Body() deleteDto: deleteDto) {
    await this.usersService.delete(user.id, deleteDto.password);
    return { message: '회원 탈퇴가 완료되었습니다.' };
  }
}