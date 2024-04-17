import Button from '../components/ui/button/Button'
import Loader from '../components/loader/Loader'
import { useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import {
  useTodosList,
  useTodosState,
  setTodos,
  TODOS_LOADING_COMPLETE,
  TODOS_LOADING,
  getTodos,
  TODOS_STATIC
} from '../redux/reducer/todos'

export default function Home() {
  const router = useRouter()
  const dispatch = useDispatch()

  const todosState = useTodosState()
  const todosList = useTodosList()

  const goToAuth = () => router.push('/auth')
  const getTodosRequest = () => dispatch(getTodos())

  useLayoutEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'))
    if (todos) {
      dispatch(setTodos({
        nextState: TODOS_LOADING_COMPLETE,
        todos
      }))
    }
  }, [])

  return (
    <div className="container">
      { todosState === TODOS_STATIC && <Button title={ 'Get todos' } onClick={ getTodosRequest } /> }
      { todosState === TODOS_LOADING && <Loader/> }
      { todosState === TODOS_LOADING_COMPLETE && todosList.map(todo => <div key={ todo.id }>{ JSON.stringify(todo) }</div>) }
      { todosState === TODOS_LOADING_COMPLETE && <Button title={ 'Далее' } onClick={ goToAuth } /> }
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {},
  }
}
