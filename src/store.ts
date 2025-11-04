import { proxy } from 'valtio'

import { Colors } from './constants/colors'

interface AppState {
  title: string
}

interface MeState {
  id: number
  name: string
  email: string
  role: 'user' | 'admin'
  status: 'active' | 'banned' | 'inactive'
  color: keyof Colors
  created_at: string
  updated_at: string
}
interface State {
  count: number
  me: MeState | null
  app: AppState
}

const initial = {
  count: 0,
  me: null,
  app: {
    title: ''
  }
}

export const state = proxy<State>({ ...initial })

export const resetState = () => {
  Object.keys(state).forEach(key => {
    state[key] = { ...initial }[key]
  })
}

export const setTitle = (title: string) => {
  state.app.title = title
  document.title = title
}
