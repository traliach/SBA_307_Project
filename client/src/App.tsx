import { ErrorBoundary } from './components/ErrorBoundary'
import { AdminPage } from './pages/AdminPage'
import { HomePage } from './pages/HomePage'

function App() {
  // Keep admin isolated from the public site until routing is reintroduced safely.
  const isAdminPath = window.location.pathname.startsWith('/admin')

  return (
    <ErrorBoundary>
      {isAdminPath ? <AdminPage /> : <HomePage />}
    </ErrorBoundary>
  )
}

export default App
