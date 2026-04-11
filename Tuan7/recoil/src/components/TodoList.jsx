import { useRecoilValue } from 'recoil'
import todoAtom from '../states/TodoAtom'
import TodoItem from './TodoItem'

export default function TodoList() {
  const todos = useRecoilValue(todoAtom)

  if (todos.length === 0) {
    return <p>Chua co todo nao.</p>
  }

  return (
    <ul className='todo-list'>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}