---
title: "Virtual Dom에 대한 환상"
excerpt: '브라우저에서 빠른 가상돔이라 했더니 너가 그렇게 빠르냐며 렌더링돌린 선임 아직도 생각나네'
tags: ['React', 'DOM', 'Virtual Dom', 'Rendering']
coverImage: "/images/posts/myth-of-virtual-dom/cover.jpg"
date: '2022-02-02'
ogImage:
  url: '/images/posts/myth-of-virtual-dom/cover.jpg'
---

### 개요

'**가상 DOM은 빠르다**'는 말이 있다. 당연히 비교 대상은 실제 DOM이다. 사람들은 Svelte가 가상 DOM을 사용하지 않고 어떻게 속도가 빨라질 수 있는지 묻곤 한다.

많은 프레임워크들은 `render()` 함수를 통해 빌드하곤 한다. 이렇게 생성된 것이 가상DOM이다. 이를 통해 앱의 상태를 업데이트할 때마다 새로운 상태를 만든다. 프레임워크의 역할은 새로운 것을 기존 것과 비교하여 조정하고, 어떤 변화가 필요한지 파악하여 실제 DOM에 적용하는 것이다.

> 대부분의 DOM 작업이 느린 경향이 있기 때문에 가상 DOM을 이용한 작업은 실제로 속도가 매우 빠르다. DOM에서 많은 성능 작업이 수행되었지만 대부분의 DOM 작업은 프레임을 삭제하는 경향이 있다. - In Rethinking Best Practices, a seminal 2013 talk by former React core team member Pete Hunt

그런데 생각해보면 가상 DOM 작업은 실제 DOM에 대한 최종 작업 외에 추가로 수행되는 것이다. 그렇다면 가상 DOM은 느린가? 그건 아니다.  다만 '가상 DOM이 일반적으로 충분히 빠름'에 가깝지만 주의할 점은 있다는 것이 결론이다.

React의 원래 약속은 **성능에 대한 걱정 없이 모든 상태 변경 시 전체 앱을 다시 렌더링할 수 있다는 것**이었다. 실제로 이는 다소 부정확하다. 만약 저 약속이 사실이라면 `shouldComponentUpdate`(안전하게 구성 요소를 건너뛸 수 있는 시기를 React에 알려주는 방법)와 같은 최적화가 필요하지 않을 것이다. `shouldComponentUpdate`를 사용하더라도 전체 앱의 가상 DOM을 한 번에 업데이트하는 것은 꽤나 많은 작업이다. React 팀은 업데이트 내용을 더 작은 덩어리로 나눌 수 있는 React Fiber라는 것을 소개했다. 즉, 업데이트는 전체 작업량 또는 업데이트 소요 시간을 줄이지는 않지만 오랜 시간 동안 기본 스레드를 차단하지 않는다는 것이다.

### 그렇다면 간접비용(overhead)은 어디서 기인하는가?

분명한 것은 `diffing`은 공짜가 아니라는 거다. 새 가상 DOM을 이전 스냅샷과 비교하지 않으면 실제 DOM에 변경 내용을 적용할 수 없다. 그 비교 과정에서 결과론적으로 봤을 때 불필요한 작업을 하는 것이 대부분 필연적이다. (그 과정들을 생략한 코드는 Svelte가 생성하는 업데이트 코드와 거의 일치한다. 기존 UI 프레임워크와 달리, 스벨트는 런타임에 작업을 하기 위해 기다리지 않고 빌드 시 앱의 상황이 어떻게 변할 수 있는지를 아는 컴파일러다.)

한편 `difiing`만 있는 것도 아니다. React 및 기타 가상 DOM 프레임워크에서 사용되는 다른 알고리즘은 속도가 빠르다. 거의 틀림없이 컴포넌트 자체에 더 큰 오버헤드가 있다. 이를테면 모든 업데이트에서 값을 쓸데없이 다시 계산한다거나. 불필요한 작업을 수행하는 것은 아무리 사소해보일지라도 그것들이 모이면 우린 결국 숟가락 살인마에게 당하는 것이다. 심지어 이를 최적화할 때 해결해야할 명확한 병목 현상도 없다. 스벨트는 그런 상황에 처하는 것을 막기 위해 설계되었다.

### 그렇다면 왜 프레임워크에서 가상 DOM을 사용하는 걸까?

가상 DOM은 어디까지나 선언 주도 UI 개발(declarative programming)을 위한 수단이다. 다시 말해 가상 DOM은 기능이 아니다. 가상 DOM은 상태 전환에 대한 생각 없이, 일반적으로 충분한 성능으로 앱을 구축할 수 있는 것에 가치가 있다. 이는 지루한 작업과 복잡한 코드를 줄여주고 창의적인 작업에 더 많은 시간을 할애할 수 있게 한다. 그러나 가상 DOM을 사용하지 않고도 유사한 프로그래밍 모델을 달성할 수 있다는 것이 밝혀졌다. 그게 바로 Svelte다.

출처: [Virtual DOM is pure overhead](https://svelte.dev/blog/virtual-dom-is-pure-overhead)
