import { createParamDecorator, ExecutionContext } from '@nestjs/common';


// 사용자 정보를 추출하는 데코레이터
// ==> user_id, email, username 등 사용자 정보
export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    // 요청 객체를 가져옵니다.
    const request = ctx.switchToHttp().getRequest();
    // 요청 객체에서 사용자 정보를 가져옵니다.
    return request.user;
  },
);