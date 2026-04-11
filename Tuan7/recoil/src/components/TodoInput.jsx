import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import todoAtom from '../states/TodoAtom'

export default function TodoInput() {
  const [text, setText] = useState('')
  const setTodos = useSetRecoilState(todoAtom)

  function handleAddTodo() {
    const value = text.trim()
    if (!value) {
      return
    }

    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: Date.now(),
        text: value,
      },
    ])
    setText('')
  }

  return (
    <div className='todo-input-row'>
      <input
        className='todo-input'
        type='text'
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder='Nhap noi dung todo'
      />
      <button onClick={handleAddTodo}>Them</button>
    </div>
  )
}