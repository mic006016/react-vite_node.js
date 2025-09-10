import { Box, Typography } from "@mui/material"
import BookList from "../components/book/BookList"
import BookForm from "../components/book/BookForm"
import useSWR from "swr"

export default function BookPage() {
  const { data, error, isLoading, mutate } = useSWR("/bookSS")
  if (error)
    return (
      <Box sx={{ margin: 20, textAlign: "center" }}>
        페이지를 일시적으로 사용할 수 없습니다.
      </Box>
    )
  if (isLoading)
    return (
      <Box sx={{ margin: 20, textAlign: "center" }}>데이터를 로딩중입니다.</Box>
    )
  return (
    <Box>
      <BookForm swr={{ mutate }} />
      <BookList swr={{ data }} />
    </Box>
  )
}
