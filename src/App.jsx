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
import ErrorProvider from "./providers/ErrorProvider"
import { ErrorBoundary } from "react-error-boundary"
import ErrorFallback from "@/components/common/ErrorFallBack"

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ErrorProvider>
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
      </ErrorProvider>
    </ErrorBoundary>
  )
}

export default App
