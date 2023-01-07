---
title: "테스트 코드에서의 <Router> 에러"
excerpt: 'useHref() may be used only in the context of a <Router> component(feat. MemoryRouter)'
tags: ['React', 'react-router']
coverImage: "/images/posts/router-components/cover.png"
date: '2023-01-07'
ogImage:
  url: '/images/posts/router-components/cover.png'
---

### 발단

테스트 코드를 학습하기 위해 만들고 있던 프로젝트에 테스트 코드 도입을 시도했다. 
그런데 매우 간단한 테스트임에도 다음과 같은 에러가 발생하였다.

> `Error: useHref() may be used only in the context of a <Router> component`

구글링을 해보았지만 react-router-dom v6부터는 `Link` 컴포넌트를 `Router` 컴포넌트(e.g., `BrowserRouter`) 안에 넣어야 한다는 내용뿐이었다. (애초에 그건 이미 에러 메시지에 쓰여있다.)
그리고 안타깝게도 에러 메시지의 해결법대로 하고 있었기 때문에 이는 해결법이 될 수 없었다. 더불어 기존 코드단에서 에러가 발생하지 않는 점으로 미루어 짐작컨대 이는 테스트 코드에서 발생한 문제라고 보는 것이 합리적이었다.

### 해결

다행히도 언제나 그렇듯 [스택오버플로우](https://stackoverflow.com/questions/70805929/how-to-fix-error-usehref-may-be-used-only-in-the-context-of-a-router-compon)에서 같은 문제에 대한 질문과 답변을 얻을 수 있었다.

결론은 테스트하고 싶은 컴포넌트를 `MemoryRouter`로 감싸는 것.

```js
import { MemoryRouter } from 'react-router-dom';

test('Should render MyComponent', () => {
  render(<MyComponent />, { wrapper: MemoryRouter });
});
```

부끄럽게도 해당 내용에 대한 해결은 [Testing Library 공식문서](https://testing-library.com/docs/example-react-router/)에서도 찾아볼 수 있었다.

문제를 해결한 김에 추가적으로 왜 이러한 문제가 발생했으면 어떻게 해결될 수 있던 것인지 조금 더 알아보자.

### Router

`MemoryRouter`는 `react-router`가 제공하는 라우터 컴포넌트 중에 하나이다. 여태는 `HashRouter`와 `BrowserRouter`만 알고 있었을 뿐 아니라 솔직히 말하자면 다른 라우터 종류가 있다는 걸 까먹고 있었다. 다른 라우터 컴포넌트가 필요한 상황을 마주해보지 못해 무작정 `BrowserRouter`만을 사용해왔다. 이참에 각 라우터들의 의의와 쓰임새를 정리해보고 추후 학습 및 실무에 적용해보고자 한다.

[React Router 공식 문서](https://reactrouter.com/en/main/routers/picking-a-router)의 내용을 살펴보니 v6.4부터 라우터를 선언하는 방식이 업데이트된 듯하다. (근데 왜 굳이 헷갈리게 같은 기능을 하는 두 방식을 마치 다른 것처럼 챕터화 해놓은지 모르겠다...)

> e.g., `BrowserRouter` -> `createBrowserRouter`

당연히 새롭게 추가된 방식이 권장되고 있다. 
하지만 왜 바뀐 것이고 왜 변경된 `create*Router` 방식이 더 권장되는 것인지는 추가 학습이 필요하기도 하고 해당 아티클의 내용을 벗어나므로 다루지 않고, 기존의 `*Router`를 기준으로 정리하고자 한다.

#### BrowserRouter

To be continue

