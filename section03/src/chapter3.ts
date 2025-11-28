// 기본 타입간의 호환성
let num1: number = 10;
let num2: 10 = 10;

num1 = num2;

// 객체 타입간의 호환성
// 어떤 객체타입을 다른 객체타입으로 취급해도 괜찮은가?
// 구조적 타입 시스템 -> name, color만 있으면 다 Animal 타입으로 인정
// -> 타입이 더 적은 쪽이 슈퍼타입(부모타입)이 됨
type Animal = {
  name: string;
  color: string;
};

type Dog = {
  name: string;
  color: string;
  breed: string;
};

let animal: Animal = {
  name: "기린",
  color: "yellow",
};

let dog: Dog = {
  name: "돌돌이",
  color: "brown",
  breed: "진도",
};

// 업캐스팅
animal = dog;

// 다운캐스팅(불가능)
// dog = animal;

type Book = {
  name: string;
  price: number;
};

type ProgrammingBookd = {
  name: string;
  price: number;
  skill: string;
};

let book: Book;
let programmingBook: ProgrammingBookd = {
  name: "한 입 크기로 잘라먹는 타입스크립트",
  price: 33000,
  skill: "typescript",
};

book = programmingBook;
// programmingBook = book

// 초과 프로퍼티 검사
let book2: Book = {
  name: "한 입 크기로 잘라먹는 타입스크립트",
  price: 33000,
  // skill: "typescript",
};

let book3: Book = programmingBook;

function func(book: Book) {}
func({
  name: "한 입 크기로 잘라먹는 타입스크립트",
  price: 33000,
  // skill: "typescript",
});
func(programmingBook);
