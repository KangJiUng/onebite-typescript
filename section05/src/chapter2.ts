// 선언 합침
interface Person {
  name: string;
}

interface Person {
  name: string;
  age: number;
}

interface Developer extends Person {
  name: "hello";
}

const person: Person = {
  name: "",
  age: 23,
};

// 모듈 보강
interface Lib {
  a: number;
  b: number;
}

interface Lib {
  c: number;
}

const lib: Lib = {
  a: 1,
  b: 2,
  c: 4,
};
