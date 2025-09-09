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