## 섹션 3: 타입스크립트 이해하기

- 타입은 집합이다
    - 타입스크립트의 모든 타입들은 집합으로서 서로를 포함하고 또 포함되는 관계를 갖는다
    <img width="185" height="247" alt="스크린샷 2025-11-28 오후 6 13 46" src="https://github.com/user-attachments/assets/27f62ba9-d2a7-4af3-b809-71381ac6fd38" />


- 타입 호환성
    - A와 B 두 개의 타입이 존재할 때 A 타입의 값을 B 타입으로 취급해도 괜찮은지 판단하는 것
        <img width="484" height="270" alt="스크린샷 2025-11-28 오후 6 11 30" src="https://github.com/user-attachments/assets/2204c7af-0b56-4456-9072-0c7476288247" />

        
    - 업캐스팅: 서브 타입의 값을 슈퍼 타입의 값으로 취급하는 것(↔다운캐스팅)
        - 업캐스팅은 모든 상황에 가능하지만 다운 캐스팅은 대부분의 상황에 불가능
          
         <img width="438" height="248" alt="스크린샷 2025-11-28 오후 6 11 44" src="https://github.com/user-attachments/assets/35018ab1-43f2-402c-b70a-be196fdb1e7f" />
            
<img width="1913" height="663" alt="image" src="https://github.com/user-attachments/assets/fa7272b5-186a-4e13-8140-452a0bba73e0" />


- unknown 타입(전체 집합)
    - unknown 타입은 타입 계층도의 **최상단**에 위치 → unknown 타입 변수에는 모든 타입의 값을 할당할 수 있음(모든 타입은 unknown 타입으로 업 캐스트 할 수 있음)
    - unknown 타입은 모든 타입을 부분집합으로 갖는 타입스크립트 전체 집합
- never 타입 (공집합 타입)
    - never 타입은 타입 계층도에서 **가장 아래**에 위치 →  never는 공집합을 뜻하는 타입, 공집합은 모든 집합의 부분 집합이므로 never 타입은 모든 타입의 서브 타입. 따라서 never 타입은 모든 타입으로 업캐스팅 가능 반면 그 어떤 타입도 never 타입으로 다운 캐스팅 할 수 없음
- void 타입
    - void 타입은 undefined 타입의 슈퍼타입 → 반환값을 void로 선언한 함수에서 undefined을 반환 해도 오류가 발생하지 않음
    - void 타입의 서브타입은 undefined 타입과 never 타입밖에 없음. 따라서 void 타입에는 undefined, never 이외에 다른 타입의 값을 할당할 수 없음
- any 타입 (치트키)
    - any는 뭐든지 예외 → 모든 타입의 슈퍼타입이 될 수도 있고 모든 타입의 서브 타입이 될 수도 있음
    - never 타입은 예외임에 주의

- 객체타입 간의 호환성
    - 앞서 본 타입 호환성과 동일한 기준으로 판단 → 모든 객체 타입은 각각 다른 객체 타입들과 슈퍼-서브 타입 관계를 갖기 때문에 업 캐스팅은 허용하고 다운 캐스팅은 허용하지 않음
    - 타입스크립트는 프로퍼티를 기준으로 타입을 정의하는 구조적 타입 시스템을 따른다 → 타입이 더 적은 쪽이 슈퍼타입(부모타입)이 됨
    
    ```tsx
    // 구조적 타입 시스템 -> name, color만 있으면 다 Animal 타입으로 인정
    // -> 타입이 더 적은 쪽이 슈퍼타입(부모타입)이 됨
    // Animal 타입은 name과 color 프로퍼티를 갖는 모든 객체들을 포함하는 집합
    // Dog 타입은 name과 color 거기에다 추가로 breed 프로퍼티를 갖는 모든 객체를 포함하는 집합
    // -> 어떤 객체가 Dog 타입에 포함된다면 무조건 Animal 타입에도 포함
    type Animal = {
      name: string;
      color: string;
    };
    
    type Dog = {
      name: string;
      color: string;
      breed: string;
    };
    ```
    

- 초과 프로퍼티 검사
    - 변수를 객체 리터럴로 초기화 할 때 발동하는 타입스크립트의 특수한 기능
        - 함수의 매개변수에도 동일하게 발생
    - 타입에 정의된 프로퍼티 외의 다른 초과된 프로퍼티를 갖는 객체를 변수에 할당할 수 없도록 막는 기능
    - 단순히 변수를 초기화 할 때 객체 리터럴을 사용하지만 않으면 발생하지 않음. 따라서 다음과 같이 값을 별도의 다른 변수에 보관한 다음 변수 값을 초기화 값으로 사용하면 됨
        - 함수 역시 검사를 피하고 싶다면 변수에 미리 값을 담아둔 다음 변수값을 인수로 전달하면 됨
    
    ```tsx
    type Book = {
      name: string;
      price: number;
    };
    
    type ProgrammingBook = {
      name: string;
      price: number;
      skill: string;
    };
    
    (...)
    
    let book2: Book = {
      name: "한 입 크기로 잘라먹는 리액트",
      price: 33000,
      skill: "reactjs", // 오류 발생
    };
    
    (...)
    
    let book3: Book = programmingBook; // 앞서 만들어둔 변수
    ```
    

- 대수 타입(Algebraic type)
    - 여러 개의 타입을 합성해서 만드는 타입
    - 합집합 타입(Union 타입), 교집합 타입(Intersection 타입)이 존재

- 합집합(Union) 타입
    - 유니온 타입에 참여하는 타입들의 개수에는 제한이 없음
    
    ```tsx
    // 합집합 타입 - Union 타입
    let a: string | number | boolean;
    
    a = 1;
    a = "hello";
    a = true;
    
    // 다양한 타입의 요소를 보관하는 배열 타입을 손쉽게 정의
    let arr: (number | string | boolean)[] = [1, "hello", true];
    
    // 여러 개의 객체 타입의 유니온 타입도 얼마든지 정의 가능
    type Dog = {
      name: string;
      color: string;
    };
    
    type Person = {
      name: string;
      language: string;
    };
    
    type Union1 = Dog | Person;
    ```
    
- 교집합(Intersection) 타입
    - number 타입과 string 타입은 서로 교집합을 공유하지 않는 서로소 집합이므로 변수 variable의 타입은 결국 never 타입으로 추론
        - 대다수의 기본 타입들 간에는 서로 공유하는 교집합이 없기 때문에 이런 인터섹션 타입은 보통 객체 타입들에 자주 사용
        
        ```tsx
        let variable: number & string; 
        // never 타입으로 추론된다
        ```
        
        ```tsx
        type Dog = {
          name: string;
          color: string;
        };
        
        type Person = {
          name: string;
          language: string;
        };
        
        type Intersection = Dog & Person;
        
        let intersection1: Intersection = {
          name: "",
          color: "",
          language: "",
        };
        ```
        <img width="381" height="267" alt="스크린샷 2025-11-28 오후 6 13 26" src="https://github.com/user-attachments/assets/a0f583ce-21a7-43dc-a3a0-1f722eb1bc6c" />

        

- 타입 추론이 가능한 상황들
    
    1) 변수 선언
    
    - 일반적인 변수 선언의 경우 초기값을 기준으로 타입이 잘 추론됨
    
    ```tsx
    let a = 10;
    // number 타입으로 추론
    
    let b = "hello";
    // string 타입으로 추론
    
    let c = {
      id: 1,
      name: "이정환",
      profile: {
        nickname: "winterlood",
      },
      urls: ["https://winterlood.com"],
    };
    // id, name, profile, urls 프로퍼티가 있는 객체 타입으로 추론
    ```
    
    2) 구조 분해 할당
    
    - 객체와 배열을 구조 분해 할당하는 상황에서도 타입이 잘 추론됨
    
    ```tsx
    let { id, name, profile } = c;
    
    let [one, two, three] = [1, "hello", true];
    ```
    
    3) 함수의 반환값
    
    - 함수 반환값의 타입은 return 문을 기준으로 잘 추론됨
    
    ```tsx
    function func() {
      return "hello";
    }
    // 반환값이 string 타입으로 추론된다
    ```
    
    4) 기본값이 설정된 매개변수
    
    ```tsx
    function func(message = "hello") {
      return "hello";
    }
    ```
    

- 주의해야 할 상황들
    
    1) 암시적으로 any 타입으로 추론
    
    - 변수를 선언할때 초기값을 생략하면 암시적인 any 타입으로 추론
        - 매개변수의 타입이 암시적 any로 추론될 때와 달리 일반 변수의 타입이 암시적 any 타입으로 추론되는 상황은 오류로 판단하지 않음
    - 이 변수에 값을 할당하면 그 다음 라인부터 any 타입이 해당 값의 타입으로 변화
    - 암시적으로 추론된 any 타입은 코드의 흐름에 따라 타입이 계속 변화, 이를 any의 진화라고 표현하기도 함
    
    ```tsx
    let d;
    // 암시적인 any 타입으로 추론
    
    d = 10;
    d.toFixed();
    
    d = "hello";
    d.toUpperCase();
    d.toFixed(); // 오류 
    ```
    
    2) const 상수의 추론
    
    - const로 선언된 상수도 타입 추론이 진행되지만 let으로 선언한 변수와는 다른 방식으로 추론됨
        - 상수는 초기화 때 설정한 값을 변경할 수 없기 때문에 특별히 가장 좁은 타입으로 추론
    
    ```tsx
    const num = 10;
    // 10 Number Literal 타입으로 추론
    
    const str = "hello";
    // "hello" String Literal 타입으로 추론
    ```
    

- 최적 공통 타입(Best Common Type)
    - 다양한 타입의 요소를 담은 배열을 변수의 초기값으로 설정하면, 최적의 공통 타입으로 추론
    
    ```tsx
    let arr = [1, "string"];
    // (string | number)[] 타입으로 추론
    ```
    

- 타입 단언
    - 다음과 같은 코드가 있다고 가정할 때 타입스크립트에서는 이런 경우를 허용하지 않음 → 빈 객체는 Person 타입이 아니므로 오류가 발생
    
    ```tsx
    type Person = {
      name: string;
      age: number;
    };
    
    let person: Person = {};
    person.name = "";
    person.age = 23;
    ```
    
    - 다음과 같이 빈 객체를 Person 타입이라고 타입스크립트에게 단언해주면 됨
        - `값 as 타입` 으로 특정 값을 원하는 타입으로 단언
    
    ```tsx
    let person = {} as Person;
    ```
    

- 타입 단언의 조건
    - `값 as 타입` 형식의 단언식을 `A as B`로 표현했을 때 아래의 두가지 조건중 한가지를 반드시 만족해야 함
        - A가 B의 슈퍼타입이다
        - A가 B의 서브타입이다
        
        ```tsx
        let num1 = 10 as never;   // ✅
        let num2 = 10 as unknown; // ✅
        
        let num3 = 10 as string;  // ❌
        ```
        
    - 타입 단언은 다중으로도 가능하나, 오류가 발생할 확률이 매우 높아지므로 어쩔 수 없이 꼭 필요한 상황에서만 이용할 것을 권장

- const 단언
    - 특정 값을 const 타입으로 단언하면 마치 변수를 const로 선언한 것과 비슷하게 타입이 변경
    
    ```tsx
    let num4 = 10 as const;
    // 10 Number Literal 타입으로 단언됨
    
    let cat = {
      name: "야옹이",
      color: "yellow",
    } as const;
    // 모든 프로퍼티가 readonly를 갖도록 단언됨
    ```
    

- Non Null 단언
    - `값 as 타입` 형태를 따르지 않는 단언
    - 값 뒤에 느낌표(!) 를 붙여주면 이 값이 undefined이거나 null이 아닐것으로 단언할 수 있음
    
    ```tsx
    type Post = {
      title: string;
      author?: string;
    };
    
    let post: Post = {
      title: "게시글1",
    };
    
    const len: number = post.author!.length;
    ```
    

- 타입 좁히기
    - 조건문을 이용해 조건문 내부에서 변수가 특정 타입임을 보장하면 해당 조건문 내부에서는 변수의 타입이 보장된 타입으로 좁혀짐
    
    ```tsx
    function func(value: number | string) {
      if (typeof value === "number") {
        console.log(value.toFixed());
      } else if (typeof value === "string") {
        console.log(value.toUpperCase());
      }
    }
    ```
    
    - if (typeof === …) 처럼 조건문과 함께 사용해 타입을 좁히는 이런 표현들을 “타입 가드”라고 부름

- instanceof 타입가드
    - 내장 클래스 또는 직접 만든 클래스에만 사용이 가능한 연산
    - 직접 만든 타입과 함께 사용할 수 없음

- in 타입 가드
    - 직접 만든 타입과 함께 사용하려면 다음과 같이 in 연산자를 이용
    
    ```tsx
    type Person = {
      name: string;
      age: number;
    };
    
    function func(value: number | string | Date | null | Person) {
      if (typeof value === "number") {
        console.log(value.toFixed());
      } else if (typeof value === "string") {
        console.log(value.toUpperCase());
      } else if (value instanceof Date) {
        console.log(value.getTime());
      } else if (value && "age" in value) {
        console.log(`${value.name}은 ${value.age}살 입니다`)
      }
    }
    ```
    

- 서로소 유니온 타입
    - 교집합이 없는 타입들 즉 서로소 관계에 있는 타입들을 모아 만든 유니온 타입
    - 한 예시로, 다음과 같이 각 타입에 태그 프로퍼티를 추가 정의함으로써 login 함수에서 조건식만 보고 어떤 타입으로 좁혀지는지 바로 파악 가능
    
    ```tsx
    type Admin = {
      tag: "ADMIN";
      name: string;
      kickCount: number;
    };
    
    type Member = {
      tag: "MEMBER";
      name: string;
      point: number;
    };
    
    type Guest = {
      tag: "GUEST";
      name: string;
      visitCount: number;
    };
    
    function login(user: User) {
      switch (user.tag) {
        case "ADMIN": {
          console.log(`${user.name}님 현재까지 ${user.kickCount}명 추방했습니다`);
          break;
        }
        case "MEMBER": {
          console.log(`${user.name}님 현재까지 ${user.point}모았습니다`);
          break;
        }
        case "GUEST": {
          console.log(`${user.name}님 현재까지 ${user.visitCount}번 오셨습니다`);
          break;
        }
      }
    }
    ```
