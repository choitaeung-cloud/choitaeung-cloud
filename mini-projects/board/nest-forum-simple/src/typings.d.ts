// src/typings.d.ts

// NodeJS.ProcessEnv의 타입을 확장(extend)하여 우리가 사용할 환경 변수들을 명시합니다.
declare namespace NodeJS {
  interface ProcessEnv {
    // .env 파일에 정의한 환경 변수들의 타입을 여기서 정의합니다.
    MONGODB_URI: string; // MongoDB 연결 주소는 문자열(string)입니다.
    PORT: string;        // 포트 번호도 문자열로 받습니다.
  }
}