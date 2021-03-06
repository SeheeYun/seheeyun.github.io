---
title: "JavaScript란"
date: "2021-08-07"
tags: ["javascript"]
---

### ECMAScript와 JavaScript

**ECMAScript는 자바스크립트의 표준 명세인 ECMA-262**를 말하며 프로그래밍 언어의 타입, 값, 객체와 프로퍼티, 함수, 빌트인 객체 등 핵심 문법(core syntax)을 규정한다. 각 **브라우저 제조사는 ECMAScript를 준수하여 브라우저에 내장되는 자바스크립트 엔진을 구현**한다.

> ECMA는 European Computer Manufacturer's Association의 줄임말이며 정보와 통신 시스템을 위한 국제적 표준화 기구이다. ECMAScript는 JavaScript와 같은 스크립트 언어의 표준을 말한다.

> ES6(=ES2015)이란 ECMAScript 6이라는 의미로, ECMA-262 표준의 제6판이다.

> 이들 엔진은 각자 퍼포먼스가 다르고, 지원되는 ECMAScript도 다르다. ECMAScript가 새로운 버전을 발표하면 이에 맞춰서 JavaScript 엔진도 사양을 준수하도록 점진적으로 업데이트를 해준다. 즉, **브라우저마다 ECMAScript를 지원하는 범위가 각자 다르기 때문에, 각 브라우저마다 호환성 문제(Cross Browser Issues)가 발생**한다. 이러한 문제를 위해 **바벨 babel**이라는 오픈소스 JavaScript 트랜스 파일러를 사용한다. 바벨은 ES6 사양 기준으로 작성된 코드를 이전 버전과 호환되는 JavaScript버전으로 변환해준다. 주요 브라우저는 ES5까지 지원하기 때문에 바벨이 ES5코드로 변경해주어 호환성 문제를 해결 할 수 있게 해준다.

자바스크립트는 일반적으로 프로그래밍 언어로서 기본 뼈대를 이루는 ECMAScript와 브라우저가 별도 지원하는 클라이언트 사이드 Web API, 즉 DOM, BOM, Canvas, XMLHttpRequest, Fetch, requestAnimationFrame, SVG, Web Storage, Web Component, Web worker 등을 아우르는 개념이다.

클라이언트 사이드 Web API는 ECMAScript와는 별도로 World Wide Web Consortium (W3C)에서 별도의 명세로 관리하고 있다.

### JavaScript의 특징

자바스크립트는 개발자가 별도의 컴파일 작업을 수행하지 않는 **인터프리터 언어 Interpreter languag**이다.

> 인터프리터(interpreter)는 고급 언어로 작성된 원시 코드를 한번에 한 줄씩 읽어들여서 바로 실행하는 컴퓨터 프로그램 또는 환경을 말한다. 원시 코드를 기계어로 번역하는 컴파일러와 대비된다.

대부분의 모던 자바스크립트 엔진(Chrome의 V8, FireFox의 Spidermonkey, Safari의 JavaScriptCore, Microsoft Edge의 Chakra 등)은 **인터프리터와 컴파일러의 장점을 결합**하여 비교적 처리 속도가 느린 인터프리터의 단점을 해결했다. 인터프리터는 소스코드를 즉시 실행하고 컴파일러는 빠르게 동작하는 머신 코드를 생성하고 최적화한다. 이를 통해 컴파일 단계에서 추가적인 시간이 필요함에도 불구하고 보다 빠른 코드의 실행이 가능하다.

자바스크립트는 명령형(imperative), 함수형(functional), 프로토타입 기반(prototype-based) 객체지향 프로그래밍을 지원하는 멀티 패러다임 프로그래밍 언어다.

비록 다른 객체지향 언어들과의 차이점에 대한 논쟁들이 있긴 하지만, 자바스크립트는 강력한 객체지향 프로그래밍 능력을 지니고 있다. 간혹 클래스(ES6에서 새롭게 도입되었다), 상속, 정보 은닉을 위한 키워드 private가 없어서 객체지향 언어가 아니라고 오해(자바스크립트는 가장 많은 오해를 받는 언어이다.)하는 경우도 있지만 자바스크립트는 클래스 기반 객체지향 언어보다 효율적이면서 강력한 **프로토타입 기반**의 객체지향 언어이다.

#### 도움 받은 글

https://sustainable-dev.tistory.com/105<br/>
https://poiemaweb.com/js-introduction
