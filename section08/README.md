## 섹션 8: 타입 조작하기

- 타입 조작
    - 기본 타입이나 별칭 또는 인터페이스로 만든 원래 존재하던 타입들을 상황에 따라 유동적으로 다른 타입으로 변환하는 타입스크립트 기능

- 인덱스드 액세스 타입
    - 인덱스를 이용해 다른 타입내의 특정 프로퍼티의 타입을 추출하는 타입
    1. 객체 프로퍼티의 타입 추출하기
        1. 대괄호 속에 들어가는 String Literal 타입인 “author” 를 인덱스 라고 부름. 그래서 인덱스를 이용해 특정 타입에 접근하다고 하여 **‘인덱스드 엑세스 타입’**
        2. 인덱스에는 값이 아니라 타입만 들어갈 수 있음
    
    ```tsx
    interface Post {
      title: string;
      content: string;
      author: {
        id: number;
        name: string;
        age: number; // 추가 가능
      };
    }
    
    // author 매개변수의 타입은 {id : number, name: string, age:number}
    function printAuthorInfo(author: Post["author"]) {
      console.log(`${author.id} - ${author.name}`);
    }
    
    (...)
    ```
    
    2. 배열 요소의 타입 추출하기
        1. 다음과 같이 이 PostList 배열 타입에서 하나의 요소의 타입만 뽑아올 수 있음 → PostList[number]는 PostList 배열 타입으로부터 요소의 타입을 추출하는 인덱스드 엑세스 타입
        2. Number Literal 타입을 넣어도 됨 숫자와 관계없이 모두 Number 타입을 넣은 것과 동일하게 동작
    
    ```tsx
    const post: PostList[number] = {
      title: "게시글 제목",
      content: "게시글 본문",
      author: {
        id: 1,
        name: "홍길동",
        age: 23,
      },
    };
    ```
    
    3. 튜플의 요소 타입 추출하기
        1. 주의할 점은 튜플 타입에 인덱스드 엑세스 타입을 사용할 때 인덱스에 number 타입을 넣으면 마치 튜플을 배열 처럼 인식해 배열 요소의 타입을 추출
        
        ```tsx
        type Tup = [number, string, boolean];
        
        type Tup0 = Tup[0];
        // number
        
        type Tup1 = Tup[1];
        // string
        
        type Tup2 = Tup[2];
        // boolean
        
        type Tup3 = Tup[number]
        // number | string | boolean
        ```
        

- Keyof 연산자
    - 객체 타입으로부터 프로퍼티의 모든 key들을 String Literal Union 타입으로 추출하는 연산자
    - `keyof 타입` 형태로 사용하며 `타입`의 모든 프로퍼티 key를 String Literal Union 타입으로 추출
        - 오직 타입에만 적용할 수 있는 연산자
    
    ```tsx
    interface Person {
      name: string;
      age: number;
      location: string; // 추가 가능
    }
    
    function getPropertyKey(person: Person, key: keyof Person) {
      return person[key];
    }
    
    const person: Person = {
      name: "홍길동",
      age: 23,
    };
    ```
    

- Typeof와 Keyof 함께 사용하기
    - typeof 연산자는 자바스크립트에서 특정 값의 타입을 문자열로 반환하는 연산자였지만 다음과 같이 타입을 정의할 때 사용하면 특정 변수의 타입을 추론하는 기능도 가지고 있음
    
    ```tsx
    type Person = typeof person;
    // 결과
    // {name: string, age: number, location:string}
    
    function getPropertyKey(person: Person, key: keyof typeof person) {
      return person[key];
    }
    
    const person: Person = {
      name: "홍길동",
      age: 23,
    };
    ```
    

- 맵드 타입
    - 기존의 객체 타입을 기반으로 새로운 객체 타입을 만드는 타입 조작 기능
    
    ```tsx
    interface User {
      id: number;
      name: string;
      age: number;
    }
    
    // 이 객체 타입은 key가 한번은 id, 한번은 name, 한번은 age가 된다는 뜻
    // 대 괄호 뒤에 선택적 프로퍼티를 의미하는 물음표(?) 키워드 -> 모든 프로퍼티가 선택적 프로퍼티
    type PartialUser = {
      [key in "id" | "name" | "age"]?: User[key];
    };
    
    (...)
    ```
    
    - keyof 연산자를 이용해 한번 더 업그레이드
    
    ```tsx
    interface User {
      id: number;
      name: string;
      age: number;
    }
    
    type PartialUser = {
      [key in keyof User]?: User[key];
    };
    
    // 모든 프로퍼티가 읽기 전용 프로퍼티가 된 타입
    type ReadonlyUser = {
      readonly [key in keyof User]: User[key];
    };
    
    (...)
    ```
    

- 템플릿 리터럴 타입
    - 템플릿 리터럴을 이용해 특정 패턴을 갖는 String 타입을 만드는 기능
    
    ```tsx
    type Color = "red" | "black" | "green";
    type Animal = "dog" | "cat" | "chicken";
    
    // type ColoredAnimal = `red-dog` | 'red-cat' | 'red-chicken' | 'black-dog' ... ;
    type ColoredAnimal = `${Color}-${Animal}`;
    ```
