// 타입 추론

// 타입 넓히기
let a = 10;
let b = "hello";
let c = {
  id: 1,
  name: "홍길동",
  profile: {
    nickname: "홍",
  },
  urls: ["https://abc.com"],
};

let { id, name, profile } = c;

let [one, two, three] = [1, "hello", true];

function func(message = "hello") {
  return "hello";
}

// 암묵적 any 타입 -> 진화
// 명시적 any 타입은 진화 안 함
let d;
d = 10;
d.toFixed();

d = "hello";
d.toUpperCase();

// let과 달리 리터럴 타입으로 추론
const num = 10;
const str = "hello";

let arr = [1, "string"];
