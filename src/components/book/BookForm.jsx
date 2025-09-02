import { useState } from "react"
import styled from "@emotion/styled"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material"

const FormWrap = styled.form`
  display: flex;
  padding: 0.5em;
  border: 1px solid #eee;
  margin-bottom: 1em;
`
const Input = styled.input`
  padding: 0.25em 0.5em;
  border: 1px solid #244d99;
  margin-right: 0.5em;
  flex-grow: ${(props) => props.grow};
`
export default function BookForm() {
  const [form, setForm] = useState({ title: "", content: "" })
  const [isErrOpen, setIsErrOpen] = useState(false)
  const [errMsg, setErrMsg] = useState("")
  const onSubmit = (e) => {
    if (form.title === "") {
      setIsErrOpen(true)
      setErrMsg("제목은 필수사항입니다.")
      return
    }
    if (form.content === "") {
      setIsErrOpen(true)
      setErrMsg("내용은 필수사항입니다.")
      return
    }
    // TODO :: 전송
  }
  const handleClose = (e) => {
    setIsErrOpen(false)
    setErrMsg("")
  }
  return (
    <FormWrap>
      <Dialog open={isErrOpen} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>{errMsg}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
      <Input
        placeholder="제목"
        grow={1}
        value={form.title}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, title: e.target.value }))
        }
      />
      <Input
        placeholder="설명"
        grow={3}
        value={form.content}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, content: e.target.value }))
        }
      />
      <Button variant="contained" onClick={onSubmit}>
        등록
      </Button>
    </FormWrap>
  )
}
