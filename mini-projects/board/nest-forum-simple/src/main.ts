// src/main.ts (수정)
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  // NestExpressApplication 타입으로 앱을 생성해야 템플릿 엔진 설정을 할 수 있어요.
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 템플릿 엔진(hbs) 설정
  app.useStaticAssets(join(__dirname, '..', 'public')); // CSS/JS 파일 경로 설정 (없어도 되지만 나중에 대비)
  app.setBaseViewsDir(join(__dirname, '..', 'views')); // 뷰 파일(hbs)들이 있는 폴더 지정
  app.setViewEngine('hbs'); // 템플릿 엔진으로 hbs 사용 지정

  // .env에서 포트 번호를 가져와서 서버를 엽니다.
  await app.listen(process.env.PORT || 3000);
  console.log(`Server is running on: ${await app.getUrl()}`);
}
bootstrap();