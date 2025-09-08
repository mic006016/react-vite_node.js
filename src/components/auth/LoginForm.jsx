import { useState, useActionState, useEffect, useContext } from "react"
import { useDispatch } from "react-redux"
import { localLogOn } from "@/store/reducers/auth-slice"
import Button from "@mui/material/Button"
import styled from "@emotion/styled"
import { AlertContext } from "@/providers/AlertProvider"
import { useNavigate } from "react-router-dom"
import { setTokens } from "@/modules/api"
import { api } from "@/modules/api"

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
`
const Title = styled.h2`
  font-size: 2em;
  padding: 0.5em 0;
  border-bottom: 1px solid #eee;
  text-align: center;
`
const FormWrap = styled.form`
  max-width: 500px;
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

export default function LoginForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form, setForm] = useState({ usrId: "", usrPw: "" })
  const onChangeForm = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const { setIsAlertOpen, setAlertMsg } = useContext(AlertContext)
  const loginUser = async (prev, data) => {
    const usrId = data.get("usrId")
    const usrPw = data.get("usrPw")
    if (usrId === "" || usrPw === "") {
      setAlertMsg("로그인 정보를 입력하세요")
      setIsAlertOpen(true)
      return { usrId, usrPw }
    }
    const rs = await api({
      url: "/public/login",
      type: "POST",
      data: { usrId, usrPw },
    })
    if (rs?.data?.success === "OK") {
      dispatch(localLogOn(rs?.data?.data?.user || {}))
      setTokens(
        rs?.data?.data?.accessToken || "",
        rs?.data?.data?.refreshToken || ""
      )
      setIsAlertOpen(true)
      setAlertMsg("로그인 되었습니다.")

      navigate("/")
    } else {
      setIsAlertOpen(true)
      setAlertMsg(rs?.data?.error?.msg || "오류입니다")
      return { usrId: "", usrPw: "", error: null }
    }
  }
  const [formState, formAction] = useActionState(loginUser, null)

  return (
    <FormWrapper>
      <FormWrap action={formAction}>
        <Title>로그인</Title>
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
        <ButtonWrap>
          <Button variant="contained" type="submit">
            로그인
          </Button>
        </ButtonWrap>
      </FormWrap>
    </FormWrapper>
  )
}
