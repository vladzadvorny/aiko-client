import { hydrate, render } from 'preact'

import './scss/classless.scss'

import App from './App'

const Root = () => <App />

const app = document.getElementById('app')

if (app) {
  // @ts-ignore
  hydrate(<Root />, document.body, app)
} else {
  render(<Root />, document.body)
}
