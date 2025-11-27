// object
// 객체 리터럴 타입
// 구조적 타입 시스템(Property Based System) (<-> 명목적 타입 시스템)
// 선택적 프로퍼리
let user: { id?: number; name: string } = {
  id: 1,
  name: "홍길동",
};

user = {
  name: "아무개",
};

let config: { readonly apiKey: string } = {
  apiKey: "MY API KEY",
};
