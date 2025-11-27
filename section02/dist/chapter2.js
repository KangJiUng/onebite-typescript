// 배열
let numArr = [1, 2, 3];
let strArr = ["hello", "im", "jiung"];
let boolArr = [true, false, true]; // 제네릭 문법 사용
// 배열에 들어가는 요소들의 타입이 다양할 경우
let multiArr = [1, "hello"]; // 유니온 타입
// 다차원 배열의 타입을 정의하는 방법
let doubleArr = [
    [1, 2, 3],
    [4, 5],
];
// 튜플
// 길이와 타입, 순서가 고정된 배열
// 배열 메서드 사용 시 튜플의 길이 제한 발동 X -> pop이나 push 사용 시 주의
let tup1 = [1, 2];
let tup2 = [1, "2", true];
const users = [
    ["홍길동", 1],
    ["아무개", 2],
    ["김아무개", 3],
    ["최아무개", 4],
    // [5, "박아무개"]
];
export {};
