import {
  Typography,
  Breadcrumbs,
  Box,
  Button,
  FormControlLabel,
  Switch,
} from "@mui/material"
import { Link } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { setTheme, toggleTheme } from "@/store/reducers/ui-slice"

export default function HeaderWrapper() {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.ui.theme)
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h4" component={Link} to="/">
        yellowoobi
      </Typography>
      <Breadcrumbs>
        <Typography component={Link} to="/shop">
          SHOP
        </Typography>
        <Typography component={Link} to="/board">
          BOARD
        </Typography>
        <Typography component={Link} to="/chat">
          CHAT
        </Typography>
      </Breadcrumbs>
      <Box>
        <Button variant="contained" sx={{ mr: 1 }}>
          로그인
        </Button>
        <Button variant="contained" sx={{ mr: 1 }}>
          로그아웃
        </Button>
        <Button variant="outlined" sx={{ mr: 2 }}>
          회원가입
        </Button>
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
    </Box>
  )
}
