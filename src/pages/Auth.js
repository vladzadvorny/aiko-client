import { useState, useEffect } from 'preact/hooks'
import { Link } from 'preact-router/match'
import { route } from 'preact-router'

import './Auth.scss'

import { showNotification } from '../utils/notification'
import { agent } from '../utils/agent'
import { storage } from '../constants/storage'
import { getErrorMessage } from '../utils/errors'
import { state } from '../store'
import images from '../assets/images'

const Auth = () => {
  const [viewMode, setViewMode] = useState('login') // register, reset
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    resetForm()
    setError(null)
  }, [viewMode])

  useEffect(() => {
    if (error) {
      showNotification(`${getErrorMessage(error)}!`, 'error')
    }
  }, [error])

  const resetForm = () => {
    setEmail('')
    setName('')
    setPassword('')
    setPasswordConfirm('')
  }

  const send = async () => {
    setLoading(true)
    try {
      const data = await agent('/auth/local', {
        method: {
          register: 'PUT',
          login: 'POST',
          reset: 'PATCH'
        }[viewMode],
        body: { email, name, password, passwordConfirm }
      })

      if (data.error) {
        setError(data.error)
      } else {
        if (viewMode === 'reset' && data.ok) {
          showNotification(
            'Новый пароль отправлен на почту. Если письма нет в основной папке, проверь папку "Спам"',
            'success'
          )
          return
        }
        localStorage.setItem(storage.token, data.token)
        state.me = data.me

        route('/candidates', true)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div id="auth">
      <div className="auth-form">
        {/* @ts-ignore */}
        <Link activeClassName="active" href="/" className="logo">
          <img src={images.logo} alt="" />
        </Link>

        {['login', 'register'].includes(viewMode) ? (
          <div className="auth-tabs">
            <span className={viewMode === 'login' ? 'active' : ''} onClick={() => setViewMode('login')}>
              Вход
            </span>
            <span className={viewMode === 'register' ? 'active' : ''} onClick={() => setViewMode('register')}>
              Регистрация
            </span>
          </div>
        ) : (
          <h5>Восстановление пароля</h5>
        )}

        <form onSubmit={e => e.preventDefault()}>
          <fieldset>
            {['login', 'register', 'reset'].includes(viewMode) && (
              <label htmlFor="email" {...(error && error.fields.includes('email') && { className: 'error' })}>
                Емейл
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.currentTarget.value)}
                  onFocus={() => setError(null)}
                />
              </label>
            )}
            {['register'].includes(viewMode) && (
              <label htmlFor="name" {...(error && error.fields.includes('name') && { className: 'error' })}>
                Имя
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={e => setName(e.currentTarget.value)}
                  onFocus={() => setError(null)}
                />
              </label>
            )}
            {['login', 'register'].includes(viewMode) && (
              <label
                htmlFor="password"
                {...(error && error.fields.includes('password') && { className: 'error' })}
              >
                Пароль
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={e => setPassword(e.currentTarget.value)}
                  onFocus={() => setError(null)}
                />
              </label>
            )}
            {['register'].includes(viewMode) && (
              <label
                htmlFor="passwordConfirm"
                {...(error &&
                  error.fields.includes('passwordConfirm') && {
                    className: 'error'
                  })}
              >
                Повторите пароль
                <input
                  type="password"
                  id="passwordConfirm"
                  value={passwordConfirm}
                  onChange={e => setPasswordConfirm(e.currentTarget.value)}
                  onFocus={() => setError(null)}
                />
              </label>
            )}
          </fieldset>
          <div className="buttons">
            {['reset'].includes(viewMode) && (
              <button type="submit" className="outline" onClick={() => setViewMode('login')}>
                Отмена
              </button>
            )}
            <button type="submit" onClick={send}>
              {
                {
                  register: 'Зарегистрироваться',
                  login: 'Войти',
                  reset: 'Восстановить'
                }[viewMode]
              }
            </button>
          </div>
          {['login'].includes(viewMode) && (
            <div className="reset">
              <span className="link" onClick={() => setViewMode('reset')}>
                Восстановить пароль
              </span>
            </div>
          )}
        </form>
      </div>
      {/* <style>{`body{padding-top:0;}`}</style> */}
    </div>
  )
}

export default Auth
