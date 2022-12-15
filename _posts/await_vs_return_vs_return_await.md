---
title: "await vs return vs return await"
excerpt: 'async 함수를 작성할 때 사용하는 await, return, return await는 각기 다른 결과를 낳게 된다는데... 알고 쓰고 있니?'
tags: ['Javascript', 'async']
coverImage: "/images/posts/await_vs_return_vs_return_await/cover.png"
date: '2022-12-15'
ogImage:
  url: '/images/posts/await_vs_return_vs_return_await/cover.png'
---

## 발단

일전에 기술 면접에서 이 포스트에서 다룰 내용에 대한 질문은 받은 적이 있다. `async` 키워드를 사용하며 크게 고민해본 적이 없어 약간 당황했었다. 그 자리에서 추론해가며 대답은 얼추했었는데, 면접관님의 추천으로 제대로 정리를 해보고자 한다. 

## 개요

`async` 함수를 작성할 때 사용하는 `await`, `return`, `return await`의 차이점을 알고 상황에 맞게 올바른 키워드를 사용할 수 있어야 한다.

```js
async function waitAndMaybeReject() {
  // Wait one second
  await new Promise((r) => setTimeout(r, 1000));
  // Toss a coin
  const isHeads = Boolean(Math.round(Math.random()));

  if (isHeads) return 'yay';
  throw Error('Boo!');
}
```

위 함수는 fulfill 되어 'yay'를 던져주거나 reject 되어 에러를 던지는 프로미스를 반환한다.

### Just calling

```js
async function foo() {
  try {
    waitAndMaybeReject();
  } catch (e) {
    return 'caught';
  }
}
```

`foo`를 호출하면 프로미스는 항상 `undefined`인 fulfilled 프로미스를 리턴한다. 

`waitAndMaybeReject()`를 기다리거나(`await` 하거나) 리턴하지 않았기 때문이다. 개인적으론 첫 시작인 이 부분부터 헷갈렸다. 동시에 이 부분을 제대로 이해한다면 다음은 쉽다. 프로미스 객체의 상태에 대한 고민없이 무작정 코드를 쓰다 보면 놓치기 쉬운 부분인 것 같다.

### Awaiting

```js
async function foo() {
  try {
    await waitAndMaybeReject();
  } catch (e) {
    return 'caught';
  }
}
```

이번엔 1초를 기다린 뒤 `undefined`나 `'caught'`인 fulfilled 프로미스를 리턴한다. 

`waitAndMaybeReject()`를 기다리기(`await` 하기) 때문에 해당 함수가 rejected 프로미스를 리턴하면 `catch` 블록이 실행되어 `'caught'`를 리턴하지만 fulfilled 프로미스를 리턴하면 `await`하기만 할 뿐이라 의도한 `'yay'` 값을 얻을 수는 없다.

### Returning

```js
async function foo() {
  try {
    return waitAndMaybeReject();
  } catch (e) {
    return 'caught';
  }
}
```

이번엔 1초를 기다린 뒤, `'yay'`를 가진 fulfilled 프로미스 혹은 에러를 던지는 rejected 프로미스를 리턴한다. 

다만 `waitAndMaybeReject()`를 기다리지(`await` 하지) 않고 바로 리턴하기 때문에 `catch` 블록이 실행되는 케이스는 없다.

### Return-awaiting

`try-catch` 블록에서 필요한 것은 `return await`다.

```js
async function foo() {
  try {
    return await waitAndMaybeReject();
  } catch (e) {
    return 'caught';
  }
}
```

이번엔 1초를 기다린 뒤 `'yay'` 혹은 `'caught'`를 가진 fulfilled 프로미스를 리턴한다. 

 다만 `try/catch` 구문이 아니라면 `return await`를 쓰는 것은 불필요한 중복이다. (`async` 함수는 함상 프로미스를 리턴하기 때문, ESLint에 관련 규칙도 존재한다.)

## 출처

[await vs return vs return await](https://jakearchibald.com/2017/await-vs-return-vs-return-await/)
