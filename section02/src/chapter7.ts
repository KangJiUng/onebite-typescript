// void
// 아무것도 없음을 의미하는 타입
function func1(): string {
  return "hello";
}

// 다른 거 아무것도 안되고 undefined만 반환 가능
function func2(): void {
  console.log("hello");
}

// never
// 불가능한 타입 -> 함수에 반환값이 있는 것 자체가 모순임을 의미
function fun3(): never {
  while (true) {}
}

function fun4(): never {
  throw new Error();
}
