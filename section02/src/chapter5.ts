// enum 타입
// 여러가지 값들에 각각 이름을 부여해 열거해두고 사용하는 타입
// enum은 컴파일해도 사라지지 않음
enum Role {
  ADMIN = 10, // 이후 숫자 자동 할당(숫자형 enum)
  USER,
  GEUST,
}

enum Lauguage {
  Korean = "ko",
  English = "en",
}

const user1 = {
  name: "홍길동",
  role: Role.ADMIN,
  language: Lauguage.Korean,
};
const user2 = {
  name: "아무개",
  role: Role.USER,
  language: Lauguage.English,
};
const user3 = {
  name: "강지웅",
  role: Role.GEUST,
  language: Lauguage.English,
};
