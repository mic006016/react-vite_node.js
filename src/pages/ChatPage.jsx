import { css } from "@emotion/react"
import { ButtonWrapper, Button } from "@/components/common/form//Button"
import ChatWrapper from "@/components/chat/ChatWrapper"

const style = css({
  padding: 0,
})

export default function ChatPage() {
  return (
    <div css={style}>
      <ButtonWrapper dir="flex-end">
        <Button mr="0.5em">채팅방 참여</Button>
        <Button>채팅방 나가기</Button>
      </ButtonWrapper>
      <ChatWrapper />
    </div>
  )
}
