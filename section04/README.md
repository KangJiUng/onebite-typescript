## 섹션 4: 함수와 타입

- 함수의 타입을 정의하는 방법

```tsx
function func(a: number, b: number) {
  return a + b;
}

const add = (a: number, b: number) => a + b;
```

- 매개변수 기본값 설정하기

```tsx
function introduce(name = "홍길동") {
	console.log(`name : ${name}`);
}
```

- 선택적 매개변수 설정하기
    - 선택적 매개변수의 타입은 자동으로 undefined와 유니온 타입으로 추론
        - tall의 타입은 현재 number | undefined → 이 값이 number 타입의 값일 거라고 기대하고 사용하려면 다음과 같이 타입 좁히기가 필요
    - 선택적 매개변수는 필수 매개변수 앞에 올 수 없음에 주의

```tsx
function introduce(name = "홍길동", tall?: number) {
  console.log(`name : ${name}`);
  if (typeof tall === "number") {
    console.log(`tall : ${tall + 10}`);
  }
}

introduce("홍길동", 156);

introduce("홍길동");
```

- 나머지 매개변수

```tsx
function getSum(...rest: number[]) {
  let sum = 0;
  rest.forEach((it) => (sum += it));
  return sum;
}
```

- 함수 타입 표현식(Function Type Expression)
    - 함수 타입을 타입 별칭과 함께 별도로 정의할 수 있음 → 함수 선언 및 구현 코드와 타입 선언을 분리할 수 있어 유용
    
    ```tsx
    type Add = (a: number, b: number) => number;
    
    const add: Add = (a, b) => a + b;
    
    -----
    
    type Operation = (a: number, b: number) => number;
    
    const add1: Operation = (a, b) => a + b;
    const sub: Operation = (a, b) => a - b;
    const multiply: Operation = (a, b) => a * b;
    const divide: Operation = (a, b) => a / b;
    ```
    

- 호출 시그니처((Call Signature)
    - 함수 타입 표현식과 동일하게 함수의 타입을 별도로 정의하는 방식
    
    ```tsx
    type Operation2 = {
      (a: number, b: number): number;
    };
    
    const add2: Operation2 = (a, b) => a + b;
    const sub2: Operation2 = (a, b) => a - b;
    const multiply2: Operation2 = (a, b) => a * b;
    const divide2: Operation2 = (a, b) => a / b;
    ```
    
    - 이때 다음과 같이 호출 시그니쳐 아래에 프로퍼티를 추가 정의하는 것도 가능
        - 함수이자 일반 객체를 의미하는 타입으로 정의되며 이를 하이브리드 타입이라고 부름
    
    ```tsx
    type Operation2 = {
      (a: number, b: number): number;
      name: string;
    };
    
    const add2: Operation2 = (a, b) => a + b;
    (...)
    
    add2(1, 2);
    add2.name;
    ```
    

- 함수 타입의 호환성
    - 특정 함수 타입을 다른 함수 타입으로 취급해도 괜찮은지 판단하는 것
    - 다음 2가지 기준으로 함수 타입의 호환성을 판단
        - 두 함수의 반환값 타입이 호환되는가?
        - 두 함수의 매개변수의 타입이 호환되는가?

- 기준 1. 반환값 타입이 호환되는가?
    - A와 B 함수 타입이 있다고 가정할 때 A 반환값 타입이 B 반환값 타입의 슈퍼타입이라면 두 타입은 호환
    
    ```tsx
    type A = () => number;
    type B = () => 10;
    
    let a: A = () => 10;
    let b: B = () => 10;
    
    a = b; // ✅
    b = a; // ❌
    ```
    

- 기준 2. 매개변수의 타입이 호환되는가?
    - 2-1. 매개변수의 개수가 같을 때
        - 두 함수 타입 C와 D가 있다고 가정할 때 두 타입의 매개변수의 개수가 같다면 C 매개변수의 타입이 D 매개변수 타입의 서브 타입일 때에 호환
        
        ```tsx
        type C = (value: number) => void;
        type D = (value: 10) => void;
        
        let c: C = (value) => {};
        let d: D = (value) => {};
        
        c = d; // ❌, 업캐스팅
        d = c; // ✅, 다운캐스팅
        ```
        
        - 반환값 타입의 경우는 업캐스팅 허용, 다운캐스팅 비허용인데 왜 여기선 반대? → 두 함수의 매개변수의 타입이 모두 객체 타입일때 좀 더 잘 이해 가능
            - dogFunc의 매개변수 타입이 animalFunc 매개변수 타입보다 작은 서브타입이기 때문에 animalFunc에 dogFunc를 할당하는 것은 불가능, 반대는 가능
        
        ```tsx
        type Animal = {
          name: string;
        };
        
        type Dog = {
          name: string;
          color: string;
        };
        
        let animalFunc = (animal: Animal) => {
          console.log(animal.name);
        };
        
        let dogFunc = (dog: Dog) => {
          console.log(dog.name);
          console.log(dog.color);
        };
        
        animalFunc = dogFunc; // ❌
        dogFunc = animalFunc; // ✅
        
        // animalFunc = dogFunc;를 코드로 표현
        let animalFunc = (animal: Animal) => {
          console.log(animal.name);  // ✅
          console.log(animal.color); // ❌
        };
        
        // dogFunc = animalFunc;를 코드로 표현
        let dogFunc = (dog: Dog) => {
          console.log(dog.name);
        };
        ```
        
    - 2-2. 매개변수의 개수가 다를 때
        - 할당받는 쪽이 서브타입일 때만 가능
        
        ```tsx
        type Func1 = (a: number, b: number) => void;
        type Func2 = (a: number) => void;
        
        let func1: Func1 = (a, b) => {};
        let func2: Func2 = (a) => {};
        
        func1 = func2; // ✅
        func2 = func1; // ❌
        ```
        

- 함수 오버로딩
    - 하나의 함수를 매개변수의 개수나 타입에 따라 다르게 동작하도록 만드는 문법
    - 타입스크립트에서 함수 오버로딩을 구현하려면 먼저 버전별 오버로드 시그니처를 만들어 준 뒤 구현 시그니처를 만들어줘야 함
        - 오버로드 시그니처: 구현부 없이 선언부만 만들어둔 함수
        - 구현 시그니처: 실제로 함수가 어떻게 실행될 것인지를 정의하는 부분
    - 구현 시그니쳐의 매개변수 타입은 모든 오버로드 시그니쳐와 호환되도록 만들어야함
    
    ```tsx
    // 버전들 -> 오버로드 시그니쳐
    function func(a: number): void;
    function func(a: number, b: number, c: number): void;
    
    // 실제 구현부 -> 구현 시그니쳐
    function func(a: number, b?: number, c?: number) {
      if (typeof b === "number" && typeof c === "number") {
        console.log(a + b + c);
      } else {
        console.log(a * 20);
      }
    }
    
    func(1);        // ✅ 버전 1 - 오버로드 시그니쳐
    func(1, 2);     // ❌ 
    func(1, 2, 3);  // ✅ 버전 3 - 오버로드 시그니쳐
    ```
    

- 사용자 정의 타입 가드
    - 참 또는 거짓을 반환하는 함수를 이용해 우리 입맛대로 타입 가드를 만들 수 있도록 도와주는 타입스크립트의 문법
        - in 연산자를 이용해 타입을 좁히는 방식은 좋지 않음
    - isDog 함수는 매개변수로 받은 값이 Dog 타입이라면 true, 아니라면 false를 반환 → 이때 반환값의 타입으로 `animal is Dog` 를 정의하면 이 함수가 true를 반환하면 조건문 내부에서는 이 값이 Dog 타입임을 보장한다는 의미
    
    ```tsx
    type Dog = {
      name: string;
      isBark: boolean;
    };
    
    type Cat = {
      name: string;
      isScratch: boolean;
    };
    
    type Animal = Dog | Cat;
    
    // Dog 타입인지 확인하는 타입 가드
    function isDog(animal: Animal): animal is Dog {
      return (animal as Dog).isBark !== undefined;
    }
    
    // Cat 타입인지 확인하는 타입가드
    function isCat(animal: Animal): animal is Cat {
      return (animal as Cat).isScratch !== undefined;
    }
    
    function warning(animal: Animal) {
      if (isDog(animal)) {
        console.log(animal.isBark ? "짖습니다" : "안짖어요");
      } else {
        console.log(animal.isScratch ? "할큅니다" : "안할퀴어요");
      }
    }
    ```
