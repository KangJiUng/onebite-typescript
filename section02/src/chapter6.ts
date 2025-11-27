// any
// 특정 변수의 타입을 확실히 모를 때 사용
// 사실상 타입 검사를 안하는 것과 같기 때문에 타입스크립트의 장점이 없어지는 거나 다름 없음
let anyVar: any = 10;
anyVar = "hello";

anyVar = true;
anyVar = {};
anyVar = () => {};

anyVar.toUpperCase();
anyVar.toFixed();

let num: number = 10;
num = anyVar;

// unknown
// 특정 변수의 타입을 확실히 모를 때 사용
// 모든 값을 저장할 순 있지만 반대로는 안됨 -> any 타입보다는 안전
let unknownVar: unknown;
unknownVar = "";
unknownVar = 1;
unknownVar = () => {};

// num = unknownVar; -> 불가능
