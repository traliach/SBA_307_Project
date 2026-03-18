import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/admin.css'
import App from './App.tsx'

window.addEventListener('error', (event) => {
  console.error('[client] window error', event.error ?? event.message)
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('[client] unhandled rejection', event.reason)
})

console.info('[client] booting app')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
