import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  // UsersModule, PassportModule, JwtModule를 사용할 수 있도록 등록
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
  // AuthService, JwtStrategy를 사용할 수 있도록 등록
  providers: [AuthService, JwtStrategy],
  // AuthController를 사용할 수 있도록 등록
  controllers: [AuthController],
  // AuthService를 사용할 수 있도록 등록
  exports: [AuthService],
})
export class AuthModule {}