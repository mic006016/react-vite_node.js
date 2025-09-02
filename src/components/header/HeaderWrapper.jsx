import {
  Typography,
  Breadcrumbs,
  Box,
  Button,
  FormControlLabel,
  Switch,
} from "@mui/material"
import { Link } from "react-router-dom"
import styled from "@emotion/styled"
import { css } from "@emotion/react"

import { useDispatch, useSelector } from "react-redux"
import { setTheme, toggleTheme } from "@/store/reducers/ui-slice"
import { logOn, logOut } from "@/store/reducers/auth-slice"
import { useContext, useEffect } from "react"
import { FirebaseContext } from "@/providers/FirebaseProvider"

const HeaderRoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5em;
  margin-bottom: 1em;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
`

export default function HeaderWrapper() {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.ui.theme)
  const { isLogging, isLogOn, user } = useSelector((state) => state.auth) // initialState 구조분해할당
  const { signInWithPopup, auth, googleProvider } = useContext(FirebaseContext)

  const onGoogleLogIn = async (e) => {
    const rs = await signInWithPopup(auth, googleProvider)
    const { uid = "", email = "", displayName: name = "" } = rs?.user || {}
    // const user = { uid, email, name }, const isLogOn = !!rs?.user
    dispatch(logOn({ user: { uid, email, name }, isLogOn: !!rs?.user })) //dispatch(logOn(user)) 구조분해할당 / dispatch -> actionCreator 실행
  }

  useEffect(() => {
    console.log("로그인상태: ", isLogOn)
  }, [isLogOn])

  return (
    <HeaderRoot>
      <Typography variant="h4" component={Link} to="/">
        yellowoobi
      </Typography>
      <Breadcrumbs>
        <Typography component={Link} to="/shop">
          SHOP
        </Typography>
        {isLogOn ? (
          <Typography component={Link} to="/book">
            BOOK
          </Typography>
        ) : null}
        {isLogOn ? (
          <Typography component={Link} to="/chat">
            CHAT
          </Typography>
        ) : null}
      </Breadcrumbs>
      <Box>
        {!isLogOn ? (
          <Button variant="contained" sx={{ mr: 1 }} onClick={onGoogleLogIn}>
            구글로그인
          </Button>
        ) : null}
        {isLogOn ? (
          <Button
            variant="contained"
            sx={{ mr: 1 }}
            onClick={() => dispatch(logOut())}
          >
            로그아웃
          </Button>
        ) : null}
        {!isLogOn ? (
          <Button variant="outlined" sx={{ mr: 2 }}>
            회원가입
          </Button>
        ) : null}
        <FormControlLabel
          control={
            <Switch
              checked={theme === "light"}
              onChange={() => {
                dispatch(toggleTheme())
              }}
              name="theme"
            />
          }
          label="Theme"
        />
      </Box>
    </HeaderRoot>
  )
}
