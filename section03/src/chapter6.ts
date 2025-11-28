// 타입 단어

type Person = {
  name: string;
  age: number;
};

let person = {} as Person;
person.name = "홍길동";
person.age = 23;

type Dog = {
  name: string;
  color: string;
};

let dog = {
  name: "돌돌이",
  color: "brown",
  breed: "진도",
} as Dog;

// 타입 단언의 규칙
// A as B 에서 A가 B의 슈퍼타입이거나 A가 B의 서브타입이어야함
let num1 = 10 as never;
let num2 = 10 as unknown;

// 다중 단언 -> 추천하지 않는 방식
let num3 = 10 as unknown as string;

// const 단언
let num4 = 10 as const;

// 일일이 readonly 쓰는 대신 사용 가능한 방식
let cat = {
  nmae: "야옹이",
  color: "yellow",
} as const;

// cat.name = "";

// Non Null 단언
type Post = {
  title: string;
  author?: string;
};

let post: Post = {
  title: "게시글1",
  author: "홍길동",
};

const len: number = post.author!.length;
