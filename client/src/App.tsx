import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <button onClick={() => setCount((count) => count + 1)}>
          <p style={{
            fontSize: '3rem',
            paddingLeft: '6rem',
            paddingRight: '6rem',
          }}>Start</p>
        </button>
      </div>
      <p className="read-the-docs">
        Virtual client handling training system.
      </p>
    </>
  )
}

export default App
