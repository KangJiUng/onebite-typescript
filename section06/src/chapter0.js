// 클래스
let studentA = {
  name: "홍길동",
  grade: "A+",
  age: 23,
  study() {
    console.log("열심히 공부함");
  },
  introduce() {
    console.log("안녕하세요!");
  },
};

class Student {
  // 필드
  name;
  grade;
  age;

  // 생성자
  constructor(name, grade, age) {
    this.name = name;
    this.grade = grade;
    this.age = age;
  }

  // 메서드
  study() {
    console.log("열심히 공부함");
  }
  introduce() {
    console.log(`안녕하세요! ${this.name}입니다.`);
  }
}

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
    console.log(`${this.favoriteSkill}로 프로그래밍함`);
  }
}

// 인스턴스: 클래스를 이용해서 만든 객체
let studentB = new Student("강지웅", "A+", 23);
console.log(studentB);
studentB.study();
studentB.introduce();

let studentDeveloper = new StudentDeveloper("강지웅", "B+", 23, "TypeScript");
console.log(studentDeveloper);
studentDeveloper.programming();
