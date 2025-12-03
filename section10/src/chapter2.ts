// Pick<T, K>
// 객체 타입으로부터 특정 프로퍼티만 골라내는 타입
interface Post {
  title: string;
  tags: string[];
  content: string;
  thumnailURL?: string;
}

type Pick<T, K extends keyof T> = {
  // K extends keyof T
  // "title" | "content" extends "title" | "tags" | "content" | "thumnailURL"
  [key in K]: T[key];
};

const legacyPost: Pick<Post, "title" | "content"> = {
  title: "옛날 글",
  content: "옛날 콘텐츠",
};

// Omit<T, K>
// 객체 타입으로부터 특정 프로퍼티를 제거하는 타입
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
// T = Post, K = "title"
// Pick<Post, Exclude<keyof T, K>>
// Pick<Post, Exclude<"title" | "tags" | "content" | "thumnailURL", "title">>
// Pick<Post, "tags" | "content" | "thumnailURL">

const noTitlePost: Omit<Post, "title"> = {
  content: "",
  tags: [],
  thumnailURL: "",
};

// Record<K, V>
// 객체 타입을 정의할 때 인덱스 시그니처처럼 유연하지만 그보다는 제한적
// type ThumnailLegacy = {
//   large: {
//     url: string;
//   };
//   medium: {
//     url: string;
//   };
//   small: {
//     url: string;
//   };
// };

type Record<K extends keyof any, V> = {
  [key in K]: V;
};

type Thumnail = Record<
  "large" | "medium" | "small" | "watch",
  { url: string; size: number }
>;
