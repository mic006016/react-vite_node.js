import styled from "@emotion/styled"
import { css } from "@emotion/react"
import { Button, TextField } from "@mui/material"
import { useState, useRef, useContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FirebaseContext } from "@/providers/FirebaseProvider"

const WrapperRoot = styled.div``
const ChatInputWrap = styled.div`
  margin-bottom: 1em;
  padding: 0.5em 0;
  display: flex;
`
const ChatListWrap = styled.ul`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #cfdee6ff;
`
const ChatList = styled.li`
  min-width: 250px;
  padding: 0.5em;
  margin-bottom: 1em;
  border: 1px solid #aaa;
  border-radius: 6px;
  background-color: #5b7291;
  color: #fff;
`
const ChatName = styled.div`
  padding: 0.25em 0.5em;
  background: #11243b;
  color: #fdf7d6;
  transform: translate(1em, -50%);
  display: inline-block;
`
const ChatComment = styled.div``
const active = css`
  align-self: flex-end;
  background-color: #5d5d5f;
`
export default function ChatWrapper({ children }) {
  const { isLogOn, user } = useSelector((state) => state.auth)
  const { rtRef, onRtValue, rtPush, rtdb } = useContext(FirebaseContext)
  const [comment, setComment] = useState("")
  const [list, setList] = useState([])
  const inputRef = useRef(null)
  const commentRef = rtRef(rtdb, "yellowoobi/comment")

  // TODO :: 데이터를 저장, Input을 비워준다. Input에 focus
  const onClickButton = (e) => {
    if (comment.length > 0) {
      rtPush(commentRef, {
        uid: user?.uid || "",
        name: user?.name || "",
        comment,
      })
      setComment("")
    }
  }
  // TODO :: shift(o) -> 아무일 안일어남. shift(x) -> 전송
  const onKeyDownInput = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onClickButton()
    }
  }

  useEffect(() => {
    const unsubscribe = onRtValue(commentRef, (snapshot) => {
      const dataArr = Object.values(snapshot?.val()).map((item) => {
        item.isMine = item.uid === user.uid
        return item
      })
      setList(dataArr)
    })
    return unsubscribe
  }, [])

  return (
    <WrapperRoot>
      <ChatInputWrap>
        <TextField
          id="myChat"
          ref={inputRef}
          label="My Chat"
          variant="outlined"
          multiline
          maxRows={3}
          sx={{ flexGrow: 1, mr: 1 }}
          onKeyDown={onKeyDownInput}
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          autoFocus
        />
        <Button variant="contained" onClick={onClickButton}>
          확인
        </Button>
      </ChatInputWrap>
      <ChatListWrap>
        {[...list].reverse().map((item, idx) => (
          <ChatList key={idx} css={item.isMine ? active : null}>
            <ChatName>{item.name}</ChatName>
            <ChatComment>{item.comment}</ChatComment>
          </ChatList>
        ))}
      </ChatListWrap>
    </WrapperRoot>
  )
}
