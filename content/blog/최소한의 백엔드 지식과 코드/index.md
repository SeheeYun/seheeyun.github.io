---
title: "최소한의 백엔드 지식과 코드"
date: "2021-11-22"
tags: ["express"]
---

프로젝트들을 만들면서 서버에대한 기초적인 지식이나 사용법에대한 필요성을 느꼈고 유튜브 [라매개발자](https://www.youtube.com/c/%EB%9D%BC%EB%A7%A4%EA%B0%9C%EB%B0%9C%EC%9E%90/videos) 채널에 좋은 강의 영상이 있어서 따라 실습해보고 배운 내용을 정리해보았다. [영상 출처](https://youtu.be/uIWl19relcc)

### express

node.js를 사용하여 쉽게 서버를 구성할 수 있도록 [express](https://expressjs.com/)를 사용한다.

#### 설치

node.js가 이미 설치되어있다는 가정하에 `npm init`을 사용하여 package.json 파일 생성(난 npm대신 yarn 사용), 파일이 생성되면 `npm install express --save`로 설치해준다.

디렉토리에 app.js라는 파일을 작성한 후 다음과 같은 코드를 추가하고 `node app.js` 명령어를 사용하여 앱을 실행할 수 있다.

```js
const express = require("express")
const app = express()
const port = 3000

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

### API 작성

#### 라우팅 이란?

라우팅은 **URI(또는 경로) 및 특정한 HTTP 요청 메소드(GET, POST 등)인 특정 엔드포인트에 대한 클라이언트 요청에 애플리케이션이 응답하는 방법을 결정하는 것**을 말한다.

각 라우트는 하나 이상의 핸들러 함수를 가질 수 있으며, 이러한 함수는 라우트가 일치할 때 실행된다. 라우트는 다음과 같은 구조를 가진다.

```
app.METHOD(PATH, HANDLER)
```

- app: express의 인스턴스(가상의 서버?)
- METHOD: HTTP 요청 메소드
- PATH: 서버에서의 경로
- HANDLER: 라우트가 일치할 때 실행되는 함수

라우트를 이용해서 데이터를 추가하는 api를 만든다고 했을 때 두 가지 방법을 사용할 수 있다.

#### use params

```js
app.get("/database/:title", (req, res) => {
  const title = req.params.title
  database.push({
    id: database.length + 1,
    title,
  })
  res.send("값 추가 완료")
})
```

위의 경로에서 `:title`에 해당하는 값은 `req.params`로 받아올 수 있다.

#### use request body

```js
app.post("/add-database", (req, res) => {
  const title = req.body.title
  database.push({
    id: database.length + 1,
    title,
  })
  res.send("값 추가 완료")
})

app.post("/update-database", (req, res) => {
  const id = req.body.id
  const title = req.body.title
  database[id - 1].title = title
  res.send("값 수정 완료")
})
```

`req.body`로 값을 읽어오는데, body-parsing middleware를 사용해야 읽을 수 있다.

```js
// body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
```

api는 body를 사용하기위해 `post` 메서드를 사용하고 본문에 해당하는 키와 값을 넣어서 사용한다.

보통 파라미터보단 body를 사용하고, CRUD를 url로 구분 할 수 있지만 **HTTP 메서드를 이용해서 표현한 RESTful API**를 설계하는것이 좋다.

```js
// create: POST / read: GET / update: PUT,PATCH / delete: DELETE

app.put("/database", (req, res) => {
  const id = req.body.id
  const title = req.body.title
  database[id - 1].title = title
  res.send("값 수정 완료")
})

app.delete("/database", (req, res) => {
  const id = req.body.id
  database.splice(id - 1, 1)
  res.send("값 삭제 완료")
})
```

### 회원가입 및 로그인 구현

회원가입을 구현할 때, 사용자의 패스워드를 암호화하여 저장해야한다. 이때 [argon2](https://yarnpkg.com/package/argon2)같은 암호화 툴을 사용할 수 있다.

```js
const argon2 = require("argon2")

app.post("/signup", async (req, res) => {
  const { username, password, age, birth } = req.body
  const hash = await argon2.hash(password)

  database.push({
    username,
    password: hash,
    age,
    birth,
  })
  res.send("success")
})
```

로그인을 구현 할 때, 요청에서 받아온 아이디나 비밀번호가 틀리다면 단순히 메세지만 응답해주는게 아니라 `res.status(code)`메서드를 사용해서 응답에대한 HTTP 상태 코드를 설정해 줄 수 있다.

```js
app.post("/login", async (req, res) => {
  const { username, password } = req.body
  const user = database.filter(user => user.username === username)

  if (user.length === 0) {
    res.status(403).send("해당하는 user가 없습니다.")
    return
  }

  if (await argon2.verify(user[0].password, password)) {
    res.send("success")
  } else {
    res.status(403).send("패스워드가 일치하지 않습니다.")
  }
})
```

### 인증 구현

인증 방식에는 크게 서버 인증 방식과 토큰 인증 방식이 있다.

#### 서버 인증 방식 (Cookie , Session)

기존의 인증 시스템은 서버 기반의 인증 방식으로, 서버 측에서 사용자들의 정보를 기억하고 있어야 한다. 사용자들의 정보를 기억하기 위해서는 세션을 유지해야 하는데, 메모리나 디스크 또는 데이터베이스 등을 통해 관리한다. (Sateful)

#### 토큰 인증 방식 (JWT)

토큰 기반의 인증 방식은 인증받은 사용자들에게 토큰을 발급하고, 서버에 요청을 할 때 헤더에 토큰을 함께 보내도록 하여 유효성 검사를 한다. 이러한 시스템에서는 더이상 사용자의 인증 정보를 서버나 세션에 유지하지 않고 클라이언트 측에서 들어오는 요청만으로 작업을 처리한다 (Stateless)

토큰 인증 방식을 사용해서 로그인 된, 확인 된 사용자만이 api를 호출할 수 있도록 만드려한다.

토큰을 생성하기위해 [jsonwebtoken](https://yarnpkg.com/package/jsonwebtoken)을 설치해준다. 토큰은 `jwt.sign()`을 사용해서 만들 수 있다.

```js
const jwt = require("jsonwebtoken")

const access_token = jwt.sign({ username }, "secure")
console.log(access_token)
```

이렇게 만들어준 토큰을 클라이언트에 넘겨줘야하는데 응답에 담아보내거나 쿠키를 사용하는 방법이 있다.

#### use cookie

사용자가 로그인을 성공하면 토큰을 생성해주고 생성한 토큰을 `res.cookie()`를 사용해서 쿠키에 담아 넘겨준다.

```js
const access_token = jwt.sign({ username }, "secure")
console.log(access_token)

res.cookie("access_token", access_token)
res.send("로그인 성공")
```

이제 이 토큰은 클라이언트에서 서버에 요청을 보낼 때 쿠키에 함께 담겨오는데, 토큰을 조회하여 인증된 사용자인지를 확인하면 된다.

[cookie-parser](https://www.npmjs.com/package/cookie-parser)를 설치한 뒤 미들웨어를 마운트해준다.

```js
const cookieParser = require("cookie-parser")
app.use(cookieParser())
```

하고나면 `req.cookies`로 쿠키를 조회할 수 있는데 토큰이 암호화 되어있기 때문에 쿠키에 담긴 토큰을 `jwt.verify()`으로 복호화해야한다. 복호화된 토큰으로 유효성 검사를 해서 api를 사용할 수 있게 만들면 된다.

```js
const { username } = jwt.verify(access_token, "secure")
```

쿠키는 클라이언트내에서 조회할 수 있고 이는 보안상의 위험이있다. 이를 방지하기 위해 쿠키에 `httpOnly` 옵션을 설정할 수 있다. 설정하면 클라이언트에서 접근할 수 없게된다. (하지만 이 또한 다른 공격에대해 취약하다고 함)

```js
res.cookie("access_token", access_token, { httpOnly: true })
```

#### middleware

생성하는 api마다 사용자를 확인하는 로직을 넣는다면 번거로운 일이 될것이다. 이런 중복되는 로직을 middleware로 작성하여 빼낼 수 있다.

> 미들웨어란, 클라이언트에게 요청이 오고 그 요청과 응답 사이에 목적에 맞게 처리 하는, 거쳐가는 함수

middleware라는 폴더를 생성하고 반복되는 로직을 함수로 만들어준다.

이때, 반복되는 로직을 수행하고나면 내가 작성한 api로 넘어가기위해 `next()`를 호출해준다. `next()`를 호출하면 그 다음 미들웨어 함수로 제어가 넘어가게된다.

```js
const validUser = (req, res, next) => {
  const { access_token } = req.cookies
  if (!access_token) {
    res.status(401).send("access token 없음")
  }

  try {
    const { username } = jwt.verify(access_token, "secure")
    const userInfo = database.find(user => user.username === username)

    if (!userInfo) {
      throw new Error("userInfo 없음")
    }

    next()
  } catch (e) {
    console.error(e)
    res.status(401).send("유효한 access token이 없습니다.")
  }
}

module.exports = {
  validUser,
}
```

api의 두번 째 인자로 작성한 미들웨어 함수를 넣어주면 해당 미들웨어 함수가 먼저 실행되고 `next()`가 호출 될 때 api의 핸들러로 넘어오게된다.

```js
const { validUser } = require("./middleware/auth")

app.get("/secure_data", validUser, (req, res) => {
  res.send("secure data")
})
```

#### 도움 받은 글

https://velog.io/@gusdnr814/로그인-인증-4가지-방법<br/>
https://velog.io/@_woogie/JWT-로그인방식-구현하기-feat.-session에서-jwt로<br/>
https://backend-intro.vlpt.us/4/03.html?q=<br/>
https://stackoverflow.com/questions/10695629/what-is-the-parameter-next-used-for-in-express
