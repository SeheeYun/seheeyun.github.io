---
title: "React State의 불변성"
date: "2021-09-30"
tags: ["react"]
---

### State와 Props

- state<br/>
  컴포넌트 UI를 위한 데이터를 보관하는 오브젝트로, 이 state가 업데이트 되면 render 함수가 호출 된다. 컴포넌트 안에서 정의된다.
- props<br/>
  state와 다르게 컴포넌트 외부에서 데이터를 받아온다. 외부의 데이터에따라 UI가 변경될 수 있고 재사용성을 높일 수 있다.

state와 props 객체안에 key: value는 읽기전용으로 직접 수정하면 안된다. state는 setState() 함수를 이용해서 업데이트 해야 한다.

### State의 불변성

리액트에서는 state 객체의 값을 직접적으로 수정하면 안된다. 이것을 불변성 유지라고 하는데, 'push, splice, unshift, pop'과 같은 내장함수는 배열 자체를 직접 수정하게 되므로 적합하지 않다. 대신, 기존의 배열에 기반하여 **새 배열을 만들어내는 'concat, slice, map, filter'과 같은 함수를 사용**해야 한다.

리액트는 컴포넌트의 state가 변경되면 함수를 호출해 컴포넌트를 리렌더링하고 상위의 컴포넌트가 리렌더링되면 하위의 모든 컴포넌트도 리렌더링하는데, 버츄얼 DOM tree와 실제 DOM tree를 비교해서 실질적으로 변화가있는 부분만 업데이트한다.

이 과정에서 렌더링 함수가 불필요하게 호출 되는 것을 막고자 PureComponent를 적용해 줄 수 있다. PureComponent는 props와 state에 대하여 얕은 비교를 수행하고, 변화가 없다면 함수를 호출하지않는다.

불변성 유지가 중요한 이유는 이 얕은 비교는 각 오브젝트 안에 데이터까진 확인하지않고 오브젝트의 참조만을 비교한다.

state의 데이터를 직접적으로 수정하게 될 경우 데이터의 값은 바뀌지만 참조값은 바뀌지않기 때문에 state가 변화하지않았다고 판단하여 리렌더링되지않는다.

불변성 유지를 위해 위와같이 새 배열을 만드는 메서드를 사용하거나 얕은 복사를 수행하는 Object.assign, spread syntax를 사용한다.

#### 도움 받은 글

https://velopert.com/3636<br/>
https://academy.dream-coding.com/<br/>
https://reactjs.org/
