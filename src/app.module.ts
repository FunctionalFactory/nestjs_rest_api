import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BoardsModule } from './boards/boards.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [UsersModule, AuthModule, BoardsModule, CommentsModule],
  controllers: [

  ],
  providers: [
    
  ],
})
export class AppModule {}
