import { ErrorBoundary } from './components/ErrorBoundary'
import { AdminPage } from './pages/AdminPage'
import { PublicSite } from './pages/PublicSite'

function App() {
  // Keep admin isolated from the public site until routing is reintroduced safely.
  const isAdminPath = window.location.pathname.startsWith('/admin')

  return (
    <ErrorBoundary>
      {isAdminPath ? <AdminPage /> : <PublicSite />}
    </ErrorBoundary>
  )
}

export default App
