import { useLayoutEffect } from 'react'
import { useForm } from 'react-hook-form'
import { MdError } from 'react-icons/md'
import { inputPasswordSettings, inputUsernameSettings } from '../constants/auth/input'
import { setAuthState } from '../redux/reducer/auth'
import Button from '../components/ui/button/Button'
import TextInput from '../components/ui/inputs/text-input/TextInput'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

const Auth = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'))

    if (!todos) { router.push('/'); return }

    dispatch(setAuthState())
  }, [])

  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = data => {}

  return (
    <section className={ 'auth' }>
      <form className={ 'auth__form' } onSubmit={ handleSubmit(onSubmit) }>
        <div className={ 'auth__chunk' }>
          <TextInput
            defaultValue={ 'kminchelle' }
            label={ 'Логин' }
            id={ 'username' }
            register={ register('username', inputUsernameSettings) }
          />
          { errors.username && <span className={ 'auth__error-message' }><MdError/>{ errors.username.message }</span> }
        </div>
        <div className={ 'auth__chunk' }>
          <TextInput
            defaultValue={ '0lelplR' }
            label={ 'Пароль' }
            id={ 'password' }
            register={ register('password', inputPasswordSettings) }
          />
          { errors.password && <span className={ 'auth__error-message' }><MdError/>{ errors.password.message }</span> }
        </div>
        <Button type={ 'submit' } title={ 'Войти' }/>
      </form>
    </section>
  )
}

export default Auth
