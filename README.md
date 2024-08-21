# NestJS REST API

이 프로젝트는 NestJS를 사용한 RESTful API 구현 예제입니다. 기본적인 CRUD 작업, 인증, 관계형 데이터 모델링 등 실제 프로젝트에서 자주 사용되는 기능들을 포함하고 있습니다.

## 기술 스택

- NestJS
- TypeScript
- MySQL
- TypeORM
- Passport JWT

## 프로젝트 구조

```
src/
├── auth/
│   ├── dto/
│   ├── entities/
│   ├── interfaces/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   └── jwt.strategy.ts
├── users/
│   ├── dto/
│   ├── entities/
│   ├── interfaces/
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── posts/
│   ├── dto/
│   ├── entities/
│   ├── interfaces/
│   ├── posts.controller.ts
│   ├── posts.service.ts
│   └── posts.module.ts
├── comments/
│   ├── dto/
│   ├── entities/
│   ├── interfaces/
│   ├── comments.controller.ts
│   ├── comments.service.ts
│   └── comments.module.ts
├── common/
│   ├── decorators/
│   ├── filters/
│   ├── guards/
│   └── interceptors/
├── config/
│   └── database.config.ts
├── app.module.ts
└── main.ts
```


## 주요 기능

1. 인증 (Auth)
   - 회원가입
   - 로그인 (JWT 토큰 발급)
   - 회원탈퇴

2. 사용자 관리 (Users)
   - 사용자 정보 조회/수정

3. 게시물 (Posts)
   - 게시물 작성
   - 게시물 수정
   - 게시물 조회 (목록 및 상세)
   - 게시물 삭제 (Soft Delete)

4. 댓글 (Comments)
   - 댓글 작성
   - 댓글 수정
   - 댓글 조회
   - 댓글 삭제 (Soft Delete)
   - 대댓글 기능

## API 엔드포인트

### Auth
- POST /auth/register: 회원가입
- POST /auth/login: 로그인
- DELETE /auth/withdraw: 회원탈퇴

### Users
- GET /users/me: 현재 사용자 정보 조회
- PATCH /users/me: 현재 사용자 정보 수정

### Posts
- POST /posts: 게시물 작성
- GET /posts: 게시물 목록 조회
- GET /posts/:id: 게시물 상세 조회
- PATCH /posts/:id: 게시물 수정
- DELETE /posts/:id: 게시물 삭제

### Comments
- POST /posts/:postId/comments: 댓글 작성
- GET /posts/:postId/comments: 댓글 목록 조회
- PATCH /comments/:id: 댓글 수정
- DELETE /comments/:id: 댓글 삭제
- POST /comments/:parentId/replies: 대댓글 작성

## 데이터 모델

1. User
   - id: number
   - email: string
   - password: string
   - name: string
   - createdAt: Date
   - updatedAt: Date

2. Post
   - id: number
   - title: string
   - content: string
   - author: User
   - comments: Comment[]
   - createdAt: Date
   - updatedAt: Date
   - deletedAt: Date

3. Comment
   - id: number
   - content: string
   - author: User
   - post: Post
   - parent: Comment
   - replies: Comment[]
   - createdAt: Date
   - updatedAt: Date
   - deletedAt: Date

## 주요 구현 포인트

1. JWT를 이용한 인증 구현
2. TypeORM을 사용한 데이터베이스 연동
3. DTO를 이용한 데이터 유효성 검사
4. 커스텀 데코레이터를 이용한 사용자 정보 주입
5. 글로벌 예외 필터를 통한 에러 처리
6. 인터셉터를 이용한 응답 데이터 형식 통일
7. 가드를 이용한 인증된 사용자 접근 제어
8. Soft Delete 구현
9. 페이지네이션 구현

## 설치 및 실행 방법

1. 저장소 클론
   ```
   git clone <repository-url>
   ```

2. 의존성 설치
   ```
   npm install
   ```

3. 환경 변수 설정
   `.env` 파일을 생성하고 필요한 환경 변수 설정 (데이터베이스 연결 정보 등)
   ```
   `.env.example` 파일을 참고하여 `.env` 파일 생성해 주세요
   ```

4. 애플리케이션 실행
   ```
   npm run start:dev
   ```

