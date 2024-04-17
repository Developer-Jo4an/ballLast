import Builder from '../../utils/redux/builder'
import requester from '../../utils/requester/Requester'

const SLICE_NAME = 'todos'
export const TODOS_STATIC = 'todosStatic'
export const TODOS_LOADING = 'todosLoading'
export const TODOS_LOADING_COMPLETE = 'todosLoadingComplete'

const initialState = {
  state: TODOS_STATIC,
  todos: [],
  error: null
}

const builder = new Builder({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setTodos: (state, { payload: { nextState, todos } }) => {
      state.state = nextState
      state.todos = todos
    }
  }
})
.createExtraReducer({
  thunkName: 'get-todos',
  thunkExtraName: 'getTodos',
  onSubmit: state => {
    state.state = TODOS_LOADING
  },
  saveData: (state, { payload }) => {
    localStorage.setItem('todos', JSON.stringify(payload))
    state.todos = payload
    state.state = TODOS_LOADING_COMPLETE
  },
  saveError: (state, { payload }) => {
    const { status, code, message } = payload
    state.error = { status, code, message }
    state.state = TODOS_STATIC
  },
  func: () => requester.getTodos()
})
.createSelector('todos-state', state => {
  return state[SLICE_NAME].state
})
.createSelector('todos-list', state => {
  return state[SLICE_NAME].todos
})

const todos = builder.create().export()

export const { useTodosState, useTodosList } = todos.selectors
export const { setTodos } = todos.actions
export const { getTodos } = todos.thunks

export default todos
