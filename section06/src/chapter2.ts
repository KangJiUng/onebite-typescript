// 접근 제어자(access modifier)
// => public, private, protected

class Employee {
  // 생성자
  constructor(
    private name: string,
    protected age: number,
    public position: string
  ) {}

  // 메서드
  work() {
    console.log(`${this.name} 일함`); // -> 클래스 내부에서 접근 가능
  }
}

class ExecutiveOfficer extends Employee {
  // 필드
  officeNumber: number;

  // 생성자
  constructor(
    name: string,
    age: number,
    position: string,
    officeNumber: number
  ) {
    super(name, age, position);
    this.officeNumber = officeNumber;
  }

  // 메서드
  func() {
    this.age; // -> 파생 클래스까지 접근 가능
  }
}

const employee = new Employee("홍길동", 23, "developer");
// employee.name = "강지웅"; -> 클래스 외부에서 접근 불가능
// employee.age = 27; -> 클래스 외부에서 접근 불가능
employee.position = "디자이너";
