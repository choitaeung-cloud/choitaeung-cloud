비동기 처리와 Promise, async/await
1. 비동기 처리의 개념

비동기(Asynchronous) 처리란 하나의 작업이 완료될 때까지 기다리지 않고, 동시에 여러 작업을 처리할 수 있도록 하는 방식이다.
예를 들어 웹사이트에서 이미지를 불러오는 동안 버튼 클릭이나 스크롤 같은 다른 동작이 가능하다면, 그 동작이 바로 비동기 처리이다.

반대로 동기(Synchronous) 방식은 한 작업이 끝나야 다음 작업이 실행되기 때문에, 시간이 오래 걸리는 코드가 있으면 전체 프로그램이 멈춘다.
자바스크립트는 웹 브라우저에서 사용자 반응을 빠르게 처리해야 하기 때문에 기본적으로 비동기 방식이 자주 사용된다.

2. 콜백 함수와 그 한계

비동기 처리를 구현하는 가장 기본적인 방법은 콜백(callback) 함수이다.
콜백 함수는 특정 작업이 끝났을 때 실행되는 함수를 말한다.

예시:

setTimeout(() => {
  console.log("3초 후 실행");
}, 3000);


이 코드는 3초가 지난 뒤에 “3초 후 실행”을 출력한다.
하지만 콜백 함수를 여러 개 중첩해서 사용하면 코드가 복잡해지고 읽기 어려워지는 문제가 생긴다. 이를 콜백 지옥(callback hell) 이라고 부른다.

3. Promise의 등장

Promise는 비동기 처리의 결과를 다루기 위한 객체로, 콜백의 복잡함을 해결하기 위해 만들어졌다.
Promise는 세 가지 상태를 가진다.

대기(pending): 아직 결과를 기다리는 중인 상태

이행(fulfilled): 작업이 성공적으로 끝난 상태

거부(rejected): 작업이 실패한 상태

예시:

const promise = new Promise((resolve, reject) => {
  const success = true;
  if (success) {
    resolve("성공");
  } else {
    reject("실패");
  }
});

promise
  .then((result) => console.log(result))  // 성공 시 실행
  .catch((error) => console.log(error));  // 실패 시 실행


Promise를 사용하면 비동기 작업의 결과를 .then()과 .catch()로 연결해 순서대로 처리할 수 있다.

4. async / await

async와 await는 Promise를 더 간단하게 사용할 수 있도록 도와주는 문법이다.
기존의 .then() 연결 방식보다 코드가 짧고, 동기 처리처럼 읽히기 때문에 가독성이 좋다.

예시:

async function fetchData() {
  try {
    const result = await promiseFunction();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}


async는 해당 함수가 비동기 함수를 의미한다.

await은 Promise의 결과를 기다리는 역할을 한다.
즉, await은 비동기 코드를 동기처럼 순서대로 작성할 수 있게 해준다.

5. 세 가지 방식의 비교
구분	장점	단점
콜백	구조가 단순하고 빠르게 구현 가능	중첩이 깊어지면 코드가 복잡해짐
Promise	콜백보다 구조적이고 예외 처리 가능	.then() 체인이 길어질 수 있음
async/await	동기 코드처럼 읽기 쉬움	await이 많은 경우 처리 속도 저하 가능
6. 결론

비동기 처리는 자바스크립트가 웹 환경에서 끊김 없는 사용자 경험을 제공하기 위해 꼭 필요한 개념이다.
콜백 함수는 기본적인 방법이지만 코드의 복잡성을 초래하고, Promise는 그 단점을 보완했다.
마지막으로 async/await은 Promise를 더욱 직관적으로 표현하여 코드의 가독성을 높였다.
따라서 현대 자바스크립트에서는 비동기 처리를 다룰 때 async/await 문법이 가장 널리 사용되고 있다.