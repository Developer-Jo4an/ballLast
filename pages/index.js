import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { MdError } from 'react-icons/md'
import { loginUsingToken, useAuthState } from '../redux/reducer/auth'
import { inputPasswordSettings, inputUsernameSettings } from '../constants/auth/input'
import Button from '../components/ui/button/Button'

export default function Home() {
  const dispatch = useDispatch()
  const authState = useAuthState()

  useEffect(() => {
    dispatch(loginUsingToken())
  }, [])

  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = data => {
  }

  return (
    <section className={ 'auth' }>
      <form className={ 'auth__form' } onSubmit={ handleSubmit(onSubmit) }>
        <div className={ 'auth__chunk' }>
          <label className={ 'text-label' } htmlFor={ 'username' }>
            Логин
            <input
              id={ 'username' }
              type={ 'text' }
              defaultValue={ 'kminchelle' }
              className={ 'text-input' }
              { ...register('username', inputUsernameSettings) }
            />
          </label>
          { errors.username && <span className={ 'auth__error-message' }><MdError/>{ errors.username.message }</span> }
        </div>
        <div className={ 'auth__chunk' }>
          <label className={ 'text-label' } htmlFor={ 'password' }>
            Пароль
            <input
              id={ 'password' }
              type={ 'password' }
              defaultValue={ '0lelplR' }
              className={ 'text-input' }
              { ...register('password', inputPasswordSettings) }
            />
          </label>
          { errors.password && <span className={ 'auth__error-message' }><MdError/>{ errors.password.message }</span> }
        </div>
        <Button type={ 'submit' } title={ 'Войти' } />
      </form>
    </section>
  )
}

export async function getStaticProps() {
  return {
    props: {},
  }
}
