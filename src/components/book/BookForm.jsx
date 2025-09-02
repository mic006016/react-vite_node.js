import { useState, useContext } from "react"
import styled from "@emotion/styled"
import { Button } from "@mui/material"
import { AlertContext } from "@/providers/AlertProvider"
import axios from "axios"

const FormWrap = styled.form`
  display: flex;
  padding: 0.5em;
  border: 1px solid #eee;
  margin-bottom: 1em;
`
const Input = styled.input`
  padding: 0.25em 0.5em;
  border: 1px solid #ccc;
  margin-right: 0.5em;
  flex-grow: ${(props) => props.grow};
`
export default function BookForm({ swr }) {
  const [form, setForm] = useState({ title: "", content: "" })
  const { setIsAlertOpen, setAlertMsg } = useContext(AlertContext)
  const onSubmit = async (e) => {
    if (form.title === "") {
      setIsAlertOpen(true)
      setAlertMsg("제목은 필수사항입니다.")
      return
    }
    if (form.content === "") {
      setIsAlertOpen(true)
      setAlertMsg("내용은 필수사항입니다.")
      return
    }
    const { data } = await axios({
      url: import.meta.env.VITE_EXPRESS_API + "/book",
      method: "post",
      data: { title: form.title, content: form.content },
    })
    if (data?.success === "OK") swr.mutate()
  }
  return (
    <FormWrap>
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
