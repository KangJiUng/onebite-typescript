// 첫 번째 사례
function swap<T, U>(a: T, b: U) {
  return [b, a];
}

const [a, b] = swap(1, 2);

// 두 번째 사례
function returnFirstValue<T>(data: [T, ...unknown[]]) {
  return data[0];
}

let num = returnFirstValue([0, 1, 2]);
let str = returnFirstValue([1, "hello", "mynameis"]);

// 세 번째 사례
function getLength<T extends { length: number }>(data: T) {
  return data.length;
}

let var1 = getLength([1, 2, 3]);
let var2 = getLength("12345");
let var3 = getLength({ length: 10 });
// let var4 = getLength(10);
