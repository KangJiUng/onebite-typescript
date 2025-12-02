## 섹션 9: 조건부 타입

- 조건부 타입
    - extends와 삼항 연산자를 이용해 조건에 따라 각각 다른 타입을 정의하도록 돕는 문법
    
    ```tsx
    type A = number extends string ? number : string;
    ```
    
    - 위 조건부 타입의 조건식 `number extends string`은 number 타입이 string 타입의 서브타입이 아니기 때문에 거짓이 되고 그 결과 타입 A는 string 타입이 되는 것

- 제네릭 조건부 타입
    - 조건부 타입은 제네릭과 함께 사용할 때 그 위력이 극대화
    
    ```tsx
    // 함수 오버로딩 사용
    function removeSpaces<T>(text: T): T extends string ? string : undefined;
    
    function removeSpaces(text: any) {
      if (typeof text === "string") {
        return text.replaceAll(" ", "");
      } else {
        return undefined;
      }
    }
    
    let result = removeSpaces("hi im winterlood");
    // string
    
    let result2 = removeSpaces(undefined);
    // undefined
    ```
    

- 분산적인 조건부 타입
    - 조건부 타입의 타입 변수에 Union 타입을 할당하면 **분산적인 조건부 타입**으로 조건부 타입이 업그레이드됨
    
    ```tsx
    type StringNumberSwitch<T> = T extends number ? string : number;
    
    (...)
    
    let c: StringNumberSwitch<number | string>;
    // string | number
    
    ```
    
    - 분산적인 조건부 타입은 다음과 같이 동작
    
    ```
    타입 변수에 할당한 Union 타입 내부의 모든 타입이 분리됩니다. 
    따라서 StringNuberSwitch<number | string> 타입은 다음과 같이 분산됩니다.
    
    StringNumberSwitch<number>
    StringNumberSwitch<string>
    
    그리고 다음으로 분산된 각 타입의 결과를 모아 다시 Union 타입으로 묶습니다.
    
    결과 : number | string
    
    ```
    

- Exclude 조건부 타입 구현하기
    - 분산적인 조건부 타입의 특징을 이용하면 매우 다양한 타입을 정의할 수 있음
    
    ```tsx
    type Exclude<T, U> = T extends U ? never : T;
    
    type A = Exclude<number | string | boolean, string>;
    // 1단계
    // Exclude<number, string> |
    // Exclude<string, string> |
    // Exclude<boolean, string>
    
    // 2단계
    // number |
    // never |
    // boolean
    
    // 결과
    // number | boolean
    ```
    

- 유니온 타입이 분산적 조건부 타입으로 처리되는 기본 동작을 막고 싶으면 `extends` 양쪽을 대괄호 `[]`로 감싸면 됨

```tsx
type StringNumberSwitch<T> = [T] extends [number] ? string : number;
```

- infer
    - 조건부 타입 내에서 특정 타입을 추론하는 문법
        - 조건부 타입의 조건식 형태:  `() ⇒ string extends () ⇒ infer R ? R : never`
    
    ```tsx
    type ReturnType<T> = T extends () => infer R ? R : never;
    
    type FuncA = () => string;
    
    type FuncB = () => number;
    
    type A = ReturnType<FuncA>;
    // string
    
    type B = ReturnType<FuncB>;
    // number
    
    type C = ReturnType<number>;
    // 조건식을 만족하는 R추론 불가능
    // never
    ```
    
    - Promise의 resolve 타입을 infer를 이용해 추출하는 예
    
    ```tsx
    type PromiseUnpack<T> = T extends Promise<infer R> ? R : never;
    // 1. T는 프로미스 타입이어야 한다.
    // 2. 프로미스 타입의 결과값 타입을 반환해야 한다.
    
    type PromiseA = PromiseUnpack<Promise<number>>;
    // number
    
    type PromiseB = PromiseUnpack<Promise<string>>;
    // string
    ```
