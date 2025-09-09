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
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setTheme, toggleTheme } from "@/store/reducers/ui-slice"
import {
  logOn,
  logOut,
  localLogOn,
  localLogOut,
} from "@/store/reducers/auth-slice"
import { useContext, useEffect } from "react"
import { FirebaseContext } from "@/providers/FirebaseProvider"
import { retrieveToken } from "@/modules/api"

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
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.ui.theme)
  const { isLogging, isLogOn, user, isLocalLogging, isLocalLogOn, localUser } =
    useSelector((state) => state.auth)
  const { signInWithPopup, auth, googleProvider } = useContext(FirebaseContext)

  const onGoogleLogIn = async (e) => {
    const rs = await signInWithPopup(auth, googleProvider)
    const { uid = "", email = "", displayName: name = "" } = rs?.user || {}
    dispatch(logOn({ user: { uid, email, name }, isLogOn: !!rs?.user }))
  }

  const onLogOut = (e) => {
    dispatch(localLogOut())
    window.localStorage.removeItem("accessToken")
    window.localStorage.removeItem("refreshToken")
  }

  useEffect(() => {
    console.log("로그인상태: ", isLogOn)
  }, [isLogOn])

  useEffect(() => {
    const consol = () => {
      console.log("HeaderWrapper")
    }
    consol()
    return consol
  }, [])

  return (
    <HeaderRoot>
      <Typography variant="h4" component={Link} to="/">
        Booldook
      </Typography>
      <Breadcrumbs>
        <Typography component={Link} to="/shop">
          SHOP
        </Typography>
        <Typography component={Link} to="/book">
          BOOK
        </Typography>
        {isLogOn ? (
          <Typography component={Link} to="/chat">
            CHAT
          </Typography>
        ) : null}
      </Breadcrumbs>
      <Box>
        {/* <Button
          variant="outlined"
          sx={{ mr: 2 }}
          onClick={() => retrieveToken()}
        >
          토큰갱신(임시)
        </Button> */}
        {!isLogOn ? (
          <Button variant="contained" sx={{ mr: 1 }} onClick={onGoogleLogIn}>
            채팅로그인
          </Button>
        ) : null}
        {isLogOn ? (
          <Button
            variant="contained"
            sx={{ mr: 1 }}
            onClick={() => dispatch(logOut())}
          >
            {user.name} 채팅로그아웃
          </Button>
        ) : null}
        {!isLocalLogOn ? (
          <Button
            variant="outlined"
            sx={{ mr: 2 }}
            onClick={() => navigate("/join")}
          >
            회원가입
          </Button>
        ) : null}
        {!isLocalLogOn ? (
          <Button
            variant="outlined"
            sx={{ mr: 2 }}
            onClick={() => navigate("/login")}
          >
            로그인
          </Button>
        ) : null}
        {isLocalLogOn ? (
          <Button variant="outlined" sx={{ mr: 2 }} onClick={onLogOut}>
            로그아웃
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
