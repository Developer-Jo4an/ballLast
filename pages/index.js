import {useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {useForm} from 'react-hook-form';
import {MdError} from 'react-icons/md';
import {useRouter} from 'next/router';
import {
  AUTH_REQUEST,
  login,
  loginUsingToken,
  REGISTERED,
  removeAuthError,
  useAuthError,
  useAuthState
} from '../redux/reducer/auth';
import {inputPasswordSettings, inputUsernameSettings} from '../constants/auth/input';
import Button from '../components/ui/button/Button';
import Loader from '../components/loader/Loader';

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  const authState = useAuthState();
  const authError = useAuthError();

  useEffect(() => {
    dispatch(loginUsingToken());
  }, []);

  useEffect(() => {
    if (authState === REGISTERED) router.push('/game');
  }, [authState]);

  const inputFocusLogic = e => {
    e.target.classList.toggle('text-input-focus');
    dispatch(removeAuthError());
  };

  const {register, handleSubmit, formState: {errors}} = useForm();
  const onSubmit = data => dispatch(login(data));

  return (
    <section className={'auth'}>
      <form className={'auth__form'} onSubmit={handleSubmit(onSubmit)}>
        <div className={'auth__chunk'}>
          <label className={'text-label'} htmlFor={'username'}>
            Имя
            <input
              id={'username'}
              type={'text'}
              defaultValue={'kminchelle'}
              placeholder={'Username'}
              className={'text-input'}
              {...register('username', inputUsernameSettings)}
              onFocus={inputFocusLogic}
              onBlur={inputFocusLogic}
            />
          </label>
          {errors.username && <span className={'auth__error-message'}><MdError/>{errors.username.message}</span>}
        </div>
        <div className={'auth__chunk'}>
          <label className={'text-label'} htmlFor={'password'}>
            Пароль
            <input
              id={'password'}
              type={'password'}
              defaultValue={'0lelplR'}
              placeholder={'Password'}
              className={'text-input'}
              {...register('password', inputPasswordSettings)}
              onFocus={inputFocusLogic}
              onBlur={inputFocusLogic}
            />
          </label>
          {errors.password && <span className={'auth__error-message'}><MdError/>{errors.password.message}</span>}
        </div>
        {authError.message && <span className={'auth__error-message'}>{authError.message}</span>}
        <Button type={'submit'} title={'Войти'}/>
      </form>
      {authState === AUTH_REQUEST && <Loader/>}
    </section>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
