import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import todoAtom from '../states/TodoAtom'

export default function TodoItem({ todo }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(todo.text)
  const setTodos = useSetRecoilState(todoAtom)

  function handleDelete() {
    setTodos((prevTodos) => prevTodos.filter((item) => item.id !== todo.id))
  }

  function handleStartEdit() {
    setDraft(todo.text)
    setIsEditing(true)
  }

  function handleSave() {
    const value = draft.trim()
    if (!value) {
      return
    }

    setTodos((prevTodos) =>
      prevTodos.map((item) =>
        item.id === todo.id
          ? {
              ...item,
              text: value,
            }
          : item,
      ),
    )
    setIsEditing(false)
  }

  function handleCancel() {
    setDraft(todo.text)
    setIsEditing(false)
  }

  return (
    <li className='todo-item'>
      {isEditing ? (
        <input
          className='todo-input'
          type='text'
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
      ) : (
        <span>{todo.text}</span>
      )}

      <div className='todo-actions'>
        {isEditing ? (
          <>
            <button onClick={handleSave}>Luu</button>
            <button onClick={handleCancel}>Huy</button>
          </>
        ) : (
          <button onClick={handleStartEdit}>Sua</button>
        )}
        <button onClick={handleDelete}>Xoa</button>
      </div>
    </li>
  )
}