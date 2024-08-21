import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

// JWT 전략 생성
// ==> 전략이란? README 참고
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    // 생성자에서 환경 변수를 주입받아 사용
  constructor(private configService: ConfigService) {
    super({
        // 토큰을 추출하는 방법을 지정
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        // 토큰의 만료 여부를 검사할지 여부
        ignoreExpiration: false,
        // JWT 암호화에 사용되는 비밀키
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}