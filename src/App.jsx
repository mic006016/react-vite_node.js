import "font-awesome/css/font-awesome.min.css"
import { BrowserRouter } from "react-router-dom"
import { Provider as StoreProvider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "./store"
import "../public/css/fonts.css"
import "../public/css/base.css"
import "../public/css/shop.css"
import Containers from "./Containers"

function App() {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Containers />
        </BrowserRouter>
      </PersistGate>
    </StoreProvider>
  )
}

export default App
