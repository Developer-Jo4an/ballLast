import Builder from '../../utils/redux/builder'

export const AUTH_STATIC = 'static'

const SLICE_NAME = 'auth'
const initialState = {
  state: AUTH_STATIC
}

const builder = new Builder({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState: state => {
      state.state = AUTH_STATIC
    }
  }
})
.createExtraReducer({
  thunkName: 'login',
  thunkExtraName: 'login',
  onSubmit: state => {},
  saveData: (state, action) => {},
  saveError: (state, action) => {},
  func: data => {}
})
.createSelector('auth-state', state => {
  return state[SLICE_NAME].state
})

const auth = builder.create().export()

export const { useAuthState } = auth.selectors
export const { setAuthState } = auth.actions
export const { useLogin } = auth.thunks

export default auth
