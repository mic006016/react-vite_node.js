import { Button } from "@mui/material"
import { useEffect } from "react"

export default function ErrorFallback({ error, resetErrorBoundary }) {
  const onReset = () => {
    resetErrorBoundary()
    location.href = "/"
  }
  useEffect(() => {
    console.log(error)
  }, [error])
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error?.detail?.msg}</pre>
      <Button onClick={onReset}>메인으로 돌아가기</Button>
    </div>
  )
}
