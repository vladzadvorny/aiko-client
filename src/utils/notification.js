import { render } from 'preact'
import { FiX } from 'react-icons/fi'

import './notification.scss'

export const showNotification = (message, className) => {
  const container = document.createElement('div')
  container.id = 'notification'

  if (className) {
    container.className = className
  }

  const app = document.getElementById('app')
  app.appendChild(container)

  let interval

  render(
    <>
      <span>{message}</span>

      <span
        onClick={() => {
          app?.removeChild(container)
          clearInterval(interval)
        }}
      >
        <FiX size={24} />
      </span>
    </>,
    container
  )

  interval = setTimeout(() => {
    app?.removeChild(container)
  }, 7000)
}
