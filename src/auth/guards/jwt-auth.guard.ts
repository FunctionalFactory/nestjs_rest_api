import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// AuthGuard를 상속받아 사용
export class JwtAuthGuard extends AuthGuard('jwt') {}

// 이 클래스는 인증이 필요한 요청이 들어올 때마다 실행되는 가드입니다.
// 이 가드는 'jwt' 전략을 사용하여 인증을 수행합니다.
// 이 가드는 인증이 성공하면 요청을 처리하고, 인증이 실패하면 오류를 반환합니다.