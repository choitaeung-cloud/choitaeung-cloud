🧭 RESTful API란?
1. REST의 기본 개념

REST는 Representational State Transfer의 약자입니다.
쉽게 말해서, 웹에서 자원을 다루는 규칙 같은 개념입니다.

예를 들어, 우리가 인터넷에서 “게시글”이라는 자원을 다룬다고 하면,
이걸 서버와 클라이언트가 같은 방식으로 요청하고 응답하도록 만든 약속이 REST입니다.

즉, REST는 **“웹에서 데이터를 주고받는 표준적인 방법”**이라고 생각하면 됩니다.

2. RESTful API란?

RESTful API는 위의 REST 원칙을 잘 지킨 API를 뜻합니다.
API는 “Application Programming Interface”의 약자로,
프로그램끼리 데이터를 주고받을 수 있도록 연결해 주는 통로 같은 존재입니다.

그래서 RESTful API는

“규칙적으로 데이터를 주고받는 문”
이라고 이해할 수 있습니다.

3. RESTful API의 구성 요소

RESTful API에서는 크게 아래 다섯 가지를 중요하게 봅니다.

구성 요소	설명
자원(Resource)	서버가 가지고 있는 데이터 (예: 게시글, 사용자, 댓글 등)
메서드(Method)	자원을 어떻게 다룰지 정하는 행동
엔드포인트(Endpoint)	서버의 주소(URL)
표현(Representation)	데이터를 주고받는 형식 (보통 JSON)
상태 코드(Status Code)	요청이 성공했는지 실패했는지 알려주는 코드
4. HTTP 메서드 (가장 중요 ⭐)

RESTful API에서는 아래 메서드들을 사용합니다.

메서드	의미	예시 (게시글 기준)
GET	데이터 조회	/posts → 게시글 목록 보기
POST	데이터 생성	/posts → 새 게시글 작성
PUT	데이터 전체 수정	/posts/1 → 1번 글 전체 수정
PATCH	데이터 일부 수정	/posts/1 → 1번 글 제목만 수정
DELETE	데이터 삭제	/posts/1 → 1번 글 삭제
5. RESTful한 URL의 예시

RESTful API에서는 URL(주소)을 깔끔하게 설계하는 게 중요합니다.

✅ 좋은 예시

GET    /posts
GET    /posts/1
POST   /posts
PATCH  /posts/1
DELETE /posts/1


❌ 나쁜 예시

GET    /getAllPosts
POST   /createPost
DELETE /deletePostById


RESTful한 URL은 “동사”가 아니라 “명사” 중심으로 되어 있습니다.
이유는 “무엇을 할지(Method) 이미 HTTP 메서드로 표현했기 때문”입니다.

6. 응답(Response) 예시
{
  "id": 1,
  "title": "RESTful API 배우기",
  "content": "처음엔 어렵지만 금방 익숙해진다!",
  "createdAt": "2025-10-26T12:00:00Z"
}


이런 식으로 서버가 JSON 형태로 응답을 보내줍니다.

7. RESTful API의 장점

📦 일관성 있음: URL과 메서드 구조가 통일되어 있어서 이해하기 쉽다.

⚡ 확장성 높음: 클라이언트나 서버가 따로 발전해도 문제 없다.

🧩 재사용 쉬움: 여러 프로젝트에서 같은 방식으로 API를 호출할 수 있다.

8. 실제 사용 예시 (간단한 흐름)

클라이언트(프론트엔드)가 POST /posts로 새 글 작성 요청을 보냄

서버(NestJS, Express 등)가 DB에 글을 저장

클라이언트가 GET /posts 요청 → 새로 등록된 글 목록을 받음

PATCH /posts/:id로 글 수정, DELETE /posts/:id로 글 삭제 가능

이런 일련의 동작이 모두 RESTful API의 흐름입니다.

🧠 마무리 정리

REST는 “데이터를 다루는 규칙”

RESTful API는 “그 규칙을 잘 지킨 데이터 통신 방법”

HTTP 메서드(GET, POST, PUT, DELETE 등)로 자원을 조작

주소는 명사형으로, 응답은 보통 JSON

실제 서비스(게시판, 쇼핑몰, SNS 등)에서 거의 다 이 방식을 사용함