import { useState, useActionState, useEffect, useContext } from "react"
import Button from "@mui/material/Button"
import styled from "@emotion/styled"
import { api, apiPost } from "@/modules/api"
import { AlertContext } from "@/providers/AlertProvider"
import { useNavigate } from "react-router-dom"

const FormWrap = styled.form`
  padding: 0.5em;
  border: 1px solid #eee;
  margin-bottom: 1em;
`
const FormList = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 0.5em 0;
`
const FormListTitle = styled.div`
  font-weight: bold;
  color: #333;
  flex-grow: 1;
  width: 150px;
`
const Input = styled.input`
  padding: 0.75em !important;
  border: 1px solid #aaa !important;
  flex-grow: 3;
`
const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 1em;
`

export default function JoinForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    usrNm: "",
    usrId: "",
    usrPw: "",
    usrPwRe: "",
    usrEmail: "",
  })
  // ["usrNm"]: "aa"
  const onChangeForm = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const { setIsAlertOpen, setAlertMsg } = useContext(AlertContext)
  const createUser = async (prev, data) => {
    const usrNm = data.get("usrNm")
    const usrId = data.get("usrId")
    const usrPw = data.get("usrPw")
    const usrPwRe = data.get("usrPwRe")
    const usrEmail = data.get("usrEmail")
    // TODO :: Validation
    if (usrPw !== "" && usrPw !== usrPwRe) {
      setAlertMsg("비밀번호가 일치하지 않습니다.")
      setIsAlertOpen(true)
      return { usrNm, usrId, usrEmail, usrPw: "", usrPwRe: "" }
    }
    // TODO :: axios
    const rs = await apiPost("/public/join", { usrNm, usrId, usrPw, usrEmail })
    if (rs?.success === "OK") {
      // TODO :: 성공처리
      setIsAlertOpen(true)
      setAlertMsg("회원가입이 완료되었습니다.")
      navigate("/")
    }
    return { usrNm, usrId, usrPw, usrEmail, error: null }
  }
  const [formState, formAction] = useActionState(createUser, null)

  useEffect(() => {
    // console.log("Submitted data:", formState)
  }, [formState])

  return (
    <div className="form-wrapper">
      <FormWrap action={formAction}>
        <FormList>
          <FormListTitle>이름</FormListTitle>
          <Input
            type="text"
            name="usrNm"
            value={form.usrNm}
            onChange={onChangeForm}
          />
        </FormList>
        <FormList>
          <FormListTitle>아이디</FormListTitle>
          <Input
            type="text"
            name="usrId"
            value={form.usrId}
            onChange={onChangeForm}
          />
        </FormList>
        <FormList>
          <FormListTitle>비밀번호</FormListTitle>
          <Input
            type="password"
            name="usrPw"
            value={form.usrPw}
            onChange={onChangeForm}
          />
        </FormList>
        <FormList>
          <FormListTitle>비밀번호재입력</FormListTitle>
          <Input
            type="password"
            name="usrPwRe"
            value={form.usrPwRe}
            onChange={onChangeForm}
          />
        </FormList>
        <FormList>
          <FormListTitle>이메일</FormListTitle>
          <Input
            type="text"
            name="usrEmail"
            value={form.usrEmail}
            onChange={onChangeForm}
          />
        </FormList>
        <ButtonWrap>
          <Button variant="contained" type="submit">
            회원가입
          </Button>
        </ButtonWrap>
      </FormWrap>
    </div>
  )
}
