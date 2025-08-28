import { Container } from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import HeaderWrapper from "./components/header/HeaderWrapper"
import HomePage from "./pages/HomePage"
import ShopPage from "./pages/ShopPage"
import BoardPage from "./pages/BoardPage"
import ChatPage from "./pages/ChatPage"
import { Routes, Route } from "react-router-dom"
import { useSelector } from "react-redux"

export default function Containers() {
  const theme = useSelector((state) => state.ui.theme)
  const themeConfig = createTheme({
    palette: {
      mode: theme,
    },
  })
  return (
    <ThemeProvider theme={themeConfig}>
      <Container>
        <HeaderWrapper />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </Container>
    </ThemeProvider>
  )
}
