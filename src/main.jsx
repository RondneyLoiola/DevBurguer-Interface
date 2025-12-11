import { Elements } from "@stripe/react-stripe-js";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import {ToastContainer} from 'react-toastify'
import { ThemeProvider } from "styled-components";
import stripePromise from './config/stripeConfig.js'
import AppProvider from './hooks/index.jsx'
import {Router} from './routes'
import GlobalStyles from './styles/globalStyles'
import {standardTheme} from './styles/themes/standard.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={standardTheme}>
        <AppProvider>
          <GlobalStyles/>
          <Elements stripe={stripePromise}>
            <BrowserRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
              <Router/>
            </BrowserRouter>
          </Elements>
          <ToastContainer autoClose={2000} theme='colored'/>
        </AppProvider>
      </ThemeProvider>
  </StrictMode>,
)
