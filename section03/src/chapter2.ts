// unknown 타입
function unknownExam() {
  // number
  let num1: number = 123;
  let num2: number = -123;
  let num3: number = 0.123;
  let num4: number = -0.123;
  let num5: number = Infinity;
  let num6: number = -Infinity;
  let num7: number = NaN;

  let unknownVar: unknown;

  // let num: number = unknownVar;
  // let str: string = unknownVar;
  // let bool: boolean = unknownVar;
}

// never 타입
function neverExam() {
  function neverFunc(): never {
    while (true) {}
  }

  let num: number = neverFunc();
  let str: string = neverFunc();
  let bool: boolean = neverFunc();

  // let never1: never = 10;
  // let never2: never = "string";
  // let never3: never = true;
}

// void 타입
function voidExam() {
  function voidFuc(): void {
    console.log("hi");
  }

  let voidVar: void = undefined;
}

// any 타입
function anyExam() {
  let unknownVar: unknown;
  let anyVar: any;
  let undefinedVar: undefined;
  let neverVar: never;

  anyVar = unknownVar;
  undefinedVar = anyVar;
  // neverVar = anyVar;
}
