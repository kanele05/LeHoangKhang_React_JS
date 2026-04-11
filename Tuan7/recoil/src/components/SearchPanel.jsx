import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import searchAtom from '../states/SearchAtom'

export default function SearchPanel() {
  const [inputValue, setInputValue] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [searchState, setSearchState] = useRecoilState(searchAtom)

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(inputValue.trim())
    }, 500)

    return () => {
      clearTimeout(timerId)
    }
  }, [inputValue])

  useEffect(() => {
    const controller = new AbortController()

    async function runSearch() {
      if (!debouncedQuery) {
        setSearchState({
          query: '',
          data: [],
          loading: false,
          error: null,
        })
        return
      }

      setSearchState((prev) => ({
        ...prev,
        query: debouncedQuery,
        loading: true,
        error: null,
      }))

      try {
        const response = await fetch(
          `https://dummyjson.com/users/search?q=${encodeURIComponent(debouncedQuery)}`,
          {
            signal: controller.signal,
          },
        )

        if (!response.ok) {
          throw new Error('Khong the tim kiem users')
        }

        const payload = await response.json()

        setSearchState({
          query: debouncedQuery,
          data: payload.users ?? [],
          loading: false,
          error: null,
        })
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return
        }

        setSearchState({
          query: debouncedQuery,
          data: [],
          loading: false,
          error: error instanceof Error ? error.message : 'Da xay ra loi',
        })
      }
    }

    runSearch()

    return () => {
      controller.abort()
    }
  }, [debouncedQuery, setSearchState])

  return (
    <div className='panel auth-panel'>
      <h2>Search + Debounce + API</h2>
      <input
        className='search-input'
        type='text'
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder='Nhap ten user de tim...'
      />

      {searchState.loading && (
        <div className='users-loading'>
          <span className='spinner' />
          <span>Dang tim kiem users...</span>
        </div>
      )}

      {searchState.error && <p className='users-error'>Loi: {searchState.error}</p>}

      {!searchState.loading && !searchState.error && searchState.query && (
        <ul className='users-list'>
          {searchState.data.length === 0 ? (
            <li>Khong tim thay user phu hop.</li>
          ) : (
            searchState.data.map((user) => (
              <li className='users-item' key={user.id}>
                <strong>
                  {user.firstName} {user.lastName}
                </strong>
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
