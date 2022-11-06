---
title: "async/awiat는 언제나 옳은가?"
excerpt: '비동기 처리 함수는 일단 async/await 부터 쓰고 시작하시나요? 사실 그래도 되긴 합니다. 그래도 안써도 괜찮은 경우가 있는데 같이 알아보실?'
tags: ['Javascript', 'async']
coverImage: "/images/posts/async_await_not_always/cover.png"
date: '2022-11-06'
ogImage:
  url: '/images/posts/async_await_not_always/cover.png'
---

### 상황

주어진 상황은 다음과 같다. 
> 핸들러 함수(`handleIdChange`)에 의해 `id`가 바뀔 때마다 내부 동작이 실행된다. 내부 동작이란 `getData`를 비동기적으로 데이터를 요청하고 불러오는 것이다. 

#### Code (시작)

```js
// ...
async function getData(id) {
  // 생략된 복잡한 fetching 로직...
  const res = await fetch(`${baseUrl}/${id}`)
  const json = await res.json()

  return json
}

async function handleIdChange(e) => {
  const id = e.target.value
  const product = await getData(id)
  // ...
}
```

위 상황을 보면 어떠한 리팩토링 욕구가 생긴다. 바로 `getData` 분리. `생략된 복잡한 fetching 로직`이라는 것이 상당히 별도로 빼내고 싶으니까.

#### Code (리팩토링1 - 함수 분리)

```js
// ...
async function fetchData(id) {
  // 생략된 복잡한 fetching 로직...
  const res = await fetch(`${baseUrl}/${id}`)
  const json = await res.json()
  
  return json
}

async function getData(id) {
  const json = await fetchData(id)

  return json
}

async function handleIdChange(e) => {
  const id = e.target.value
  const product = await getData(id)
  // ...
}
```

이제 새로운 `async` 함수가 또 생겨버렸다. 그런데 잘 보면 `getData`는 더 이상 `async` 키워드가 필요 없게 되었다. 

`async`/`await` 키워드를 사용한다는 건 어떤 값을 전달받든 `Promise`를 반환하도록 한다는 뜻이다. 원래부터 `Promise`라면 그대로 전달하지만 `Promise`가 아닌 경우에도 `Promise`로 만들어서 전달하겠다는 의미라고 해석할 수 있다.

`getData`는 `fetchData`가 호출한 응답값을 json 형태로 그대로 반환하는 역할만을 하고 있다. 그런데 `fetchData`가 `async` 함수이기 때문에 응답은 `Promise` 객체이다. 즉 `Promise`를 받아서 `Promise`를 전달해줄 뿐인데, 다시 말해 이미 `Promise`를 전달받고 있으니 `async` 키워드가 필요없다는 것이다.

#### Code (리팩토링2 - async 생략)

```js
// ...
async function fetchData(id) {
  // 생략된 복잡한 fetching 로직...
  const res = await fetch(`${baseUrl}/${id}`)
  const json = await res.json()
  
  return json
}

function getData(id) {
  const json = fetchData(id)

  return json
}

async function handleIdChange(e) => {
  const id = e.target.value
  const product = await getData(id)
  // ...
}
```

한편 `fetchData`도 같은 맥락에서 `async` 키워드를 삭제해도 된다. 왜냐하면 `fetch` 함수도 `Promise`를 반환하기 때문이다. 

덧붙여 `fetch`가 `Promise`를 반환한다면 이 정도 간단한 변환엔 `then`을 이용하는 것도 가독성 측면에서 좋아보인다. 

그런데 그러고보니 `fetchData`는 응답값을 받은 것을 그대로 반환할 뿐인 함수다. `async` 함수이기 때문에 `Promise`가 아니라면 `Promise`로 변환하겠지만 이미 응답값이 `Promise`니까 위와 마찬가지의 논리로 `async` 키워드를 삭제할 수 있다.

#### Code (리팩토링3 - then)

```js
// ...
function fetchData(id) {
  // 생략된 복잡한 fetching 로직...
  return fetch(`${baseUrl}/${id}`).then(res => res.json())
}

function getData(id) {
  const json = fetchData(id)

  return json
}

async function handleIdChange(e) => {
  const id = e.target.value
  const product = await getData(id)
  // ...
}
```

한편 선언문으로 작성된 위 함수들을 화살표 함수로 바꾸게 되면 좀 더 깔끔하게 코드를 작성할 수 있다.

#### Code (리팩토링4 - arrow function)

```js
// ...
const fetchData = (id) => fetch(`${baseUrl}/${id}`).then(res => res.json())

const getData = (id) => fetchData(id)

const handleIdChange = async (e) => {
  const id = e.target.value
  const product = await getData(id)
  // ...
}
```

### 정리

- 중간 과정에서는 `async`/`await`가 없어도 괜찮다.
  - 마지막에 전달되는 최종 결과물이 `Promise`이기만 하면 그 종착지에서 비동기 처리가 이뤄질 것이다. `Promise`로 넘어온다는 것만 확인되면 그 중간 과정에서는 `async` 키워드는 불필요하다.
- 간단하게 `then`으로 비동기 처리할 수 있는 경우에도 `async`를 생략할 수 있다.

### 결론 

`async`/`await`는 기존 비동기 처리가 주는 불편함을 해소하기 위해서 등장한 만큼 가독성 좋은 코드를 작성하는데 매우 유용하다. 그렇지만 중간 과정의 모든 함수에서 사용해야 하는 것은 아니다.

한편 그럼에도 불구하고 "그 모든 중간 과정에 `async`를 남발하더라도 동작에 문제가 생기진 않는다"고 반문할 수도 있겠다. 사실 문제는 없다. 다만 `async` 키워드로 함수를 만든다는 것의 의미를 재고해볼 여지는 있다.

> `async` 함수는 원래의 함수를 `Promise`로 감싸는 것

사실 `Promise`로 감싼다고 하여 심각한 성능 저하가 발생한다거나 하지는 않는다. 하지만 비동기 제어가 반드시 필요하지 않음에도 그렇게 보인다는 문제가 있다. 코드는 항상 나만 보는 것이 아님을 고려할 때 가급적이면 최대한 오해의 소지가 적은 코드를 쓰는 게 좋지 않을까? 그렇지 않으면 협업자(미래의 나를 포함한)들은 해당 함수를 `비동기 처리를 동기적으로 마친 후에야 다음 코드로 진행해야 한다'는 오해를 할 수 있으니까.

물론 함수 내부에서 `await`가 여러 개가 있는 경우엔 이런 방식이 통하지 않는다.

지금까지 다룬 내용이 성능과 가독성 측면에서 대단히 중요해서 반드시 다뤄져야 할 이슈는 아니다. 그럼에도 더 나은 코드를 지향하자는 관점에서 머릿속에 새겨두면 꽤나 괜찮을 것 같다. 그렇게 어려운 내용도 아니니까!

### 출처

이 글은 아래 영상을 시청한 후 정리하여 재구성한 글입니다.

[[Javascript 미세팁] 비동기처리는 무조건 async/await 아닌가요? - FE재남](https://youtu.be/Z1zHOh45NDU)
