/* eslint-disable react/display-name */
import { useEffect, useState } from 'preact/hooks'
import { Router, route, Route } from 'preact-router'
import { useSnapshot } from 'valtio'

import Auth from './pages/Auth'
import Chat from './pages/Chat'
import About from './pages/About'

import LeftSidebar from './components/LeftSidebar'
import RightSidebar from './components/RightSidebar'

import { state } from './store'

const withMainLayout = Component => props => {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true)
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)

      // Auto-close sidebars when switching to mobile
      if (mobile) {
        setIsLeftSidebarOpen(false)
        setIsRightSidebarOpen(false)
      } else {
        // Auto-open sidebars when switching to desktop
        setIsLeftSidebarOpen(true)
        setIsRightSidebarOpen(true)
      }
    }

    // Initial check
    checkMobile()

    // Add resize listener
    window.addEventListener('resize', checkMobile)

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleLeftSidebar = () => setIsLeftSidebarOpen(!isLeftSidebarOpen)
  const toggleRightSidebar = () => setIsRightSidebarOpen(!isRightSidebarOpen)

  return (
    <div
      id="app"
      className={`${isLeftSidebarOpen ? 'left-sidebar-open' : ''} ${isRightSidebarOpen ? 'right-sidebar-open' : ''} ${isMobile ? 'mobile' : 'desktop'}`}
    >
      <LeftSidebar isOpen={isLeftSidebarOpen} onToggle={toggleLeftSidebar} />
      <RightSidebar isOpen={isRightSidebarOpen} onToggle={toggleRightSidebar} />
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
