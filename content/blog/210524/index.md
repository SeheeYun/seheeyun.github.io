---
title: "210524"
date: "2021-05-24"
tags: ["Firebase"]
---

## Today

- [x] DNS, CDN 개념 정리
- [x] firebase 공식 문서 읽어보고 실습

  card maker 프로젝트에 Firebase Authentication 적용<br>
  firebase 인증 추가해주고 ui는 따로 만들지않고 firebaseui 적용<br>
  컴포넌트에서 start 메소드를 사용 할 수있게 export 해줌

  ```js
  const startFirebaseUI = elementId => {
    ui.start(elementId, {
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
      // Other config options...
    })
  }

  export default startFirebaseUI
  ```

#### 참고

https://firebase.google.com/docs/web/setup?hl=ko&sdk_version=v8
https://firebase.google.com/docs/auth/web/firebaseui?hl=ko
https://firebaseopensource.com/projects/firebase/firebaseui-web/

## Tomorrow

- [ ] 모던 JavaScript 튜토리얼 (코드품질부터) 읽기
- [ ] 프로그래머스 코테 입문
- [ ] card maker 프로젝트 header, main, login ui 만들기
