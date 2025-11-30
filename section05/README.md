## 섹션 5: 인터페이스

- 인터페이스: 타입 별칭과 동일하게 타입에 이름을 지어주는 또 다른 문법
    - 인터페이스에서도 동일한 방법으로 선택적 프로퍼티, 읽기 전용 프로퍼티 설정이 가능
    - 메서드의 타입을 정의하는 것 또한 가능
        - 함수 타입 표현식 또는 호출 시그니처를 이용 가능
        - 함수 타입 표현식으로 메서드 타입을 정의하면 메서드의 오버로딩 구현이 불가능
        
        ```tsx
        interface Person {
          readonly name: string;
          age?: number;
          // sayHi: () => void;
          // sayHi: (a: number, b: number) => void; ❌
          sayHi(): void;
          sayHi(a: number): void;
          sayHi(a: number, b: number): void;
        }
        
        const person: Person = {
          name: "홍길동",
          // age : 23
        };
        
        person.name = "강지웅" // ❌
        ```
        

- 인터페이스는 대부분의 상황에 타입 별칭과 동일하게 동작하지만 몇가지 차이점이 존재
    - 타입 별칭에서는 다음과 같이 Union이나 Intersection 타입을 정의할 수 있었던 반면 인터페이스에서는 할 수 없음
        
        → 인터페이스로 만든 타입을 Union 또는 Intersection으로 이용해야 한다면 다음과 같이 타입 별칭과 함께 사용하거나 타입 주석에서 직접 사용해야 함
        
    
    ```tsx
    type Type1 = number | string;
    type Type2 = number & string;
    
    interface Person {
      name: string;
      age: number;
    } | number // ❌
    
    ------
    
    type Type1 = number | string | Person;
    type Type2 = number & string & Person;
    
    const person: Person & string = {
      name: "이정환",
      age: 27,
    };
    ```
    

- 인터페이스 확장: 하나의 인터페이스를 다른 인터페이스들이 상속받아 중복된 프로퍼티를 정의하지 않도록 도와주는 문법
    - `interface 타입이름 extends 확장_할_타입이름` 형태로 extends 뒤에 확장할 타입의 이름을 정의하면 해당 타입에 정의된 모든 프로퍼티를 다 가지고 오게 됨
    - 확장과 동시에 프로퍼티의 타입을 재정의 하는 것 또한 가능하지만, 원본 타입이 재정의할 타입의 슈퍼 타입이 되도록 재정의해야 함
        
        ```tsx
        interface Animal { // Dog 타입의 슈퍼 타입
          name: string;
          color: string;
        }
        
        interface Dog extends Animal {
        	name: "doldol"; // 타입 재정의
        	name: string; // ✅
        	name: number; // ❌
          breed: string;
        }
        
        interface Cat extends Animal {
          isScratch: boolean;
        }
        
        interface Chicken extends Animal {
          isFly: boolean;
        }
        ```
        

- 타입 별칭을 확장하기
    - 인터페이스는 인터페이스 뿐만 아니라 타입 별칭으로 정의된 객체도 확장 가능
    
    ```tsx
    type Animal = {
      name: string;
      color: string;
    };
    
    interface Dog extends Animal {
      breed: string;
    }
    ```
    

- 다중 화장
    - 여러 개의 인터페이스를 확장하는 것 또한 가능
    
    ```tsx
    interface DogCat extends Dog, Cat {}
    
    const dogCat: DogCat = {
      name: "",
      color: "",
      breed: "",
      isScratch: true,
    };
    ```
    

- 선언 합침(Declaration Merging)
    - 타입 별칭은 동일한 스코프 내에 중복된 이름으로 선언할 수 없는 반면 인터페이스는 가능 → 중복된 이름의 인터페이스 선언은 결국 모두 하나로 합쳐지기 때문
    - 동일한 프로퍼티의 타입을 다르게 정의한 상황을 ‘충돌’ 이라고 표현하며 선언 합침에서 이런 충돌은 허용되지 않음
    
    ```tsx
    type Person = {
      name: string;
    };
    
    type Person = { ❌
      age: number;
    };
    
    interface Person { // ✅
      age: number;
    }
    ```
