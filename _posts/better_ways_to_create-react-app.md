---
title: "리액트 앱을 만드는 7가지 방법"
excerpt: '아직도 CRA밖에 쓸 줄 모른다면 주목!'
tags: ['Javascript']
coverImage: "/images/posts/better_ways_to_create-react-app/cover.png"
date: '2023-02-05'
ogImage:
  url: '/images/posts/better_ways_to_create-react-app/cover.png'
---

이 글은 Fireship의 [영상](https://www.youtube.com/watch?v=2OTq15A5s0Y)을 번역 및 각색하여 작성한 것이다.

리액트 입문자에게 공식 튜토리얼은 `create react app`이라고 불리는 공식 도구를 사용하라고 말한다. (심지어 Chat GPT도 그렇게 말한다.) 하지만 이건 함정이다. (함정 카드 사진 삽입) `create react app`을 사용하면 당신은 개발자 입학 시험에 통과할 수 없다.

블로거들과 유튜버들은 꽤 오랫동안 `create react app`을 사용하지 말라고 경고해왔고, 특히 Theo가 리액트 문서에서 이 도구를 완전히 제거하자고 제안하면서 이 [논쟁](https://github.com/reactjs/reactjs.org/pull/5487)은 더 불타올랐다. 리액트 팀의 Dan은 이 제안에 대해 5가지 잠재적인 옵션으로 [응답](https://github.com/reactjs/reactjs.org/pull/5487#issuecomment-1409720741)했다.

하지만 애초에 `create react app`에 대한 모든 반감 및 문제는 

- 그것이 개발에 느리고, (**Slow during development builds**)
- Tailwind나 Typescript와 같은 인기 있는 도구를 세팅하는 것이 번거롭고, (**Painful to integrate popular tools**)
- 그리고 무엇보다 리액트와 모던한 생태계를 시작할 수 있는 더 좋은 선택지가 많이 있다는 것이다. (**Better options to create react apps**)

그럼 이제 `create react app` 없이 리액트 앱을 만들 수 있는 7가지와 각각의  트레이드오프에 대해서 알아보자.

## 1. 인스턴트 개발 환경

리액트를 비롯하여 프론트엔드 프레임워크를 학습을 시작하기 위한 가장 쉬운 방법은 [StackBlitz](https://stackblitz.com/) 또는 [CodeSandbox](https://codesandbox.io/)와 같은 인스턴트 개발 환경을 사용하는 것이다.

### True zero config

이것들은 수동으로 의존성 패키지를 설치할 필요 없이 브라우저에서 리액트를 실행할 수 있게 해주는 웹 기반 도구들이다.

### Shareable

한편 쉽게 공유할 수 있다는 이점도 있다. 그래서 어떤 컴퓨터에서도 프로젝트에 쉽게 접근할 수 있다,

### Backend in ther browser

심지어 웹 컨테이너 덕분에 node.js와 next.js와 같은 백엔드 코드를 실행할 수도 있다.

전반적으로 인스턴스 개발 환경은 학습 및 프로토타이핑을 위한 훌륭한 옵션이다. 하지만 보다 진지한 앱을 빌드하려면 이를 관리하기 위한 전용 빌드 도구가 필요하며, 이 경우 의사 결정이 까다로워진다.

## 2. Vite

다음으로 살펴볼 것은 최근 자바스크립트 빌드 도구 차트의 정상에 오른 Vite다. 이미 `create react app`에 익숙하다면 Vite는 일대일 교체에 가장 가까운 도구다. 

### Fast

다만 개발 속도가 훨씬 빠르다. 왜냐하면 Vite는 내장 ES modules, esbuild 등의 도구를 사용하여 온디맨드 방식으로 어플리케이션을 빌드하기 때문이다. 

그리고 Babel 대신 훨씬 빠른 Rust 기반 컴파일러인 SWC를 사용할 수 있다. SWC는 모듈 번들링을 위해 Rollup을 사용한다.

### Support for SPA

한편 즉시 사용할 수 있는 Typescript 템플릿을 비롯하여 다른 모던 라이브러리들도 지원한다. 그러나 더 중요한 것은 SPA(Single Page Application)를 빌드하기 위한 시작점을 제공한다는 것이다.

next.js와 같은 리액트 프레임워크와 달리 Vite는 적어도 즉시 사용할 수 있는 SSR(Server Side Rendering)이나 라우팅 기능을 다루지는 않는다. 다만 Vite에는 SSR을 위한 로우 레벨의 API와 이를 지원하는 플러그인이 있다.

이는 자신의 작업에 대한 이해도가 높고 리액트 렌더링 프레임워크를 사용하고 싶지 않은 개발자들을 위한 더 고급 설정이라 할 수 있다.

핵심은 Vite가 리액트 SPA를 빌드할 때 훌륭한 옵션이라는 것이다.

## 3. NX

Vite에는 없는 몇 가지 추가 기능과 함께 독립 실행형 리액트 앱을 빌드할 수 있는 NX라는 도구도 있다. NX는 모노레포를 위한 도구로 알려져 있는데, NX의 CLI는 모노레포와 관련이 없는 일반 리액트 앱도 빌드할 수 있다. 

### Choose your own bundler

NX의 멋진 점은 새로운 프로젝트를 설정할 때 자신만의 번들러를 선택할 수 있다는 것이다.

기본적으로 Typescript로 설정되며 CSS 전처리기를 선택할 수도 있다.

### Scaling complexity

하지만 킬러 기능은 복잡성을 확장하는 것이다. 이를테면, 태스크를 캐싱하거나 클라우드에 캐시를 배포할 수도 있다. 즉, 지구 반대편에 있는 다른 팀원이나 지속적인 통합 서버가 앱을 빌드하면 동일한 작업을 반복하는 대신 캐시의 컴퓨팅 결과물을 사용할 수 있다는 것이다. 이는 큰 규모의 팀에게는 혁신적인 기능이다.

### Generators

물론 개인 개발자에게도 유용한 도구는 있다. 이를 테면 제너레이터가 그렇다. 제너레이터는 Tailwind와 같은 종속성을 자동으로 추가하거나 컴포넌트 및 라이브러리를 위해 보일러플레이트를 비계로 배치할 수 있다. 이를 통해 모든 코드가 NX 그래프 커맨드와 어떻게 관련되어 있는지 시각화할 수 있으며, 마지막으로 CI 워크플로우를 생성하여 CI/CD를 쉽게 자동화할 수 있다. 공급자를 선택하기만 하면 지루하고 오류가 발생하기 쉬운 모든 구성이 작성된다. 심지어 이는 다른 리액트 프레임워크에서도 사용할 수 있다.

## 4. Next.js

하지만 만약 단순 SPA 이상을 원한다면,  리액트 렌더링 프레임워크(a.k.a 메타 프레임워크)가 필요하게 된다. 그중에서도 가장 인기 있는 옵션은 next.js다.

### Multi-page routing, SSR with hydration

next.js 앱을 빌드할 때의 주요 차이점은 `pages` 또는 `app`과 같은 특별하고 직접적인 도움을 주는 도구(reef)가 있다는 것이다. 이들은 MPA(Multi page application)를 위한 라우팅을 구조화하거나 각 페이지가 SEO(Search Engine Optimizationm 검색 엔진 최적화) 및 성능 향상을 위해 위해 서버에서 렌더링되게 하는 데 사용될 수 있다.

### React server components

또한 의존성을 최소화하면서 풀스택 앱을 빌드하기 위해 리액트 서버 컴포넌트와 함께 서버 측 데이터를 fetch한다.

클라이언트와 서버 모두에서 보편적으로 실행될 수 있는 컴포넌트에서 `async await`를 사용할 수 있다.

이밖에도 이미지 최적화, 미들웨어 등의 유용한 기능 등을 제공한다.

## 5. Remix

하지만 이러한 기능을 제공하는 것이 next만 있는 것은 아니다. remix는 최근 Shopify에 의해 인수된 유사한 프레임워크로, 파일 시스템 기반 라우팅과 같은 많은 유사 기능을 제공한다.

next와 remix는 지난 몇 년간 경쟁해왔는데, 그 덕에 우리는 이 두 훌륭한 렌더링 프레임워크를 중 더 적합한 것을 선택하기만 하면 된다.

가장 큰 차이점은 데이터 fetching 관련된 것이다. next,js는 리액트 서버 컴포넌트를 사용하는 반면, remix는 그렇지 않다. 

두 프레임워크 모두 많은 동일한 문제를 해결하지만 개발자 경험에는 미묘한 차이가 있다. 

현재 시점(2023.02)에서 nested layouts 및 streaming과 같은 기능은 next.js에선 베타지만 remix에선 stable하다. 그래서 혁신 관점에선 remix가 한 발 앞서 있다고 볼 수 있다.

## 6. Gatsby

한편 고려할만한 또 다른 리액트 렌더링 프레임워크가 있는데, gatsby다.

### SSG + SSR

원래 gatsby는 무거운 정적으로 생성된 사이트를 빌드하는 콘텐츠로 인기가 있었다. 하지만 next.js와 remix처럼 SSR도 지원한다.

가장 두드러진 차이점은 애플리케이션을 위한 데이터 레이어를 제공하기 위해 graphql에 초점을 맞춘다는 것이다. gatsby 프론트에서 별도의 설정 없이 접근할 수 있는 모든 데이터 소스에 대한 단일 graphql API를 생성하는 Walhalla content Hub라는 것이 있다.

콘텐츠 중심 앱을 리액트로 마이그레이션하려는 경우, gatsby는 프로세스를 더 빨리 수행할 수 있는 훨씬 더 많은 도구를 보유하고 있다. 심지어 초기 설정 중에 사용할 CMS를 묻고 마크다운과 같은 기능을 추가한다.

## 7. Astro

무거운 컨텐츠 사이트의 또 다른 좋은 옵션은 astro다. 여태 살펴본 다른 모든 프레임워크와 달리 astro는 리액트 이외의 프레임워크에서도 사용할 수 있다.

### Custom templating

리액트는 매우 인터랙티브한 UI를 구축하는 데 가장 유용하다. 그러나 대부분의 프레임워크에서 리액트는 DOM 전체를 차지한다. 반면에 astro는 대부분의 정적 콘텐츠를 처리하기 위한 자체 템플릿 언어를 가지고 있으며, 아일랜드 아키텍처(*일종의 컴포넌트 중심 패러다임) 덕분에 필요에 따라 상호 작용에 분사할 수 있다.

이는 코드를 단순화시킬 뿐만 아니라 많은 경우에 당신의 웹사이트를 더 빨리 로드하도록 브라우저에 자바스크립트를 발송할 필요를 없애기 때문에 엄청난 성능 향상을 가져온다.

### Content collections

최근엔 content collections라는 새로운 기능을 가진 버전 2.0을 출시했는데, 여기서 실제 마크다운 콘텐츠는 콘텐츠 헤비 웹사이트가 안전하게 확장될 수 있는 스키마를 고수한다.

## 마치며

지금까지 `create react app`을 사용하지 않고 리액트 앱을 만들 수 있는 7가지 다른 방법을 살펴보았다. `create react app`의 미래가 어떻게 될지 확신할 수는 없지만 만약 [옵션 5(Turn Create React App into a launcher)](https://github.com/reactjs/reactjs.org/pull/5487#issuecomment-1409720741)는 아마 여기서 언급한 프레임워크 중 하나를 가리키는 앱 런처로 바뀔 확률이 높지 않을까. 혹은 생성 AI를 도구에 통합하는 옵션 6가 생겨날지도 모를 일이다.