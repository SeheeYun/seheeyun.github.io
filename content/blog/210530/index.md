---
title: "210530"
date: "2021-05-30"
tags: ["javascript"]
---

## Today

### window.matchMedia()

컴포넌트의 크기를 js를 이용해서 동적으로 계산해주고 있을때, viewport크기에 따라 다른 수치를 주기위해 matchMedia 메서드 사용

**Window.matchMedia()** 메서드는 주어진 [미디어 쿼리](https://developer.mozilla.org/ko/docs/Web/CSS/Media_Queries/Using_media_queries) 문자열의 분석 결과를 나타내는 [MediaQueryList](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList) 객체를 반환한다.

**MediaQueryList**는 특정 document에 적용된 media query에 관한 정보를 포함하는 객체이다. MediaQueryLIst는 matches, media 두 프로퍼티를 포함한다.

- MediaQueryList.matches<br>
  해당 document 가 주어진 미디어 쿼리를 만족하는지 여부로, boolean 값이다.
- MediaQueryList.media<br>
  주어진 미디어 쿼리를 string 으로 serialize 한 값이다.
  > 직렬화: 데이터나 오브젝트를 동일하거나 다른 컴퓨터 환경에 저장하고 나중에 재구성할 수 있는 포맷으로 변환하는 과정이다. 반대로, 일련의 바이트로부터 데이터 구조를 추출하는 일은 역직렬화 deserialization)이라고 한다.

MediaQueryList는 미디어 쿼리에 관한 정보를 담고 있기 때문에 미디어 쿼리가 변경되면 change 이벤트를 발생시킬 수 있다. 이 change 이벤트를 핸들링하는 이벤틑 리스너를 추가해주면 주어진 미디어 쿼리를 충족하는지 watch 할 수 있고, 결과적으로 programmatic 하게 미디어 쿼리를 사용할 수 있다.

프로젝트에 [custom hook](https://ko.reactjs.org/docs/hooks-custom.html)으로 만들어서 적용했다.

#### 도움 받은 글

https://eunsukim.me/posts/how-to-use-media-query-with-javascript-matchmedia
https://developer.mozilla.org/ko/docs/Web/API/Window/matchMedia
https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList
https://www.netlify.com/blog/2020/12/05/building-a-custom-react-media-query-hook-for-more-responsive-apps/
