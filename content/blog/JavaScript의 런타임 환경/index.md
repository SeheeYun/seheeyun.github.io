---
title: "JavaScript의 런타임 환경"
date: "2021-08-07"
tags: ["javascript", "browser"]
---

### 프로세스와 스레드

- **프로세스**<br/>
  독립적인 메모리 공간을 할당받아 실행되고 있는 프로그램. 운영체제의 관점에서 최소 작업 단위이다.
- **스레드**<br/>
  스레드는 프로세스의 코드에 정의된 절차에 따라 실행되는 특정한 수행 경로로서 각각 저마다 수행해야하는 업무를 가지고있다. 각각 자신들만의 **수행해야하는 함수의 호출을 기억해야하기 때문에** 프로세스가 할당받은 메모리 공간 내에서 스레드마다 **Stack 영역의 메모리 공간을 따로 할당**받는다. 나머지 **Code/Data/Heap 영역의 메모리 공간은 공유**한다.

위 같은 구조로 한 프로세스에서 오류가 발생하면 해당 프로세스만 죽게되지만, 스레드는 메모리 영역을 공유하므로 하나의 스레드에서 오류가 발생하면 같은 프로세스 내의 다른 스레드 모두 죽게된다.

스레드는 기본 구조 자체가 메모리를 공유하는 구조이기 때문에 다른 스레드와 정보 공유가 쉽다. 때문에 멀티태스킹보다 **멀티스레딩이 자원을 아낄 수 있게 된다.** 다만 서로 다른 스레드가 데이터와 힙 영역을 공유하면서 문제가 발생할 수 있고 이에대해 프로그래머가 직접 동기화 문제에 대응할 수 있어야 한다.

### JavaScript 엔진의 이해

![자바스크립트 엔진 구조](https://joshua1988.github.io/images/posts/web/translation/how-js-works/js-engine-structure.png)
자바스크립트 엔진은 위와같이 크게 `Memory Heap`과 `Call Stack`으로 나누어져있다.<br/>
[참고1](https://velog.io/@hidaehyunlee/메모리-구조를-알아보자) [참고2](https://curryyou.tistory.com/276)

자바스크립트는 멀티스레딩이아닌 싱글 스레드 언어이다. 하지만 자바스크립트가 동작하는 브라우저는 여러개의 스레드를 가지고있고 이 브라우저가 제공하는 웹 APIs(fetch, setTimeout, eventListener 등)들을 이용하게 되면 멀티스레딩이 가능하다.

### 브라우저 런타임 환경의 이해

![자바스크립트 런타임 환경 구조](https://joshua1988.github.io/images/posts/web/translation/how-js-works/js-engine-runtime.png)

1. **Call Stack**<br/>
   함수를 호출하게 되면 이 콜 스택에 함수 실행 컨텍스트가 쌓인다. 실행되고 나면 콜 스택에서 사라진다.
   맨 위에 항목을 추가하는 push, 맨 위의 항목을 떼어내는 pop을 이용한 후입 선출(LIFO, Last-In First-Out)의 구조를 가진다.<br/>
   자바스크립트는 한개의 콜 스택을 가지고있기때문에 **하나의 함수가 실행되면 다른 일을 수행 할 수 없고 이 함수는 끝날 때까지 보장된다.**
2. **Web APIs**<br/>
   함수 안에서 web api를 사용하게되면 자바스크립트 엔진과 **병렬적으로 실행**되고 등록한 콜백을 task queue에 집어넣는다.
3. **Task Queue**<br/>
   선입 선출(FIFO, First In First Out)의 구조를 가진다.
4. **Event Loop**<br/>
   빙글 빙글 돌면서 콜 스택과 태스크 큐를 관찰한다. 콜 스택에 쌓여있는 컨텍스트들이 모두 실행되어 **스택이 비어있는 상태가되면 태스크 큐에있는 콜백 함수를 콜 스택에 추가**하고 함수가 실행된다. **태스크 큐에 여러개의 콜백이 있어도 한 번에 한 개의 콜백만 가져온다.**

#### 도움 받은 글

https://velog.io/@raejoonee/프로세스와-스레드의-차이<br/>
https://academy.dream-coding.com/<br/>
[사용된 그림 출처](https://joshua1988.github.io/web-development/translation/javascript/how-js-works-inside-engine/)
