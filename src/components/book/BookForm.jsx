import { useState, useContext } from "react"
import styled from "@emotion/styled"
import { Button } from "@mui/material"
import { AlertContext } from "@/providers/AlertProvider"
import { DayPicker } from "react-day-picker"
import "react-day-picker/style.css"
import { api, apiFile, apiPost } from "@/modules/api"

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
const DateWrap = styled.div`
  position: relative;
  flex-grow: ${(props) => props.grow};
`
export default function BookForm({ swr }) {
  const [selected, setSelected] = useState("")
  const [upfile, setUpfile] = useState(null)
  const [form, setForm] = useState({
    title: "",
    content: "",
    writer: "",
    publish_d: "",
  })
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
    const formData = new FormData()
    formData.append("title", from.title)
    formData.append("content", from.content)
    formData.append("writer", from.writer)
    formData.append("publish_d", from.publish_d)
    formData.append("upfile", from.upfile?.[0] || null)
    console.log(upfile)
    const rs = await apiPost("/book", formData)
    if (rs?.success === "OK") swr.mutate()
  }
  const onClickDate = (e) => {}
  return (
    <FormWrap>
      <Input
        placeholder="제목"
        grow={2}
        value={form.title}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, title: e.target.value }))
        }
      />
      <Input
        placeholder="설명"
        grow={4}
        value={form.content}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, content: e.target.value }))
        }
      />
      <Input
        placeholder="저자"
        grow={1}
        value={form.writer}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, writer: e.target.value }))
        }
      />
      <Input
        placeholder="발행일"
        value={form.publish_d}
        grow={1}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, publish_d: e.target.value }))
        }
      />
      <Input
        type="file"
        name="upfile"
        placeholder="첨부파일"
        grow={1}
        onChange={(e) => setUpfile(e.target.files)}
      />
      <Button variant="contained" onClick={onSubmit}>
        등록
      </Button>
    </FormWrap>
  )
}
