import Builder from '../../utils/redux/builder'
import requester from '../../utils/requester/Requester'

const SLICE_NAME = 'auth'

export const NOT_REGISTERED = 'notRegistered'
export const AUTH_REQUEST = 'authRequest'
export const REGISTERED = 'registered'

const initialState = {
  activeState: NOT_REGISTERED,
  error: { message: null },
  info: null
}

const builder = new Builder({
  name: SLICE_NAME,
  initialState,
  reducers: {}
})
.createExtraReducer({
  thunkName: 'login',
  thunkExtraName: 'login',
  onSubmit: state => {
    state.activeState = AUTH_REQUEST
  },
  saveData: (state, { payload }) => {
    state.isAuth = REGISTERED
    state.info = payload
  },
  saveError: (state, { payload }) => {
    state.activeState = NOT_REGISTERED

    const { request: { status } } = payload

    if (status === 400)
      state.error = 'Неверный логин или пароль!'

    state.error.message = 'Произошла кака-то ошибка!'
  },
  func: async data => requester.login(data)
})
.createExtraReducer({
  thunkName: 'login-using-token',
  thunkExtraName: 'loginUsingToken',
  onSubmit: state => {
    state.activeState = AUTH_REQUEST
  },
  saveData: (state, { payload }) => {
    state.isAuth = REGISTERED
    state.info = payload
  },
  saveError: state => {
    console.log('log1')
    state.activeState = NOT_REGISTERED
  },
  func: async () => requester.loginUsingToken()
})
.createSelector('auth-state', state => {
  return state[SLICE_NAME].activeState
})
.createSelector('auth-info', state => {
  return state[SLICE_NAME].info
})
.createSelector('auth-error', state => {
  return state[SLICE_NAME].error
})

const auth = builder.create().export()

export const { useAuthState, useAuthInfo, useAuthError } = auth.selectors
export const { login, loginUsingToken } = auth.thunks

export default auth


