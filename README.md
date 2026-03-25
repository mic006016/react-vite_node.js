## React + Vite Practice Project

Vite 환경에서 React를 기반으로 다양한 라이브러리를 연동하여 구축한 프론트엔드 실습 프로젝트입니다.

### 1. Tech Stack

- **Framework**: React 19 (Vite)
- **State Management**: Redux Toolkit, Redux Persist
- **Data Fetching**: Axios, SWR
- **Backend Service**: Firebase (Authentication, Realtime Database)
- **UI/Styling**: Material UI (MUI), Emotion (Styled-components)
- **Routing**: React Router DOM

### 2. Main Features

- **상품 관리**: JSON 데이터를 호출하여 목록을 출력하고, 제목 및 설명을 기반으로 한 실시간 검색 기능을 제공합니다.
- **인증 시스템**:
    - `useActionState`를 활용한 회원가입 및 로그인 폼 처리
    - Redux를 통한 유저 상태 관리 및 세션 스토리지를 활용한 상태 유지
    - Firebase를 통한 구글 로그인 및 인증 서비스 연동
- **실시간 채팅**: Firebase Realtime Database를 연동하여 실시간 데이터 전송 및 수신 기능을 구현했습니다.
- **공통 UI 컴포넌트**: Context API와 MUI Dialog를 결합한 전역 Alert 시스템을 구축했습니다.

### 3. State Management & Error Handling

- **Global State**: Redux Toolkit을 사용하여 `ui` 및 `auth` 상태를 관리하며, `redux-persist`를 통해 새로고침 후에도 데이터를 보존합니다.
- **Context API**: `Firebase`, `Alert`, `Error` 등의 도메인별 컨텍스트를 분리하여 의존성을 관리합니다.
- **Error Boundary**: 전역 에러 이벤트를 감지하여 API 오류 발생 시 페이지 전환, 비즈니스 로직 오류 발생 시 Alert 노출로 이원화하여 처리합니다.

### 4. Data Fetching Strategy (SWR)

SWR의 전역 설정을 통해 효율적인 데이터 통신을 수행합니다.

- **Revalidation**: 컴포넌트 마운트 시 및 윈도우 포커스 시 자동 갱신 설정
- **Deduplication**: 2초 내 동일 요청 중복 제거
- **Data Persistence**: 새 데이터를 가져오는 동안 이전 데이터를 유지하여 UI 깜빡임을 방지합니다.

### 5. Directory Structure

- `src/components/`: 기능별 UI 컴포넌트 (`LoginForm`, `ChatWrapper` 등)
- `src/providers/`: Context API를 활용한 전역 프로바이더 설정
- `src/store/`: Redux Toolkit 슬라이스 및 스토어 설정
- `src/modules/`: API 통신 및 유틸리티 함수
- `src/swr/`: SWR 전역 설정 및 Fetcher 정의

---

## 8월 29일 이전

- React / useState, useEffect, webpack(+ mui, scss, typescript), vite,
- axios (custom interceptor)
- store (Redux toolkit)

## 8월 29일 계획

- SWR/ReactQuery
- contextProvider
- CustomHook, (HOF, HOC- 프로젝트 때)
- emotion, scss
- noServer (firebase -> Auth, Firestore, realtimeDB)

## 9월 1일 계획

- Typescript(Webpack 설정, vite)

## 9월 2일 (5일 + 4일 지연)

## history 객체

```js
window.history.go(-2)
window.history.back()

window.location.href = "/abc" // /a -> /b (href)-> /c (back)=> /b
window.location.replcae("/") // /a -> /b (replace)-> /c (back)=> /a

const set = new Set()
set.add("A")
set.add("B")
set.add("B")
set.add("C")
console.log(set)

const map = new Map()
map.set("A", "AA")
console.log(map.get("A"))
```

### Event처리

```js
window.addEventListener("onload", (e) => {})
window.getElementById("#btn").addEventListener("onclick", (e) => {})

window.customEvent(new CustomEvent("ERROR_500", { msg: "...", code: "" }))
window.addEventListener("ERROR_500", (e) => {})
