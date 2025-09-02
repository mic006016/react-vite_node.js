import { createContext, useState } from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material"
export const AlertContext = createContext()

export default function AlertProvider({ children }) {
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertMsg, setAlertMsg] = useState("")

  const handleClose = (e) => {
    setIsAlertOpen(false)
    setAlertMsg("")
  }

  return (
    <AlertContext.Provider
      value={{ isAlertOpen, setIsAlertOpen, alertMsg, setAlertMsg }}
    >
      {children}
      <Dialog open={isAlertOpen} onClose={handleClose} sx={{ minWidth: 300 }}>
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
