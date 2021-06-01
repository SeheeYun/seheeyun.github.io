---
title: "210531"
date: "2021-05-31"
tags: ["react"]
---

## Today

### React Router 다른 페이지에 props 넘겨주기

어떤 페이지 컴포넌트에서 다른 페이지로 넘어갈때, 컴포넌트가 가지고있는 state를 props로 전달 해줘야하는 경우

1. Link나 useHistory hook을 이용해서 객체를 전달해주고

```js
<Link
  to={{
    pathname: "/courses",
    search: "?sort=name",
    hash: "#the-hash",
    state: { fromDashboard: true }
  }}
/>

<button onClick={() => {history.push({
  pathname: "/courses",
  state: {fromDashboard: true }
})}} />
```

2. useLocation hook으로 해당 페이지의 정보를 불러온다

```js
const location = useLocation()
console.log(location)
```

컴포넌트를 감싸는 Route 태그의 부모 요소인 BrowserRouter, Switch에 의해서 컴포넌트의 defaultProps 에는 history 객체가 들어가게 되고, 이 history 객체를 이용하여 리액트 어플리케이션 내에서 라우팅이 가능하다.<br>
react router hooks를 사용하면 각 객체에 쉽게 접근할 수 있다.

#### 도움 받은 글

https://reactrouter.com/web/api/Link
https://pythonq.com/so/reactjs/110304
https://velog.io/@dhlee91/this.props.history.push로-props-넘겨주기
https://velog.io/@yiyb0603/React-Router-dom의-유용한-hooks들

### textarea 자동 높이 증가

처음엔 간단하게 scrollHeight에 따라 textarea의 height값이 늘어나는 로직을 작성했는데 layout shift가 계속해서 발생하고 화면에 떨림이 생겨서 다른 방법을 검색해보았다.

https://css-tricks.com/auto-growing-inputs-textareas/<br>
inline-grid, dataset 이용한 방법. enter를 입력해야지만 height값이 늘어나서 사용성 떨어짐

https://github.com/Andarist/react-textarea-autosize#readme<br>
https://medium.com/@lucasalgus/creating-a-custom-auto-resize-textarea-component-for-your-react-web-application-6959c0ad68bc

직접 만들거나 라이브러리를 사용할 수도 있다.

최종적으론 프로젝트에 적용되있는 metarial ui에 [TextareaAutosize API](https://material-ui.com/api/textarea-autosize/)가 있어서 이것을 사용했다.
