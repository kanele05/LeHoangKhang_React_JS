import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import counterAtom from '../states/CounterAtom'
import userAtom from '../states/UserAtom'
import useNotify from '../hooks/useNotify'

export default function ComB() {
  const [value, setValue] = useRecoilState(counterAtom)
  const valuegs = useRecoilValue(counterAtom)
  const user = useRecoilValue(userAtom)
  const notify = useNotify()

  function handleInc() {
    setValue(value + 1)
    notify('Da tang counter')
  }

  function handleDec() {
    setValue(value - 1)
    notify('Da giam counter')
  }

  return (
    <div className='panel'>
      <p>ComB: {valuegs}</p>
      <p>User: {user ? user.username : 'Chua dang nhap'}</p>
      <button onClick={handleInc}>Inc</button>
      <button onClick={handleDec}>Dec</button>
    </div>
  )
}
