import { Box, Typography } from "@mui/material"
import BookList from "../components/book/BookList"
import BookForm from "../components/book/BookForm"

export default function BookPage() {
  return (
    <Box>
      <BookForm />
      <BookList />
    </Box>
  )
}
