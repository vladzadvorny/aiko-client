/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
import { uri } from '../constants/config'
import { storage } from '../constants/storage'
import { showNotification } from './notification'

export const agent = async (...args) => {
  try {
    const [resource, config] = args
    // request interceptor here
    const token = localStorage.getItem(storage.token)

    const notFormData = config?.body && !(config?.body instanceof FormData)

    const response = await fetch(`${uri}${resource}`, {
      headers: {
        ...(notFormData && { 'Content-Type': 'application/json' }),
        ...(token && { Authorization: `Bearer ${token}` })
      },
      ...config,
      ...(notFormData && {
        body: JSON.stringify(config.body)
      })
    })

    // response interceptor here
    if (!response.ok && response.status === 401) {
      localStorage.removeItem(storage.token)

      return Promise.reject(response)
    }

    if (!response.ok && response.status === 500) {
      response
        .json()
        .then(() => showNotification(`Что-то пошло не так :(`, 'error'))
        .catch(console.error)

      return Promise.reject(response)
    }

    const data = await response.json()

    return data
  } catch (error) {
    console.error(error)
    showNotification('Что-то с интернетом :(', 'error')
  }
}
