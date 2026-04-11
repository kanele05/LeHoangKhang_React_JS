import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import usersAtom from '../states/UsersAtom'

export default function UsersPanel() {
  const [usersState, setUsersState] = useRecoilState(usersAtom)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchUsers() {
      setUsersState((prev) => ({ ...prev, loading: true, error: null }))

      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users',
          {
            signal: controller.signal,
          },
        )

        if (!response.ok) {
          throw new Error('Khong the tai danh sach user')
        }

        const users = await response.json()

        setUsersState({
          data: users,
          loading: false,
          error: null,
        })
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return
        }

        setUsersState({
          data: [],
          loading: false,
          error: error instanceof Error ? error.message : 'Da xay ra loi',
        })
      }
    }

    fetchUsers()

    return () => {
      controller.abort()
    }
  }, [setUsersState])

  return (
    <div className='panel auth-panel'>
      <h2>Fetch Users (Global Async)</h2>

      {usersState.loading && (
        <div className='users-loading'>
          <span className='spinner' />
          <span>Dang tai du lieu users...</span>
        </div>
      )}

      {usersState.error && <p className='users-error'>Loi: {usersState.error}</p>}

      {!usersState.loading && !usersState.error && (
        <ul className='users-list'>
          {usersState.data.length === 0 ? (
            <li>Khong co user nao.</li>
          ) : (
            usersState.data.map((user) => (
              <li className='users-item' key={user.id}>
                <strong>{user.name}</strong>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}
