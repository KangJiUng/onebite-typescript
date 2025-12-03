## 섹션 10: 유틸리티 타입

- 유틸리티 타입이란 타입스크립트가 자체적으로 제공하는 특수한 타입들
    - 제네릭, 맵드 타입, 조건부 타입 등의 타입 조작 기능을 이용해 실무에서 자주 사용되는 유용한 타입들을 모아 놓은 것
    
- Partial<T>
    - 특정 객체 타입의 모든 프로퍼티를 선택적 프로퍼티로 변환
    
    ```tsx
    interface Post {
      title: string;
      tags: string[];
      content: string;
      thumbnailURL?: string;
    }
    
    // 직접 구현
    type Partial<T> = {
      [key in keyof T]?: T[key];
    };
    
    const draft: Partial<Post> = {
      title: "제목 나중에 짓자",
      content: "초안...",
    };
    ```
    

- Required<T>
    - 특정 객체 타입의 모든 프로퍼티를 필수(선택적이지 않은) 프로퍼티로 변환
    
    ```tsx
    interface Post {
      title: string;
      tags: string[];
      content: string;
      thumbnailURL?: string;
    }
    
    // 직접 구현
    type Required<T> = {
      [key in keyof T]-?: T[key];
    };
    
    // 반드시 썸네일 프로퍼티가 존재해야 하는 게시글
    const withThumbnailPost: Required<Post> = { // ❌
      title: "한입 타스 후기",
      tags: ["ts"],
      content: "",
      // thumbnailURL: "https://...",
    };
    ```
    

- Readonly<T>
    - 특정 객체 타입의 모든 프로퍼티를 읽기 전용 프로퍼티로 변환
    
    ```tsx
    interface Post {
      title: string;
      tags: string[];
      content: string;
      thumbnailURL?: string;
    }
    
    // 직접 구현
    type Readonly<T> = {
      readonly [key in keyof T]: T[key];
    };
    
    const readonlyPost: Readonly<Post> = {
      title: "보호된 게시글입니다.",
      tags: [],
      content: "",
    };
    
    readonlyPost.content = '해킹당함'; // ❌
    ```
    

- Pick<T, K>
    - 특정 객체 타입으로부터 특정 프로퍼티만을 골라내는 타입
    
    ```tsx
    interface Post {
      title: string;
      tags: string[];
      content: string;
      thumbnailURL?: string;
    }
    
    // 직접 구현
    type Pick<T, K extends keyof T> = {
      [key in K]: T[key];
    };
    
    const legacyPost: Pick<Post, "title" | "content"> = {
      title: "",
      content: "",
    };
    // 추출된 타입 : { title : string; content : string }
    ```
    

- Omit<T, K>
    - 특정 객체 타입으로부터 특정 프로퍼티만을 제거하는 타입
    
    ```tsx
    interface Post {
      title: string;
      tags: string[];
      content: string;
      thumbnailURL?: string;
    }
    
    // 직접 구현
    type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
    
    const noTitlePost: Omit<Post, "title"> = {
      content: "",
      tags: [],
      thumbnailURL: "",
    };
    ```
    

- Record<K, V>
    - 특정 키와 값 타입의 유연한 객체 타입(사전 형태) 정의에 적합한 유틸리티 타입
    
    ```tsx
    // 중복이 많은 type 코드
    type Thumbnail = {
      large: {
        url: string;
      };
      medium: {
        url: string;
      };
      small: {
        url: string;
      };
    };
    
    // 직접 구현
    type Record<K extends keyof any, V> = {
      [key in K]: V;
    };
    
    type Thumbnail = Record<
      "large" | "medium" | "small",
      { url: string }
    >;
    ```
    

- Exclude<T, K>
    - T로부터 U를 제거하는 타입
    
    ```tsx
    // 직접 구현
    type Exlcude<T, U> = T extends U ? never : T;
    
    type A = Exclude<string | boolean, string>;
    // boolean
    ```
    

- Extract<T, K>
    - T로 부터 U를 추출하는 타입
    
    ```tsx
    // 직접 구현
    type Extract<T, U> = T extends U ? T : never;
    
    type B = Extract<string | boolean, boolean>;
    // boolean
    ```
    

- ReturnType<T>
    - 타입변수 T에 할당된 함수 타입의 반환값 타입을 추출하는 타입
    
    ```tsx
    type ReturnType<T extends (...args: any) => any> = T extends (
      ...agrs: any
    ) => infer R
      ? R
      : never;
    
    function funcA() {
      return "hello";
    }
    
    function funcB() {
      return 10;
    }
    
    type ReturnA = ReturnType<typeof funcA>;
    // string
    
    type ReturnB = ReturnType<typeof funcB>;
    // number
    ```
