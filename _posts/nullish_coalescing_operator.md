---
title: "null 병합 연산자 (??)"
excerpt: '"||" 이면 충분한 거 아니야?!'
tags: ['Javascript']
coverImage: "/images/posts/nullish-coalescing-operator/cover.png"
date: '2022-11-04'
ogImage:
  url: '/images/posts/nullish-coalescing-operator/cover.png'
---

### 정의

> 널 병합 연산자 (`??`) 는 왼쪽 피연산자가 `null` 또는 `undefined`일 때 오른쪽 피연산자를 반환하고, 그렇지 않으면 왼쪽 피연산자를 반환하는 논리 연산자이다.

[MDN - Nullish coalescing operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing)

### `||` 연산자와의 차이점

논리 연산자 OR(`||`)이 모든 falsy 값에 대하여 반응하는 연산자라면  `??`은 오직 `null` 또는 `undefined`에만 반응하는 연산자다. 쉽게 말하면 `''`(빈 문자열) 혹은 `0` 에 대한 연산 값이 다르다. 

### 그 차이점이 갖는 의의 및 용례

코드로 살펴보면 다음과 같다. 

```js
const x = (a !== null && a !== undefined) ? a : b
const x = a ?? b
```

위에서 언급된 정의를 달리 말하면 `??`은 첫 번째 정의된 값을 반환하는 연산자라고 할 수 있다. 따라서 falsy 하지만 정의된 값이라면 반환해야 하는 경우 사용할 수 있다.

```js
const nullValue = null // falsy, 값이 정의되지 않음
const emptyText = "" // falsy, 값이 정의됨

const valA = nullValue ?? "default for A"
const valB = emptyText ?? "default for B"

console.log(valA) // "default for A"
console.log(valB) // ""
```

당연히 `||` 연산자처럼 short-circuting(단축 평가)에도 이용할 수 있다.

```js
function A() {
  console.log("함수 A 호출!")

  return undefined
}
function B() {
  console.log("함수 B 호출!")

  return false
}
function C() {
  console.log("함수 C 호출!")

  return "끝!"
}

console.log(A() ?? C())
// "함수 A 호출!" 
// "함수 C 호출!" 
// "끝!"
// undefined

console.log(B() ?? C())
// "함수 B 호출!" 
// false
// B가 false(falsy 값이지만 null이나 undefined가 아니다.)를 반환하기 때문에 C는 호출되지 않는다.
```

옵셔널 체이닝 연산자(`?.`)와 함께 유용하게 사용할 수도 있다.

```js
const someObj = { definedProp: "hi" };

console.log(someObj.definedProp?.toUpperCase() ?? "defined"); // "DEFINED"
console.log(someObj.undefinedProp?.toUpperCase() ?? "undefined"); // "undefined"
```
