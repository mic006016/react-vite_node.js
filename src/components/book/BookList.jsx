import { useEffect, useState, useContext } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material"
import useSWR from "swr"
import { TestContext } from "@/providers/TestProviders"

export default function BookList() {
  const { test, setTest } = useContext(TestContext)
  const { data, error, isLoading } = useSWR("/books")
  useEffect(() => {
    console.log(test)
  }, [test])

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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>제목</TableCell>
            <TableCell>설명</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(data?.data || []).map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="left">{row.title}</TableCell>
              <TableCell align="left">{row.content}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
