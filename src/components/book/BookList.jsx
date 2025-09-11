import { useEffect, useState, useContext } from "react"
import dayjs from "dayjs"
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

export default function BookList({ swr }) {
  const onImgError = (e) => {
    e.target.src = "/images/no-image.jpg"
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">번호</TableCell>
            <TableCell align="center">커버</TableCell>
            <TableCell align="center">제목</TableCell>
            <TableCell align="center">설명</TableCell>
            <TableCell align="center">저자</TableCell>
            <TableCell align="center">발행일</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(swr?.data?.data?.list || []).map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>
                <img
                  src={import.meta.env.VITE_EXPRESS_API + row.imgSrc}
                  alt="커버"
                  onError={onImgError}
                  style={{ maxWidth: "80px", textAlign: "center" }}
                />
              </TableCell>
              <TableCell align="left">{row.title}</TableCell>
              <TableCell align="left">{row.content}</TableCell>
              <TableCell align="center">{row.writer}</TableCell>
              <TableCell align="center">
                {row.publish_d ? dayjs(row.publish_d).format("YYYY-MM-DD") : ""}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
