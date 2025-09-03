import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartProvider'
import { AuthProvider } from './context/AuthProvider'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <AuthProvider>
        <App />
        <Toaster position="top-right" reverseOrder={false} /> 
      </AuthProvider>
    </CartProvider>
  </StrictMode>,
)
