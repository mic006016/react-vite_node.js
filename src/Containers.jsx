import { Container } from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import HeaderWrapper from "./components/header/HeaderWrapper"
import HomePage from "./pages/HomePage"
import ShopPage from "./pages/ShopPage"
import BookPage from "./pages/BookPage"
import ChatPage from "./pages/ChatPage"
import JoinPage from "./pages/JoinPage"
import { Routes, Route } from "react-router-dom"
import { useSelector } from "react-redux"
import styled from "@emotion/styled"

const RoutesWrapper = styled.div`
  padding-top: 2em;
`
export default function Containers() {
  const theme = useSelector((state) => state.ui.theme)
  const themeConfig = createTheme({
    palette: {
      mode: theme,
    },
  })
  return (
    <ThemeProvider theme={themeConfig}>
      <Container sx={{ paddingTop: "50px" }}>
        <HeaderWrapper />
        <RoutesWrapper>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/book" element={<BookPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/join" element={<JoinPage />} />
          </Routes>
        </RoutesWrapper>
      </Container>
    </ThemeProvider>
  )
}
