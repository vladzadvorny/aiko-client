/* eslint-disable react/display-name */
import { useEffect, useState } from 'preact/hooks'
import { Router, route, Route } from 'preact-router'
import { useSnapshot } from 'valtio'

import Auth from './pages/Auth'
import Chat from './pages/Chat'
import About from './pages/About'

import Sidebar from './components/Sidebar'

import { state } from './store'

const withMainLayout = Component => props => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)

      // Auto-close sidebar when switching to mobile
      if (mobile) {
        setIsSidebarOpen(false)
      } else {
        // Auto-open sidebar when switching to desktop
        setIsSidebarOpen(true)
      }
    }

    // Initial check
    checkMobile()

    // Add resize listener
    window.addEventListener('resize', checkMobile)

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div id="app" className={`${isSidebarOpen ? 'sidebar-open' : ''} ${isMobile ? 'mobile' : 'desktop'}`}>
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      <main>
        <Component {...props} />
      </main>
    </div>
  )
}

const withAuthLayout = Component => props => (
  <div id="app">
    <main>
      <Component {...props} />
    </main>
  </div>
)

const Routes = ({ url = undefined }) => {
  return (
    <Router url={url}>
      {/* public routes */}
      <Route path="/" component={About} />

      {/* these routes should only be accessible when the user IS NOT logged in */}
      <OnlyUnauthRoute path="/auth" component={withAuthLayout(Auth)} />

      {/* these routes should only be accessible when the user IS logged in */}
      <PrivateRoute path="/chat" component={withMainLayout(Chat)} />
    </Router>
  )
}

const PrivateRoute = ({ path, component, ...rest }) => {
  const snap = useSnapshot(state)

  return snap.me ? <Route path={path} component={component} {...rest} /> : <Redirect to="/auth" />
}

const OnlyUnauthRoute = ({ path, component, ...rest }) => {
  const snap = useSnapshot(state)

  return !snap.me ? <Route path={path} component={component} {...rest} /> : <Redirect to="/candidates" />
}

const Redirect = ({ to }) => {
  // @ts-ignore
  useEffect(() => setTimeout(() => route(to, true), 1), [])

  return null
}

export default Routes
