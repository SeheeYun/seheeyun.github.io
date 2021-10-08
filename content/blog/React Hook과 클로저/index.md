---
title: "React Hook과 클로저"
date: "2021-09-15"
tags: ["react", "javascript"]
---

> **useEffect를 컴포넌트 안에서 불러내는 이유는 무엇일까요?** useEffect를 컴포넌트 내부에 둠으로써 effect를 통해 count state 변수(또는 그 어떤 prop에도)에 접근할 수 있게 됩니다. 함수 범위 안에 존재하기 때문에 특별한 API 없이도 값을 얻을 수 있는 것입니다. Hook은 자바스크립트의 **클로저**를 이용하여 리액트에 한정된 API를 고안하는 것보다 자바스크립트가 이미 가지고 있는 방법을 이용하여 문제를 해결합니다.

React 공식 문서를 보고있는데 계속 클로저가 언급된다. 알고보니,

함수형 컴포넌트는 리액트 컴포넌트를 리턴하는 함수이고, 필요할 때마다 다시 함수를 호출하여 렌더링을 한다. 함수형 컴포넌트의 상태관리를 하기 위해선 **함수가 다시 실행됐을 때의 이전 상태를 기억하고 있어야하고, react hooks는 이를 위해 JS의 클로저를 활용**한 것이다.

클로저란?

> 클로저는 반환된 내부함수가 자신이 선언됐을 때의 환경(Lexical environment)인 스코프를 기억하여 자신이 선언됐을 때의 환경(스코프) 밖에서 호출되어도 그 환경(스코프)에 접근할 수 있는 함수

> 전역변수를 사용하지않고 어떤 변수의 값을 외부에 개입을 차단, 은닉해서 사용할수있는 함수

클로저는 내부함수가 유효한 상태에서 외부함수가 종료하여 외부함수의 실행 컨텍스트가 반환되어도(실행 컨텍스트 스택에서 사라진다는 말), **외부함수 실행 컨텍스트 내의 활성 객체(Activation object)(변수, 함수 선언 등의 정보를 가지고 있다)는 내부함수에 의해 참조되는 한 유효하여 내부함수가 스코프 체인을 통해 참조할 수 있는 것**을 의미한다.

React hook에서는 useState를 통해 생성한 상태를 접근하고 유지하기 위해서 useState 바깥쪽에 state를 저장한다고한다.

클로저의 개념을 공부할 때 체감으로 다가오는 예시가 없어서 잘 이해가 되지않았었는데 아주 가까이에서 사용되고있었다. 소름

#### 도움 받은 글

https://hewonjeong.github.io/deep-dive-how-do-react-hooks-really-work-ko/<br/>
https://yeoulcoding.tistory.com/149#recentEntries<br/>
https://velog.io/@ggong/useState-Hook과-클로저<br/>
https://poiemaweb.com/js-closure
