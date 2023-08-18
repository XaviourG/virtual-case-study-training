import 'react'
import './App.css'
import VoiceRecognition, { IWindow } from './services/voice/VoiceRecognition'

function App() {
  const speechEngine = new VoiceRecognition(window as unknown as IWindow);

  return (
    <>
      <div>
        <button>
          <p style={{
            fontSize: '3rem',
            paddingLeft: '6rem',
            paddingRight: '6rem',
          }}>Start</p>
        </button>
        <button onClick={() => speechEngine.start()}>rec</button>
        <button onClick={() => console.log(speechEngine.stop())}>stop</button>
      </div>
      <p className="read-the-docs">
        Virtual client handling training system.
      </p>
    </>
  )
}

export default App
