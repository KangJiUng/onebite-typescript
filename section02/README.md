## 섹션 2: 타입스크립트 기본

- 원시타입: 동시에 한 개의 값만 저장할 수 있는 타입
    - number, string, boolean, null, undefined

- type 주석(type annotation)
    - `: 타입`

```tsx
 
let num1**: number** = 123;
  
```

- null 값을 다른 타입의 변수에 할당
    - 자바스크립트에서는 변수에 null을 임시로 넣어 임시값으로 활용하곤 했으나, 타입스크립트에서는 null 타입의 변수가 아닐 경우 오류가 발생함
        - tsconfig.json의 strcitNullChecks(엄격한 null 검사) 옵션을 false로 설정

- 리터럴 타입: 하나의 값만 포함하도록 값 자체로 만들어진 타입

```tsx
let numA: 10 = 10;
let strA: "hello" = "hello";
let boolA: true = true;
let boolB: false = false;
```

- 배열 타입 정의 방법

```tsx
let numArr: number[] = [1, 2, 3]
let boolArr: Array<boolean> = [true, false, true]; // 제네릭
let multiArr: (number | string)[] = [1, "hello"];
let doubleArr : number[][] = [
  [1, 2, 3], 
  [4, 5],
];
```

- 튜플 타입 정의 방법
    - 자바스크립트에는 없는 타입스크립트의 특수한 타입으로 길이와 타입, 순서가 고정된 배열을 의미
    - 배열 메서드인 push나 pop을 이용해 고정된 길이를 무시하고 요소를 추가하거나 삭제할 수 있으나, 사용시엔 각별히 주의가 필요
    
    ```tsx
    let tup1: [number, number] = [1, 2];
    let tup2: [number, string, boolean] = [1, "hello", true];
    ```
    

- 튜플을 사용하는 이유?
    - 다음과 같이 순서를 잘못 배치해 요소를 추가할 때 자바스크립트의 경우 오류가 발생하지 않아 문제가 될 수 있지만, 타입스크립트에서는 튜플을 사용하여 오류를 발생시킬 수 있음
        
        ```tsx
        const users: [string, number][] = [
          ["이정환", 1],
          ["이아무개", 2],
          ["김아무개", 3],
          ["박아무개", 4],
          [5, "조아무개"], // 오류 발생
        ];
        ```
        

- 객체 타입 정의 방법
    - 원시타입처럼 `: object` 을 사용하여 정의하면 `user.id` 처럼 점 표기법으로 객체의 특정 프로퍼티에 접근하려고 하면 오류가 발생 → 타입스크립트의 object 타입은 단순 값이 객체임을 표현하는 것 외에는 아무런 정보도 제공하지 않는 타입이기 때문(객체 프로퍼티에 대한 정보를 전혀 가지고 있지 않은 것)
    - 선택적 프로퍼티(Optional Property): 프로퍼티의 이름 뒤에 ? 를 붙여주면 됨
    - 읽기전용 프로퍼티(Readonly Property): 해당 프로퍼티가 다른 곳에서 수정될 수 없도록 읽기 전용으로 설정
        
        ```tsx
        let user: { ?id: number; readonly name: string; } = {
          id: 1,
          name: "이정환",
        };
        
        user.id;
        ```
        

- 타입 별칭(Type Alias) 사용하기
    - 타입을 별도로 정의하여 타입 정의 중복을 줄이고 재사용
    - 동일한 스코프에 동일한 이름의 타입 별칭을 선언하는 것은 불가능
    
    ```tsx
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
      bio: "안녕하세요",
      location: "청주",
    };
    ```
    

- 인덱스 시그니처(Index Signature): 객체 타입을 유연하게 정의할 수 있도록 돕는 특수한 문법
    - 반드시 포함해야 하는 프로퍼티가 있다면 직접 명시해도 되지만, 인덱스 시그니처의 value 타입과 직접 추가한 프로퍼티의 value 타입이 호환되거나 일치해야함에 주의
        
        ```tsx
        type CountryCodes = {
          [key: string]: string;
          Korea: number;
        };
        
        let countryCodes: CountryCodes = {
          Korea: "ko",
          UnitedState: "us",
          UnitedKingdom: "uk",
          // (... 약 100개의 국가)
          Brazil : 'bz'
        };
        ```
        

- 열거형(Enum) 타입 정의 방법
    - enum 멤버에 숫자 값을 직접 할당하지 않아도 0 부터 1씩 늘어나는 값으로 자동으로 할당
        - 시작값을 변경하고 싶다면 다음 코드와 같이 하면 됨
    - enum의 멤버에는 숫자 말고도 문자열 값도 할당 가능
    - enum은 컴파일될 때 다른 타입들 처럼 사라지지 않고 자바스크립트 객체로 변환되기 때문에 값으로 사용할 수 있는 것
    
    ```tsx
    enum Role {
      ADMIN = 10, // 10 할당 
      USER,       // 11 할당(자동)
      GUEST,      // 12 할당(자동)
    }
    
    enum Language {
      korean = "ko",
      english = "en",
    }
    
    const user1 = {
      name: "이정환",
      role: Role.ADMIN, // 10
      language: Language.korean, // "ko"
    };
    
    const user2 = {
      name: "홍길동",
      role: Role.USER, // 11
    };
    
    const user3 = {
      name: "아무개",
      role: Role.GUEST, // 12
    };
    ```
