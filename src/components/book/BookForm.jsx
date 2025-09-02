import { useState } from "react"
import styled from "@emotion/styled"
import { Button } from "@mui/material"

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
  return (
    <FormWrap>
      <Input placeholder="제목" grow={1} />
      <Input placeholder="설명" grow={3} />
      <Button varient="contained">등록</Button>
    </FormWrap>
  )
}
