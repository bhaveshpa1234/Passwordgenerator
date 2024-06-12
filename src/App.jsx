import { useState, useCallback,useEffect, useRef } from 'react'
import './App.css'


function App() {

  const [length, setLength] = useState(8)
  const [numberallowed, setNumberallowed] = useState(false)
  const [charallowed, setCharallowed] = useState(false)
  const [Password, setPassword] = useState('')
  const passwordRef=useRef(null)
  const passwordgenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberallowed) str += "0123456789"
    if (charallowed) str += "!@#$%^&*()"

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numberallowed, charallowed, setPassword])

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99999)
    window.navigator.clipboard.writeText(Password)
  },[Password])

  useEffect(() => {
    passwordgenerator()
  }, [length, numberallowed, charallowed, passwordgenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center my-3'>Password generator </h1>
        <div className='classname="flex shadow ronded-lg overflow-hidden mb-4'>
          <input type="text" value={Password} className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly 
            ref={passwordRef}
          />
          <button onClick={copyPassword} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
        </div>
        <div className='flex items-center gap-x-1'>
          <div className='flex items-center gap-x-1'>
            <input type='range'
              min={6}
              max={50} value={length}
              className='cursor-pointer' onChange={(e) => { setLength(e.target.value) }} />
            <label>length:{length}</label>
            <div className='flex items-center gap-x-1'>
              <input type='checkbox' defaultChecked={numberallowed}
                id='numberInput' onChange={() => { setNumberallowed((prev) => !prev); }} />
              <label htmlFor='numberInput'>number</label>
            </div>
            <input type='checkbox' defaultChecked={numberallowed}
              id='numberInput' onChange={() => { setCharallowed((prev) => !prev); }} />
            <label htmlFor='numberInput'>Charcater</label>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
