## 사용자 관리 (Users)

### 엔드포인트:
- GET /users/me: 현재 로그인한 사용자의 프로필 조회
- DELETE /users/withdraw: 회원 탈퇴

### 주요 기능:
- 사용자 프로필 조회
- 회원 탈퇴 (소프트 삭제)
- 이메일로 사용자 찾기
- 리프레시 토큰 저장

### 엔드포인트:
- POST /auth/register: 회원가입
- POST /auth/login: 로그인
- POST /auth/refresh: 액세스 토큰 갱신

### 주요 기능:
- 회원가입 (이메일 중복 체크, 비밀번호 해싱)
- 로그인 (JWT 토큰 발급: 액세스 토큰, 리프레시 토큰)
- 토큰 갱신 (리프레시 토큰을 이용한 새 액세스 토큰 발급)

### 보안
JWT를 이용한 인증
- 비밀번호 해싱 (bcrypt 사용)
- 가드를 이용한 인증된 사용자만 접근 가능한 엔드포인트 보호
- 데이터베이스
- TypeORM을 사용한 데이터베이스 연동
- User 엔티티: 사용자 정보 저장 (이메일, 비밀번호, 이름, 리프레시 토큰 등)

### 모듈 구조
- UsersModule: 사용자 관련 기능
- AuthModule: 인증 관련 기능

### DTO (Data Transfer Object)
- RegisterDto: 회원가입 요청 데이터 검증
- LoginDto: 로그인 요청 데이터 검증
- DeleteDto: 회원 탈퇴 요청 데이터 검증

### 인터페이스
- IUser, IUserCreate, IUserProfile: 사용자 관련 데이터 구조 정의

### 가드
- JwtAuthGuard: JWT 인증을 위한 가드