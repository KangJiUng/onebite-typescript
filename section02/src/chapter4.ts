// 타입 별칭
// 같은 스코프 내에 중복 선언되지 않도록 주의
type User = {
  id: number;
  name: string;
  nickname: string;
  birth: string;
  bio: string;
  location: string;
};

let user: User = {
  id: 1,
  name: "홍길동",
  nickname: "hong",
  birth: "2003-00-00",
  bio: "안녕",
  location: "청주",
};

// 인덱스 시그니처
type CountryCodes = {
  [key: string]: string;
  Korea: string; // 인덱스 시그니처의 value 타입과 일치시켜야 함
};

let countryCodes: CountryCodes = {
  Korea: "ko",
  UnitedState: "us",
  UnitedKingdom: "uk",
};
