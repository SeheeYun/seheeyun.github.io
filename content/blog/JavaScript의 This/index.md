---
title: "JavaScript의 This"
date: "2021-08-26"
tags: ["javascript"]
---

다른 언어들에서 `this`는 자기자신, 생성된 오브젝트인 자신을 가리키는 것인데 자바스크립트의 경우 함수 호출 방식에 의해 this에 바인딩할 객체가 동적으로 결정된다.<br/> 다시 말해, 함수를 선언할 때 this에 바인딩할 객체가 정적으로 결정되는 것이 아니고, 함수를 호출할 때 **함수가 어떻게 호출되었는지에 따라 this에 바인딩할 객체가 동적으로 결정**된다.

### 전역 객체와 let

전역 객체(Global Object)는 모든 객체의 유일한 최상위 객체를 의미하며 일반적으로 Browser-side에서는 window 객체, Server-side(Node.js)에서는 global 객체를 의미한다. 전역 코드에서 선언된 함수나 var 키워드로 선언된 전역 변수는 전역 객체의 프로퍼티가 된다.

**const, let** 키워드로 선언된 변수를 전역 변수로 사용하는 경우, **let 전역 변수는 전역 객체의 프로퍼티가 아니다.** 즉, `window.foo`와 같이 접근할 수 없다. **let 전역 변수는 보이지 않는 개념적인 블록 내에 존재하게 된다.**

### this 바인딩

```js
class Counter {
  count = 0
  increase = function () {
    console.log(this)
  }
}

const counter = new Counter()
counter.increase() // Counter

const caller = counter.increase
caller() // undefined
```

위와 같은 코드가 있다고 가정했을 때, counter.increase()는 Counter를 출력하고 caller()는 undefined를 출력한다.

변수 counter는 인스턴스화 된 Counter이기때문에 increase()를 호출한 this는 Counter이고 그래서 this는 Counter를 가르킨다.

변수 caller는 couter에 있는 increase라는 함수 자체를 가르킨다는 것이다.
caller는 this를 출력하는 함수 객체를 담고있는데, 그 함수를 담고있는 caller라는 변수는 const로 선언했고 전역 객체에 등록되지 않는다.

그 말은 this를 출력하는 함수를 caller()로 실행해도 caller()를 호출하는 this가 아무것도 아니기때문에 undefined로 출력되는 것이다.

이와 같이 동적으로 변하는 this의 값을 고정시키기위해 바인딩을 해준다.

### Arrow Function

bind() 함수를 사용하지 않고 class 내부에서 함수를 arrow function으로 선언해주면 this를 바인드 할 수 있다.
arrow function을 사용하면 다른 클래스 언어들처럼 선언될 당시의 this context를 유지한다.

> 화살표 함수는 자신의 this가 없습니다. 대신 화살표 함수를 둘러싸는 렉시컬 범위(lexical scope)의 this가 사용됩니다; 화살표 함수는 일반 변수 조회 규칙(normal variable lookup rules)을 따릅니다. 때문에 현재 범위에서 존재하지 않는 this를 찾을 때, 화살표 함수는 바로 바깥 범위에서 this를 찾는것으로 검색을 끝내게 됩니다.

#### 도움 받은 글

https://academy.dream-coding.com/<br/>
https://poiemaweb.com/js-this<br/>
https://developer.mozilla.org/docs/Web/JavaScript/Reference/Functions/Arrow_functions
