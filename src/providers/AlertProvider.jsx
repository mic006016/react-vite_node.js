import { createContext, useContext, useEffect, useState } from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material"
import { ErrorContext } from "@/providers/ErrorProvider"
export const AlertContext = createContext()

export default function AlertProvider({ children }) {
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertMsg, setAlertMsg] = useState("")
  const { rootError } = useContext(ErrorContext)

  const handleClose = (e) => {
    setIsAlertOpen(false)
    setAlertMsg("")
  }

  useEffect(() => {
    if (rootError) {
      console.log(rootError)
      setIsAlertOpen(true)
      setAlertMsg(rootError?.msg || "알 수 없는 오류")
    }
  }, [rootError])

  return (
    <AlertContext.Provider
      value={{ isAlertOpen, setIsAlertOpen, alertMsg, setAlertMsg }}
    >
      {children}
      <Dialog open={isAlertOpen} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>{alertMsg}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </AlertContext.Provider>
  )
}
