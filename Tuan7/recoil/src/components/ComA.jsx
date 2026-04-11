import React from 'react'
import { useRecoilValue } from 'recoil'
import counterAtom from '../states/CounterAtom'
import userAtom from '../states/UserAtom'

export default function ComA() {
  const value = useRecoilValue(counterAtom)
  const user = useRecoilValue(userAtom)

  return (
    <div className='panel'>
      <h2>ComA: {value}</h2>
      <p>User: {user ? user.username : 'Chua dang nhap'}</p>
    </div>
  )
}
