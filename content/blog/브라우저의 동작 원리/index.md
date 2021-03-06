---
title: "브라우저의 동작 원리"
date: "2021-07-07"
tags: ["browser", "javascript"]
---

브라우저의 핵심 기능은 사용자가 참조하고자 하는 웹페이지를 서버에 요청(Request)하고 서버의 응답(Response)을 받아 브라우저에 표시하는 것이다.<br/>
브라우저는 **서버로부터 HTML, CSS, Javascript, 이미지 파일 등을 응답받는다. HTML, CSS 파일은 렌더링 엔진의 HTML 파서와 CSS 파서에 의해 파싱(Parsing)되어 DOM, CSSOM 트리로 변환되고 렌더 트리로 결합된다. 이렇게 생성된 렌더 트리를 기반으로 브라우저는 웹페이지를 표시**한다.
이 일련의 과정을 **Critical Rendering Path**라고 한다.

### Critical Rendering Path

주요 렌더링 경로(CRP, Critical Rendering Path)를 최적화하면 최초 페이지 렌더링에 걸리는 시간을 상당히 단축시킬 수 있다. 또한, 주요 렌더링 경로에 대한 이해를 토대로 뛰어난 성능의 대화형 애플리케이션을 빌드할 수도 있다.

1. HTML 마크업을 처리하고 DOM 트리를 빌드
2. CSS 마크업을 처리하고 CSSOM 트리를 빌드
3. DOM 및 CSSOM을 결합하여 렌더 트리를 형성한다. 이때, 최종적으로 브라우저에 표기될 것들만 선별하여 Render 트리를 만들게 된다(헤드는 표시되지않는 부분이기때문에 포함되지않고, 만약 display: none인 요소가 있다면 이 또한 렌더트리에 포함시키지 않는다)
4. layout: 렌더 트리엔 화면에 표시되는 모든 노드의 콘텐츠 및 스타일 정보가 포함되어있고 이 데이터를 기반으로 기기의 **뷰포트** 내에서 노드의 정확한 위치와 크기를 계산한다.
5. Paint: 속성 상태에 따라 레이어(그룹)를 만든다. 변경에 대응하기위해 부분적으로 레이어를 나눠놓고 color, background-color, border-color 등 작업을 진행한다.
6. composition: paint에서 만들어진 레이어 순서대로 화면에 그리는 작업을 한다.

렌더 트리가 수정되어서 layout 단계가 다시 발생하는 경우를 reflow라고 한다. 이는 어플리케이션의 성능을 떨어뜨리는 요인으로 **애니메이션이 발생할 때 reflow가 일어나지 않도록 해야한다.**
외에도 리소스가 적을수록 당연히 트리를 만드는데 걸리는 시간도 적어진다. 리소스의 크기를 줄이거나 최적화해서 렌더링 성능을 향상시킬 수 있다.

### async와 defer

![브라우저 동작 원리](https://poiemaweb.com/img/client-server.png)
자바스크립트는 렌더링 엔진이 아닌 자바스크립트 엔진이 처리한다. HTML 파서는 **script 태그를 만나면 자바스크립트 코드를 실행하기 위해 DOM 생성 프로세스를 중지하고 자바스크립트 엔진으로 제어 권한을 넘긴다.** 제어 권한을 넘겨 받은 자바스크립트 엔진은 script 태그 내의 자바스크립트 코드 또는 script 태그의 src 어트리뷰트에 정의된 자바스크립트 파일을 로드하고 파싱하여 실행한다. 자바스크립트의 실행이 완료되면 다시 HTML 파서로 제어 권한을 넘겨서 브라우저가 중지했던 시점부터 DOM 생성을 재개한다.

이처럼 브라우저는 **동기(Synchronous)적으로 HTML, CSS, Javascript을 처리**한다. 이것은 script 태그의 위치에 따라 블로킹이 발생하여 DOM의 생성이 지연될 수 있다는 것을 의미한다. 따라서 script 태그의 위치는 중요한 의미를 갖는다.

기존에는 `<body>`태그 가장 아래에 스크립트를 삽입하여 이 문제를 해결하였으나, 내가 표시해야하는 콘텐츠가 자바스크립트에 의존적인 콘텐츠라면 html을 파싱하고 자바스크립트를 받아오고 실행하기까지의 긴 시간동안 정상적인 콘텐츠를 표시할 수 없다.

문제를 해결하는 다른 옵션으로 `<script>` 요소의 asynd, defer 속성을 사용하는 것이다.

- **async**<br/>
  async 속성이 있는 스크립트를 만나면 병렬적으로 다운로드한다, 하지만 실행할 때는 html 파싱하던 것을 멈추고 스크립트를 실행시키기 때문에 스크립트가 html 요소를 이용하는 것이라면 요소가 파싱되기도 전에 실행되므로 오류가 발생된다.
  그리고 다수의 스크립트를 async로 다운받게 될 경우 작성한 순서와 상관없이 먼저 다운로드되는 것이 먼저 실행된다. 스크립트 순서가 중요하다면 문제가 발생 할 것이다.
- **defer**<br/>
  마찬가지로 스크립트를 병렬적으로 다운로드하지만 async와 다르게 **html 파싱이 끝난 후에 스크립트가 실행**된다. 순서도 작성한 순서대로 실행된다.<br/>
  이 역시 스크립트가 실행되기까지의 시간이 필요하므로 상호작용이 가능한 요소가 준비되지않았다면 그에대한 별도의 표시나 조치가 필요하다.

#### 도움 받은 글

https://poiemaweb.com/js-browser<br/>
https://developers.google.com/web/fundamentals/performance/critical-rendering-path?hl=ko<br/>
https://academy.dream-coding.com/<br/>
[사용된 그림 출처](https://poiemaweb.com/js-browser)
