// src/app.module.ts (수정)
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module'; // ⭐ PostsModule 추가

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      // 설정 생략
    }),
    PostsModule, // ⭐ PostsModule을 imports에 추가
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}