import { useCallback, useState, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  // useref hook

  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllowed) str += "0123456789"
    if (charAllowed) str += "`~!@#$%^&*(){}[]`"

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 10);
    window.navigator.clipboard.writeText(password)
  },
    [password])
  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, charAllowed, passwordGenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-3xl px-8 py-6
     my-8 text-orange-500 bg-gray-800 mt-40'>
        <h1 className='text-white text-center text-2xl my-3'>Password generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} className='outline-none w-full py-1 px-3 rounded-md text-black' placeholder='Password'
            readOnly ref={passwordRef} />

          <button onClick={passwordGenerator} className='bg-gray-600 px-2 py-2 rounded-lg text-white mx-1'>Generate</button>
          <button onClick={copyPasswordToClipboard} className='px-3 py-0.5 bg-blue-700 text-white mx-2 rounded-md shrink-0 '>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1 '>
            <input type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>length : {length}</label>
          </div>
          <div className='flex items-center gap-x-1 '>
            <input type="checkbox"
              defaultChecked={numAllowed}
              id='numberInput'
              onChange={() => {
                setNumAllowed((prev) => !prev)
              }}
            />
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1 '>
            <input type="checkbox"
              defaultChecked={charAllowed}
              id='numberInput'
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}
            />
            <label htmlFor='numberInput'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App