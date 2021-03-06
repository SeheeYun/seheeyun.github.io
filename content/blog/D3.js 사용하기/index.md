---
title: "D3.js 사용하기"
date: "2021-06-30"
tags: ["d3"]
---

ui/ux나 비주얼에 관심이 많아서 어떤 라이브러리를 배워볼까 고민하다가 단순한 인터랙션이나 비주얼보단 의미있는, 좀 더 실용적인 시각화 라이브러리를 사용해보고 싶었고 data를 dom 요소로 매핑할 수 있는 **D3**(Data Driven Documents)를 선택했다. D3는 차트를 만드는 것 외에도 다양한 활용이 가능하다. [예제들](https://bl.ocks.org/mbostock)

### 특징

- 웹 표준에 가깝다.
  D3.js는 웹 표준인 **HTML, SVG, CSS**를 사용해서 시각화 하기 때문에 최신 브라우저에서의 호환성을 보장한다. 특별한 api를 사용하지않아도 css를 사용해서 스타일링 할 수 있고 d3가 매핑하는 요소는 DOM 요소이기 때문에 브라우저에 내장된 툴로 디버깅하기도 쉽다.
- d3의 메서드들은 요소에 메서드를 수행하고 해당 요소를 반환한다. d3는 제이쿼리와 유사한 방식('.'을 사용하여 연결)을 사용하여 메서드들을 연결하는 **Method Chaining**를 사용하고 이는 코드를 읽기쉽고 간결하게 만들어준다.

### 핵심 개념

- **d3.select(), d3.selectAll()**: 최상위 레벨의 메서드로, 요소를 선택한다. 이 메서드들은 셀렉터 문자열을 인자로 받는데, 지정한 문자열과 일치하는 요소가 없다면 빈 선택물을 반환한다.
- **selection.data()**: 선택물에 data 배열을 연결해준다.
- **selection.enter()**: 연결해준 data에 해당 선택물이 부족한 수 만큼 플레이스 홀더 역할을 하는 선택물을 반환한다. enter는 부족한 선택물의 참조만을 반환하므로 append()를 사용해서 노드를 추가해야한다.
- **selection.exit()**: data의 수보다 현재 선택물의 요소가 많은 경우 그 남는 선택물을 반환한다. 보통 남는 선택물은 remove()를 사용해서 지워준다.
- **selection.attr(name[, value])**: value 인자를 지정하여 선택한 모든 요소에 지정한 속성명과 값을 부여한다. value가 상수이면 모든 요소에 같은 속성값이 주어지지만 value가 함수이면 각 요소별로 적용된다.
  이 함수는 전달인자로 datum d와 인덱스 i가 넘어오고 this는 현재 DOM 요소다.

d3는 동적인 그래프를 만들 수 있는데, 기존에는 위의 메서드들을 활용한 General Update Pattern을 통해 데이터를 바인딩시키고 부족한 만큼 요소를 반환해서 추가해주고 병합시키는 방법을 사용했지만 새로 추가된 **selection.join()** 메서드를 사용하여 위의 메서드들을 일일이 작성하지않고 한개의 메서드로 그래프를 업데이트 시킬 수 있게되었다.

join()을 이용해서 만든 요소에 속성을 지정하려면, 원래의 방식(General Update Pattern)처럼 enter나 update 뒤에 attr()를 추가하지않고 join() 뒤에 attr()를 붙여서 지정해준다. 이유는 join()이 엔터링되고 업데이트된 요소를 모두 반환하기때문이다.

```js
useEffect(() => {
  const svg = select(svgRef.current)
  svg
    .selectAll("circle")
    .data(data)
    .join(
      enter => enter.append("circle"),
      update => update.attr("class", "updated"),
      exit => exit.remove()
    )
    .attr("r", value => value)
    .attr("cx", value => value * 2)
    .attr("cy", value => value * 2)
    .attr("stroke", "red")
}, [])
```

join() 안에 exit.remove는 사실 디폴트로 적용되기때문에 따로 지정해줄 필요없다. 단, 애니메이션을 이용하기위에 따로 삭제해줘야하는 경우 적용해줄 수 있다.
update 콜백함수 또한 같은 이유로 지정해줄 필요가 없다.

enter.append도 아래와 같이 간결하게 적어주면 된다.

```js
.join('circle')
```

결론적으로 위와 같이 심플한 한줄의 코드가 첫번째 로직과 같다는 것이다. 그것이 join()의 기능이다.

이 외에 d3는 다양한 scale 함수나 축, 지도 등을 만들 수 있는 메서드들을 지원해줘서 복잡한 계산없이 그래프들을 구현할 수 있다.

### React와 함께

d3가 대부분을 처리하고 react는 step back해서 svg 요소를 제공하는 방식을 사용했다.
활용하기에따라 d3는 단순히 계산을 하고 계산된 값을 react가 렌더링하게 할 수도 있다.

#### 도움 받은 글

https://github.com/d3/d3/wiki<br/>
https://github.com/zziuni/d3/wiki/API-Reference<br/>
https://mynameisdabin.tistory.com/15?category=786517<br/>
https://velog.io/@smooth97/-Data-Visualizing-D3.js-란<br/>
https://youtu.be/9uEmNgHzPhQ
