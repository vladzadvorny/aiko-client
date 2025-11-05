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

  const toggleLeftSidebar = () => setIsLeftSidebarOpen(!isLeftSidebarOpen)
  const toggleRightSidebar = () => setIsRightSidebarOpen(!isRightSidebarOpen)

  return (
    <div
      id="app"
      className={`${isLeftSidebarOpen ? 'left-sidebar-open' : ''} ${isRightSidebarOpen ? 'right-sidebar-open' : ''}`}
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
