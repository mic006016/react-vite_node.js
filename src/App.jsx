// import "font-awesome/css/font-awesome.min.css"
import { SWRConfig } from "swr"
import { BrowserRouter } from "react-router-dom"
import { Provider as StoreProvider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "./store"
import FirebaseProvider from "./providers/FirebaseProvider"
import TestProvider from "./providers/TestProviders"
import Containers from "./Containers"
import { swrValue } from "./swr"

import "@/assets/styles/app.scss"
import AlertProvider from "./providers/AlertProvider"

function App() {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AlertProvider>
          <SWRConfig value={swrValue}>
            <FirebaseProvider>
              <BrowserRouter>
                <TestProvider>
                  <Containers />
                </TestProvider>
              </BrowserRouter>
            </FirebaseProvider>
          </SWRConfig>
        </AlertProvider>
      </PersistGate>
    </StoreProvider>
  )
}

export default App
