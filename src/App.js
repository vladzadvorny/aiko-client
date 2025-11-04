/* eslint-disable react/display-name */
import { useEffect, useState } from 'preact/compat'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import 'dayjs/locale/ru'

import Routes from './Routes'

import { state } from './store'
import { agent } from './utils/agent'
import { storage } from './constants/storage'

// Configure dayjs
dayjs.locale('ru')
dayjs.extend(localeData)

const App = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMe()
  }, [])

  const fetchMe = () => {
    const token = localStorage.getItem(storage.token)
    if (token) {
      agent('/me')
        .then(({ me }) => {
          state.me = me || null
        })
        .catch(console.error)
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loader" aria-busy />
  }

  return <Routes />
}

export default App
