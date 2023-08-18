import 'react'
import './App.css'
import VoiceRecognition, { IWindow } from './services/voice/VoiceRecognition'
import TextToSpeechService from './services/text-to-speech/TextToSpeechService';

export enum eventState {
  start = 0,
  speak = 1,
  loadingAnwser = 2,
  listen = 3,
  done = 10,
}

function App() {
  const speechEngine = new VoiceRecognition(window as unknown as IWindow);
  const tts = new TextToSpeechService(window);

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
        <button onClick={() => {
          speechEngine.start();
          speechEngine.autoStop().then((text) => console.log(`AUTO:\n${text}`))
        }}>rec</button>
        <button onClick={() => console.log(speechEngine.stop())}>stop</button>
        <button onClick={() => console.log(tts.speak('howdy partner'))}>speak</button>
      </div>
      <p className="read-the-docs">
        Virtual client handling training system.
      </p>
    </>
  )
}

export default App
