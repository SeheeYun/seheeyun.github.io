---
title: "210523"
tags: ["TIL", "Gatsby"]
---

내가 이루고픈 큰 목표를 위해선 작은 목표들과 그에 대한 실천이 선행되어야한다.
목표들을 달성하는데 동기부여를 하고 그 날 공부한 것을 되돌아보기위해 TIL를 작성해보자!

- 오늘 한 일과 배운것을 기록하면서 애매했던 개념들을 확실히 정리한다.
- 간단하게 하루 동안 느낀점이나 생각을 정리한다.

## Today

#### GatsbyJS로 블로그 구현

https://www.gatsbyjs.com/docs/ 튜토리얼 & 가이드

- 공식 문서가 잘 정리돼있고 [Starters](https://www.gatsbyjs.com/starters/?v=2)에서 이미 만들어져 있는 템플릿을 활용할 수 있어서 비교적 쉽게 구현할 수 있다.
- [GraphQL](https://graphql.org/)은 처음 활용해 보는데, [GraphiQL](https://www.electronjs.org/apps/graphiql)를 이용해서 받아올 데이터를 미리 테스트해볼 수 있어서 접근성이 좋은것같다.
- gatsby는 배포하기전 `빌드` 시점에 소스들을 html로 렌더링하기때문에 `배포` 시 소스들이 변환되어져있다. 만들어둔 소스코드을 유지하기 위해 브랜치를 나눠서 사용한다.
  > 빌드: 소스 코드 파일을 컴퓨터나 휴대폰에서 실행할 수 있는 독립 소프트웨어 가공물로 변환하는 과정을 말하거나 그에 대한 결과물을 일컫는다. <br> 배포: 빌드가 완료된 실행파일을 사용자가 접근할 수 있는 환경에 배치하는 일
- 키워드를 이용해 글을 찾을 수 있도록 태그 기능을 추가했다.

#### 도움 받은 글

https://velog.io/@magnoliarfsit/TIL-Session-Gatsby로-블로그-만들기
https://www.gatsbyjs.com/docs/adding-tags-and-categories-to-blog-posts/
https://wayhome25.github.io/
