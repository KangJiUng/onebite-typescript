## 섹션 6: 클래스

### <자바스크립트>

- **자바스크립트**의 클래스
    - 클래스는 동일한 모양의 객체를 더 쉽게 생성하도록 도와주는 문법
    - 생성자: 특수한 메서드로 실질적으로 객체를 생성하는 함수(this.프로퍼티의 값으로 할당)
        - this는 객체이며 현재 만들고 있는 객체를 의미
        - this를 활용해 객체 프로퍼티의 값을 활용하는 것 가능
    
    ```tsx
    class Student {
      // 필드
      name;
      age;
      grade;
    
      // 생성자
      constructor(name, grade, age) {
        this.name = name;
        this.grade = grade;
        this.age = age;
      }
      
      // 메서드
      study() {
        console.log("열심히 공부 함");
      }
    
      introduce() {
        console.log(`안녕하세요 ${this.name} 입니다!`);
      }
    }
    
    const studentB = new Student("홍길동", "A+", 27);
    
    console.log(studentB);
    // Student { name: '홍길동', age: 27, grade: 'A+' }
    studentB.study(); // 열심히 공부 함
    studentB.introduce(); // 안녕하세요 홍길동 입니다!
    ```
    

- **자바스크립트**의 상속
    - 앞서 만든 클래스를 기반으로 추가적인 필드와 메서드를 갖는 클래스를 선언하고 싶다면 상속을 이용
        - StudentDeveloper 클래스에서 Student 클래스의 생성자를 함께 호출해줘야함 → super() 메서드 이용
    
    ```tsx
    class StudentDeveloper extends Student {
      // 필드
      favoriteSkill;
    
      // 생성자
      constructor(name, grade, age, favoriteSkill) {
    	  super(name, grade, age);
        this.favoriteSkill = favoriteSkill;
      }
    
      // 메서드
      programming() {
        console.log(`${this.favoriteSkill}로 프로그래밍 함`);
      }
    }
    ```
    

### <타입스크립트>

- **타입스크립트**의 클래스
    - 타입스크립트에서는 클래스의 필드를 선언할 때 타입 주석으로 타입을 함께 정의해주어야 함 → 그렇지 않으면 함수 매개변수와 동일하게 암시적 any 타입으로 추론되는데 엄격한 타입 검사 모드(strict 옵션이 true로 설정되어 있을 경우)일 때에는 오류가 발생
    - 생성자에서 각 필드의 값을 초기화 하지 않을 경우 초기값도 함께 명시해주어야 함
        - 생성자 함수에서 필드의 값들을 잘 초기화 해 준다면 필드 선언시의 초기값은 생략해도 됨
    
    ```tsx
    class Employee {
      // 필드
      name: string;
      age: number;
      position?: string;
    
      // 생성자
      constructor(name: string, age: number, position: string) {
        this.name = name;
        this.age = age;
        this.position = position;
      }
    
      // 메서드
      work() {
        console.log("일함");
      }
    }
    
    ```
    
    - 타입스크립트의 클래스는 타입으로도 사용할 수 있음 → 클래스를 타입으로 사용하면 해당 클래스가 생성하는 객체의 타입과 동일한 타입이 됨
    
    ```tsx
    class Employee {
      (...)
    }
    
    const employeeC: Employee = {
      name: "",
      age: 0,
      position: "",
      work() {},
    };
    ```
    

- **타입스크립트**의 상속
    - 반드시 super 메서드를 호출해 슈퍼 클래스(확장되는 클래스)의 생성자를 호출해야 하며, 호출 위치는 생성자의 최상단이어야만 함
    
    ```tsx
    class ExecutiveOfficer extends Employee {
      officeNumber: number;
    
      constructor(
        name: string,
        age: number,
        position: string,
        officeNumber: number
      ) {
        super(name, age, position);
        this.officeNumber = officeNumber;
      }
    }
    ```
    

- 접근 제어자
    - 클래스의 특정 필드나 메서드를 접근할 수 있는 범위를 설정하는 기능(타입스크립트에서만 제공)
        - public : 모든 범위에서 접근 가능(미지정 시 기본으로 지정)
        
        ```tsx
        class Employee {
          // 필드
          name: string;             // 자동으로 public
          age: number;      
          public position: string;  // 직접 명시 가능
        
          // 생성자
          constructor(name: string, age: number, position: string) {
            this.name = name;
            this.age = age;
            this.position = position;
          }
        
          // 메서드
          work() {
            console.log("일함");
          }
        }
        
        const employee = new Employee("이정환", 27, "devloper");
        
        employee.name = "홍길동";
        employee.age = 30;
        employee.position = "디자이너";
        ```
        
        - private : 클래스 내부에서만 접근 가능
        
        ```tsx
        class Employee {
          // 필드
          private name: string; // private 접근 제어자 설정
          public age: number;
          public position: string;
        
          ...
        
          // 메서드
          work() {
            console.log(`${this.name}이 일함`); // 여기서는 접근 가능
          }
        }
        
        const employee = new Employee("이정환", 27, "devloper");
        
        employee.name = "홍길동"; // ❌ 오류
        employee.age = 30;
        employee.position = "디자이너";
        ```
        
        - proteced : 클래스 내부 또는 파생 클래스 내부에서만 접근 가능
        
        ```tsx
        class Employee {
          // 필드
          private name: string; // private 접근 제어자 설정
          protected age: number;
          public position: string;
        
          ...
        
          // 메서드
          work() {
            console.log(`${this.name}이 일함`); // 여기서는 접근 가능
          }
        }
        
        class ExecutiveOfficer extends Employee {
         // 메서드
          func() {
            this.name; // ❌ 오류 
            this.age; // ✅ 가능
          }
        }
        
        const employee = new Employee("이정환", 27, "devloper");
        
        employee.name = "홍길동"; // ❌ 오류
        employee.age = 30; // ❌ 오류
        employee.position = "디자이너";
        ```
        

- 필드 생략하기
    - 접근 제어자는 생성자의 매개변수에도 설정할 수 있으나 생성자에 접근 제어자를 설정하면 동일한 이름의 필드를 선언하지 못하게 됨 → 생성자 매개변수에 접근 제어자가 설정되면 자동으로 필드도 함께 선언되기 때문
    - 접근 제어자가 설정된 매개변수들은 `this.필드 = 매개변수가` 자동으로 수행됨. 따라서 필드는 모두 this 객체의 프로퍼티 값으로 자동 설정되기 때문에 다음과 같이 생성자 내부의 코드를 제거해도 됨’
    
    ```tsx
    class Employee {
      // 생성자
      constructor(
        private name: string,
        protected age: number,
        public position: string
      ) {}
    
      // 메서드
      work() {
        console.log(`${this.name} 일함`);
      }
    }
    ```
    

- 인터페이스를 구현하는 클래스
    - 타입스크립트의 인터페이스는 클래스의 설계도 역할을 할 수 있음
        - 인터페이스를 이용해 클래스에 어떤 필드들이 존재하고, 어떤 메서드가 존재하는지 정의할 수 있는 것
    - 인터페이스를 클래스에서 implements 키워드와 함께 사용하면 이제부터 이 클래스가 생성하는 객체는 모두 이 인터페이스 타입을 만족하도록 클래스를 구현해야 함
    
    ```tsx
    interface CharacterInterface {
      name: string;
      moveSpeed: number;
      move(): void;
    }
    
    class Character implements CharacterInterface {
      constructor(
        public name: string,
        public moveSpeed: number,
        private extra: string
      ) {}
    
      move(): void {
        console.log(`${this.moveSpeed} 속도로 이동!`);
      }
    }
    ```
