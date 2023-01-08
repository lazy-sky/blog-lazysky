---
title: "테스트 코드에서의 <Router> 에러와 다양한 Router 컴포넌트들"
excerpt: 'useHref() may be used only in the context of a <Router> component(feat. MemoryRouter)'
tags: ['React', 'react-router']
coverImage: "/images/posts/router-components/cover.png"
date: '2023-01-07'
ogImage:
  url: '/images/posts/router-components/cover.png'
---

## 발단

테스트 코드를 학습하기 위해 만들고 있던 프로젝트에 테스트 코드 도입을 시도했다. 
그런데 매우 간단한 테스트임에도 다음과 같은 에러가 발생하였다.

> `Error: useHref() may be used only in the context of a <Router> component`

구글링을 해보았지만 react-router-dom v6부터는 `Link` 컴포넌트를 `Router` 컴포넌트(e.g., `BrowserRouter`) 안에 넣어야 한다는 내용뿐이었다. (애초에 그건 이미 에러 메시지에 쓰여있다.)
그리고 안타깝게도 에러 메시지의 해결법대로 하고 있었기 때문에 이는 해결법이 될 수 없었다. 더불어 기존 코드단에서 에러가 발생하지 않는 점으로 미루어 짐작컨대 이는 테스트 코드에서 발생한 문제라고 보는 것이 합리적이었다.

## 해결

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

## Router

`MemoryRouter`는 `react-router`가 제공하는 라우터 컴포넌트 중에 하나이다. 여태는 `HashRouter`와 `BrowserRouter`만 알고 있었을 뿐 아니라 솔직히 말하자면 다른 라우터 종류가 있다는 걸 까먹고 있었다. 다른 라우터 컴포넌트가 필요한 상황을 마주해보지 못해 무작정 `BrowserRouter`만을 사용해왔다. 이참에 각 라우터들의 의의와 쓰임새를 정리해보고 추후 학습 및 실무에 적용해보고자 한다.

[React Router 공식 문서](https://reactrouter.com/en/main/routers/picking-a-router)의 내용을 살펴보니 v6.4부터 라우터를 선언하는 방식이 업데이트된 듯하다. (근데 왜 굳이 헷갈리게 같은 기능을 하는 두 방식을 마치 다른 것처럼 챕터화 해놓은지 모르겠다...)

> e.g., `BrowserRouter` -> `createBrowserRouter`

당연히 새롭게 추가된 방식이 권장되고 있다. 
하지만 왜 바뀐 것이고 왜 변경된 `create*Router` 방식이 더 권장되는 것인지는 추가 학습이 필요하기도 하고 해당 아티클의 내용을 벗어나므로 다루지 않고, 기존의 `*Router`를 기준으로 정리하고자 한다.

### BrowserRouter

`BrowserRouter`는 
- 브라우저 주소창에 있는 clean url(사람이 읽기 쉬운 시멘틱한 url을 말한다.)을 활용하여 현재 위치를 저장하고, 
- 브라우저 빌트인 히스토리 스택을 활용하여 탐색한다.

#### Type declaration

```js
declare function BrowserRouter(
  props: BrowserRouterProps
): React.ReactElement;

interface BrowserRouterProps {
  basename?: string;
  children?: React.ReactNode;
  window?: Window;
}
```

#### Props

- `basename`: 앱의 모든 경로에 쓰일 기본 url이다.
- `children`: 라우터의 콘텐츠로 쓰일 단일 엘리먼트이다. 
- `window`: 현재 문서의 윈도우 객체를 나타내는 객체이다. `BrowserRouter` 컴포넌트가 다른 윈도우 url에 대한 변경 사항을 추적하는데 사용되는 경우에만 필요하다.

e.g.,

```js
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter basename="/app">
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} /> {/* /app/ */}
        <Route path="/about" element={<About />} /> {/* /app/about */}
      </Routes>
    </BrowserRouter>
  );
}
```

#### 특징

- Clean URLs
  - `BrowserRouter`는 불필요한 매개 변수와 관련 없는 문자가 없는 Clean URL을 사용한다. 
  - 브라우저의 주소창에 표시된 현재 위치를 저장하고 논리적이고 의미 있는 파일 경로 및 이름을 사용한다. 
  - 이를 통해 사용자가 URL을 쉽게 읽고 이해할 수 있으며, 앱의 검색엔진 최적화(SEO) 기능도 향상시킬 수 있다.

- Built-in history stack
  - `BrowserRouter`는 내장 히스토리 스택을 활용하여 경로 간을 탐색한다.  
  - 따라서 사용자, 앞으로, 뒤로 버튼을 사용하여 앱을 탐색하고, 특정 경로를 북마크하고 공유할 수 있다.

- Top-level component
  - `BrowserRouter`는 앱을 구성하는 다른 모든 컴포넌트를 감싸는 최상위 컴포넌트로 사용되도록 설계되었다.
  - 이를 통해 DOM을 수동으로 조작하거나 명령적인 코드를 사용할 필요없이 현재 경로를 반영하도록 앱의 UI를 업데이트할 수 있다.

- Tracks changes to window object
  - `BrowserRouter`는 `iframe`과 같은 다른 윈도우 객체의 url에 대한 변경 사항을 추적하는데 사용할 수 있다.
  - 이를 통해 `iframe` 내에서 라우팅을 관리하거나 별도의 윈도우 url에 대한 추적하는데 사용할 수 있다.

### HashRouter

`HashRouter`는 url을 서버로 전송할 수 없거나 전송하면 안되는 경우에 사용한다. 
  - 이는 서버를 완전히 제어하지 못하는 일부 공유 호스팅 시나리오에서 발생할 수 있다. 
  - 이러한 상황에서 `HashRouter`는 현재 위치를 현재 url의 해시 부분에 저장하여 서버로 전송되지 않게 한다.

Type declaration 및 Props는 `BrowserRouter`와 동일하다.

e.g.,

```js
import { HashRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <HashRouter basename="/app">
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} /> {/* /app#/ */}
        <Route path="/about" element={<About />} /> {/* /app#/about */}
      </Routes>
    </HashRouter>
  );
}
```

#### 특징

- hash-based URLs
  - `HashRouter`는 해시(#) 뒤에 경로가 오는 url을 사용한다.
  - 서버가 clean url을 지원하지 않거나 앱을 서버의 하위 디렉토리에 배포해야 하는 상황에서 유용하다.

- Top-level component
  - `BrowserRouter`와 동일하다.

- Tracks changes to window object
  - `BrowserRouter`와 동일하다.

- Does not require server-side support
  - 해시 기반 url을 사용하기 때문에 서버에서 clean url을 지원하거나 특정 라우팅 로직을 사용할 필요가 없다.
  - 이는 앱을 서버에 더 쉽게 배포하거나 로컬 파일 시스템에서 실행할 수 있게 한다.

사실 특징을 달리 말하면 반드시 `HashRouter`를 써야하는 상황이 아니라면 굳이 쓸 이유가 없다고 정리할 수 있다.

### MemoryRouter

`MemoryRouter`는 
- 내부적으로 배열에 위치를 저장한다. 
- `BrowserHistory`나 `HashHistory`와 달리 브라우저의 히스토리 스택처럼 외부 소스에 얽매이지 않는다. 
- 따라서 테스트와 같이 히스토리 스택을 완벽하게 제어해야 하는 시나리오에 이상적이다. 

#### Type declaration

```js
declare function MemoryRouter(
  props: MemoryRouterProps
): React.ReactElement;

interface MemoryRouterProps {
  basename?: string;
  children?: React.ReactNode;
  initialEntries?: InitialEntry[];
  initialIndex?: number;
}
```

#### Props

- `basename`, `children`: `BrowserRouter` 및 `HashRouter`와 동일하다.
- `initialEntries`: 
  - 라우터에서 렌더링할 경로의 초기 집합을 나타내는 문자열 배열이다. 
  - 라우터에 특정 경로 집합을 미리 로드하거나 앱이 처음 렌더링될 때 초기 경로를 설정하는 데 사용할 수 있다.
  - 기본값은 `["/"]`이다.
- `initialIndex`: 
  - `initialEntries` 배열에서 초기 경로의 인덱스를 나타내는 정수이다. 
  - 이를 사용하여 앱이 처음 렌더링될 때 활성화할 초기 경로를 지정할 수 있다.
  - 기본값은 초기 항목의 마지막 인덱스다.

e.g., 

```js
import { create } from "react-test-renderer";
import { MemoryRouter, Routes, Route } from "react-router-dom";

describe("My app", () => {
  it("renders correctly", () => {
    let renderer = create(
      <MemoryRouter initialEntries={["/users/mjackson"]}>
        <Routes>
          <Route path="users" element={<Users />}>
            <Route path=":id" element={<UserProfile />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
```

#### 특징

- Uses in-memory history stack: 
  - `MemoryRouter`는 in-memory 히스토리 스택을 사용하여 앱의 경로를 관리하고 탐색을 처리한다. 
  - 따라서 루트가 브라우저 주소창에 유지되지 않고 사용자가 브라우저의 앞으로, 뒤로 버튼 등을 사용하여 앱을 탐색할 수 없다. 
  - 앱이 자체 라우팅 및 탐색을 관리해야 하거나 서버가 정리 URL을 지원하지 않는 상황에서 유용하다.
  
- Simulates browser history: 
  - 브라우저의 주소창에 유지되지 않음에도 불구하고 `MemoryRouter`는 브라우저 기록 스택의 동작을 시뮬레이션한다.
  - `history.push()`, `history.replace()`, `history.goBack()`, `history.goForward()` 등의 메소드를 사용하여 사용자가 다른 경로로 이동하거나 히스토리 스택을 탐색할 수 있게 한다.

- Top-level component: 
  - `BrowserRouter` 및 `HashRouter`와 동일하다.

- Does not require server-side support: 
  - `HashRouter`와 동일하다.

### NaitiveRouter 

React Naitive 앱에서 사용이 권장되는 라우터다. 따라서 본 글에서는 생략한다.

### Router

`Router`는 
  - 모든 라우터 컴포넌트에서 공유하는 로우 레벨의 인터페이스다.
  - 리액트 앱의 나머지 부분에 라우팅 정보를 제공하는 context provider이다.

대개 수동으로 `Router`를 렌더링할 필요는 없다. 대신 환경에 따라 상위 레벨의 라우터 중 하나를 사용해야 한다. 주어진 앱에 라우터가 하나만 있으면 된다.

### StaticRouter

`StaticRouter`는
  - node에서 React Router 웹 앱을 렌더링하는 데 사용된다. 
  - `location` prop을 통해 현재 위치를 제공한다.

## 맺으며

처음으로 무지성 `BrowserRouter` 사용에서 벗어날 수 있게 되었다. 여전히 대부분의 경우엔 `BrowserRouter`를 사용하게 되리란 것엔 변함이 없다. 다만 알고 쓰는 것과 모르고 쓰는 것엔 큰 차이가 있지 않나. 이 학습 및 문제의 출발점이었던 테스트 코드 작성에 있어선 `MemoryRouter`를 적절히 활용하는 것이 해결이 될 수 있다는 것을 알게 되었다. 이제 남은 것은 많은 연습을 통해 숙련도를 늘리는 것...
