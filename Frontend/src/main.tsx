import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { AppProvider } from './contexts/app.context.tsx' 
import { QueryParamProvider,  } from "use-query-params"
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { CartProvider } from './contexts/CartContext.tsx'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx'
import 'src/i18n/i18n'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <QueryParamProvider adapter={ReactRouter6Adapter}>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
            <CartProvider>
              <ErrorBoundary>
               <App /> 
              </ErrorBoundary>
            </CartProvider>
        </AppProvider>
        <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
      </QueryClientProvider>
    </QueryParamProvider>
    </BrowserRouter>
  </StrictMode>,
)
