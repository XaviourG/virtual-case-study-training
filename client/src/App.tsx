import 'react'
import './App.css'
import { useState } from 'react';
import TrainingServiceLoop from './services/TrainingServiceLoop';
import EventState from './dtos/EventState';

function App() {
  const [state, setState] = useState<EventState>(EventState.start);
  const trainingService = new TrainingServiceLoop(window, setState);

  if (state === EventState.start) {
    return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh'}}>
      <button onClick={trainingService.run}>
          <p style={{
            fontSize: '3rem',
            paddingLeft: '6rem',
            paddingRight: '6rem',
          }}>Start</p>
        </button>
    </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh'}}>
      <p style={{ fontSize: '2rem' }}>{EventState[state]}</p>
    </div>
  )
}

export default App
