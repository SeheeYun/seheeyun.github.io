---
title: "210528"
date: "2021-05-28"
tags: ["database", "material-ui"]
---

## Today

### SQL, noSQL

#### 스키마(Schema) 

컴퓨터 과학에서 데이터베이스 스키마(database schema)는 데이터베이스에서 자료의 구조, 자료의 표현 방법, 자료 간의 관계를 형식 언어로 정의한 구조이다. 데이터베이스 관리 시스템(DBMS)이 주어진 설정에 따라 데이터베이스 스키마를 생성하며, 데이터베이스 사용자가 자료를 저장, 조회, 삭제, 변경할 때 DBMS는 자신이 생성한 데이터베이스 스키마를 참조하여 명령을 수행한다.

데이터베이스의 구조와 제약조건에 관해 전반적인 명세를 기술한 것
개체의 특성을 나타내는 속성(Attribute)과 속성들의 집합으로 이루어진 개체(Entity), 개체 사이에 존재하는 관계(Relation)에 대한 정의와 이들이 유지해야 할 제약조건들을 기술한 것

스키마는 3개의 구조로 나눠진다.

1. **개념스키마(Conceptual Schema)**<br>
   조직체 전체를 관장하는 입장에서 DB를 정의한 것
   - 데이터 베이스의 전체적인 논리적 구조
2. **내부스키마(Internal Schema)**<br>
   물리적인 저장장치 입장에서 DB가 저장되는 방법을 기술한 것
   - 데이터 베이스의 물리적 저장구조를 정의
3. **외부스키마(External Schema, 서브 스키마)**<br>
   사용자나 응용 프로그래머가 개인의 입장에서 필요한 데이터베이스의 논리적 구조를 정의
   - 실세계에 존재하는 데이터들을 어떤 형식, 구조, 배치 화면을 통해 사용자에게 보여줄 것인가

#### SQL(관계형 데이터베이스)

SQL(Structured Query Language)은 관계형 데이터베이스 관리 시스템의 데이터를 관리하기 위해 설계된 특수 목적의 프로그래밍 언어이다. 관계형 데이터베이스 관리 시스템((RDBMS : relational database management system))에서 자료의 검색과 관리, 데이터베이스 스키마 생성과 수정, 데이터베이스 객체 접근 조정 관리를 위해 고안되었다.

- 데이터는 정해진(엄격한) 데이터 스키마(= structure)를 따라 데이터베이스 테이블에 저장 > 명확하게 정의 된 스키마, 데이터 무결성 보장
- 데이터는 관계를 통해서 연결된 여러개의 테이블에 분산. 데이터들을 여러개의 테이블에 나누어서, 데이터들의 중복을 피할 수 있다.
- 관계를 맺고 있기 때문에, JOIN문이 많은 매우 복잡한 쿼리가 만들어 질 수 있다.
- 수직적 확장(Vertical Scaling)

#### NoSQL(비관계형 데이터베이스)

NoSQL 데이터베이스는 전통적인 관계형 데이터베이스 보다 덜 제한적인 일관성 모델을 이용하는 데이터의 저장 및 검색을 위한 매커니즘을 제공한다. 이러한 접근에 대한 동기에는 디자인의 단순화, 수평적 확장성, 세세한 통제를 포함한다. NoSQL 데이터베이스는 단순 검색 및 추가 작업을 위한 매우 최적화된 키 값 저장 공간으로, 레이턴시와 스루풋과 관련하여 상당한 성능 이익을 내는 것이 목적이다. NoSQL 데이터베이스는 빅데이터와 실시간 웹 애플리케이션의 상업적 이용에 널리 쓰인다. 또, NoSQL 시스템은 SQL 계열 쿼리 언어를 사용할 수 있다는 사실을 강조한다는 면에서 "Not only SQL"로 불리기도 한다.

- 스키마 없음 > 유연, 언제든지 저장된 데이터를 조정하고 새로운 "필드"를 추가 할 수 있다.
- 관계형 모델을 사용하지 않으며 테이블 간 연결해서 조회할 수 있는 조인 기능이 없음
- 조인을 하지않고 관련 데이터를 동일한 컬렉션에 넣기때문에 빠르지만 데이터가 중복 될 수 있다.
- 데이터가 여러 컬렉션에 중복되어 있기 때문에, 수정(update)를 해야 하는 경우 모든 컬렉션에서 수행해야 함. (SQL은 중복된 데이터가 없기 때문에 한번만 수행)
- 데이터는 애플리케이션이 필요로 하는 형식으로 저장, 데이터를 읽어오는 속도가 빠르다.
- 수평적 확장(Horizontal Scaling)

#### SQL은 언제 사용하는 것이 좋을까?

- 관계를 맺고 있는 데이터가 자주 변경(수정)되는 애플리케이션일 경우 (NoSQL에서라면 여러 컬렉션을 모두 수정해줘야 한다.)
- 변경될 여지가 없고, 명확한 스키마가 사용자와 데이터에게 중요한 경우

#### NoSQL은 언제 사용하는 것이 좋을까?

- 정확한 데이터 구조를 알 수 없거나 변경 / 확장 될 수 있는 경우
- 읽기(read)처리를 자주하지만, 데이터를 자주 변경(update)하지 않는 경우 (즉, 한번의 변경으로 수십 개의 문서를 업데이트 할 필요가 없는 경우)
- 데이터베이스를 수평으로 확장해야 하는 경우 ( 즉, 막대한 양의 데이터를 다뤄야 하는 경우)

#### 도움 받은 글

https://jwprogramming.tistory.com/47
https://jwprogramming.tistory.com/70?category=680195
https://siyoon210.tistory.com/130

### Material UI Icons

원래 fontawesome을 사용하고 있었는데, free 아이콘 종류가 한정적이라 종류도 많고 다양한 스타일(Filled, Outlined, Rounded, Two tone, Sharp)을 지원해주는 Material UI을 사용해 보았다.

```js
yarn add @material-ui/icons
```

core를 사용하지않고 있다면 core도 함께 설치

사용법은 간단하다. [Material Icons](https://material-ui.com/components/material-icons/)에서 원하는 아이콘을 선택하고 해당 아이콘 컴포넌트를 import해주면 된다.

```js
<HomeIcon color="secondary" />
<HomeIcon color="action" />
<HomeIcon color="disabled" />
<HomeIcon style={{ color: green[500] }} />

<HomeIcon fontSize="small" />
<HomeIcon fontSize="large" />
<HomeIcon style={{ fontSize: 40 }} />
```

컴포넌트 속성을 이용해서 style을 지정해 줄 수 있다.

#### 도움 받은 글

https://www.daleseo.com/material-ui-icons/
https://material-ui.com/components/icons/
https://material-ui.com/guides/minimizing-bundle-size/#option-2
