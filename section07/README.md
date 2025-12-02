## 섹션 7: 제네릭

- 제네릭: 함수나 인터페이스, 타입 별칭, 클래스 등을 다양한 타입과 함께 동작하도록 만들어 주는 타입스크립트의 기능 중 하나

- 제네릭이 필요한 상황

```tsx
function func(value: any) {
  return value;
}

let num = func(10);        // any 타입
let str = func("string");  // any 타입

num.toUpperCase()
```

→ num에는 분명 Number 타입의 값 10이 저장되어 있을 것이 분명하지만, any 타입으로 추론되어 버렸기 때문에 toUpperCase 등의 String 타입의 메서드를 사용해도 타입스크립트가 오류를 감지하지 못함

→ 이 코드는 결국 실제로 실행하면 런타임 오류를 발생시키는 아주 위험한 상태

- 제네릭(Generic) 함수
    - 두루두루 모든 타입의 값을 다 적용할 수 있는 범용적인 함수
    - <ins>**T에 어떤 타입이 할당될지는 함수가 호출될 때 결정됨**</ins>
        <img width="1086" height="577" alt="image" src="https://github.com/user-attachments/assets/67f199ce-e945-4a0f-a4f9-44181a5ccb1e" />

        
    - 제네릭 함수를 호출할 때 다음과 같이 타입 변수에 할당할 타입을 직접 명시하는 것도 가능
        1. T에 [Number, Number, Number] 튜플 타입이 할당됨
        2. 매개변수 value와 반환값 타입이 모두 튜플 타입이 됨
    
    ```tsx
    function func<T>(value: T): T {
      return value;
    }
    
    let arr = func<[number, number, number]>([1, 2, 3]);
    ```
    

- 제네릭 타입 변수를 응용하는 사례
    1. 2개의 타입 변수가 필요한 상황
    
    ```tsx
    function swap<T, U>(a: T, b: U) {
      return [b, a];
    }
    
    const [a, b] = swap("1", 2);
    ```
    
    1. 다양한 배열 타입을 인수로 받는 제네릭 함수를 만들어야 하는 상황
    
    ```tsx
    // 함수 매개변수 data의 타입을 T[]로 설정했기 때문에 배열이 아닌 값은 인수로 전달할 수 없게 됨
    function returnFirstValue<T>(data: T[]) {
      return data[0];
    }
    
    let num = returnFirstValue([0, 1, 2]);
    // number
    
    let str = returnFirstValue([1, "hello", "mynameis"]);
    // number | string
    ```
    
    1. 위 상황에서 만약 반환값의 타입을 배열의 첫번째 요소의 타입이 되도록 하려는 상황
        1. 튜플 타입과 나머지 파라미터를 이용
    
    ```tsx
    function returnFirstValue<T>(data: [T, ...unknown[]]) {
      return data[0];
    }
    
    let str = returnFirstValue([1, "hello", "mynameis"]);
    // number
    ```
    
    1. 타입 변수를 제한하는 상황
        1. 함수를 호출하고 인수로 전달할 수 있는 값의 범위에 제한을 두는 것
        2. 타입 변수를 제한할 때에는 확장(extends)을 이용
    
    ```tsx
    // T는 이제 { length : number } 객체 타입의 서브 타입
    function getLength<T extends { length: number }>(data: T) {
      return data.length;
    }
    
    getLength("123");            // ✅
    
    getLength([1, 2, 3]);        // ✅
    
    getLength({ length: 1 });    // ✅
    
    getLength(undefined);        // ❌
    
    getLength(null);             // ❌
    ```
    

- **자바스크립트**의 배열 메서드 map/forEach
    - map 메서드는 원본 배열의 각 요소에 콜백함수를 수행하고 반환된 값들을 모아 새로운 배열로 만들어 반환
    - forEach 메서드는 배열의 모든 요소에 콜백함수를 한번씩 수행해주는 메서드

→ map 메서드를 직접 함수로 만들고 타입도 정의

```tsx
const arr = [1, 2, 3];

function map<T, U>(arr: T[], callback: (item: T) => U): U[] {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i]));
  }
  return result;
}

map(arr, (it) => it * 2);
// number[] 타입의 배열을 반환
// 결과 : [2, 4, 6]
```

→ forEach를 직접 함수로 만들고 타입도 정의

```tsx
function forEach<T>(arr: T[], callback: (item: T) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i]);
  }
}
```

- 제네릭 인터페이스
    - 제네릭 인터페이스는 제네릭 함수와는 달리 변수의 타입으로 정의할 때 반드시 꺽쇠와 함께 타입 변수에 할당할 타입을 명시해주어야 함
        
        → 제네릭 함수는 매개변수에 제공되는 값의 타입을 기준으로 타입 변수의 타입을 추론할 수 있지만 인터페이스는 마땅히 추론할 수 있는 값이 없기 때문
        
    
    ```tsx
    interface KeyPair<K, V> {
      key: K;
      value: V;
    }
    
    let keyPair: KeyPair<string, number> = {
      key: "key",
      value: 0,
    };
    
    let keyPair2: KeyPair<boolean, string[]> = {
      key: true,
      value: ["1"],
    };
    ```
    
    - 인덱스 시그니처와 함께 사용하기
        - 기존보다 훨씬 더 유연한 객체 타입을 정의할 수 있음
    
    ```tsx
    interface Map<V> {
      [key: string]: V;
    }
    
    let stringMap: Map<string> = {
      key: "value",
    };
    
    let booleanMap: Map<boolean> = {
      key: true,
    };
    ```
    

- 제네릭 인터페이스 활용 예

```tsx
interface Student {
  type: "student";
  school: string;
}

interface Developer {
  type: "developer";
  skill: string;
}

interface User<T> {
  name: string;
  profile: T;
}

function goToSchool(user: User<Student>) {
  const school = user.profile.school;
  console.log(`${school}로 등교 완료`);
}

const developerUser: User<Developer> = {
  name: "이정환",
  profile: {
    type: "developer",
    skill: "TypeScript",
  },
};

const studentUser: User<Student> = {
  name: "홍길동",
  profile: {
    type: "student",
    school: "가톨릭대학교",
  },
};
```

- 제네릭 타입 별칭
    - 제네릭 타입 별칭을 사용할 때에도 제네릭 인터페이스와 마찬가지로 타입으로 정의될 때 반드시 타입 변수에 설정할 타입을 명시해 주어야 함
    
    ```tsx
    type Map2<V> = {
      [key: string]: V;
    };
    
    let stringMap2: Map2<string> = {
      key: "string",
    };
    ```
    

- 제네릭 클래스
    - 여러 타입의 리스트를 생성할 수 있는 범용적인 클래스
    
    ```tsx
    class List<T> {
      constructor(private list: T[]) {}
    
      push(data: T) {
        this.list.push(data);
      }
    
      pop() {
        return this.list.pop();
      }
    
      print() {
        console.log(this.list);
      }
    }
    
    const numberList = new List([1, 2, 3]);
    const stringList = new List(["1", "2"]);
    
    // 타입변수의 타입을 직접 설정하고 싶다면 다음과 같이
    const numberList = new List<number>([1, 2, 3]);
    const stringList = new List<string>(["1", "2"]);
    ```
    

- Promise 사용하기
    - Promise는 제네릭 클래스로 구현되어 있기 때문에 새로운 Promise를 생성할 때 타입 변수에 할당할 타입을 직접 설정해 주면 <ins>**해당 타입이 바로 resolve 결과값의 타입이 됨**</ins>
    - reject 함수에 인수로 전달하는 값, 즉 실패의 결과값 타입은 정의할 수 없음(unknown 타입으로 고정) → catch 메서드에서 사용하려면 타입 좁히기를 통해 안전하게 사용하는걸 권장
    
    ```tsx
    const promise = new Promise<number>((resolve, reject) => {
      setTimeout(() => {
        // 결과값 : 20
        resolve(20);
      }, 3000);
    });
    
    promise.then((response) => {
      // response는 number 타입
      console.log(response);
    });
    
    promise.catch((error) => {
      if (typeof error === "string") {
        console.log(error);
      }
    });
    ```
    
    - 만약 어떤 함수가 Promise 객체를 반환한다면 함수의 반환값 타입을 위해 다음과 같이 할 수 있음
    
    ```tsx
    // 방법 1
    function fetchPost() {
      return new Promise<Post>((resolve, reject) => {
        setTimeout(() => {
          resolve({
            id: 1,
            title: "게시글 제목",
            content: "게시글 본문",
          });
        }, 3000);
      });
    }
    
    // 방법 2 (권장)
    function fetchPost(): Promise<Post> {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            id: 1,
            title: "게시글 제목",
            content: "게시글 본문",
          });
        }, 3000);
      });
    }
    ```
