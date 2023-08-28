import { ReactElement, useEffect, useState } from "react";
import AttitudeIndicator from "../components/AttitudeIndicator";
import EventState from "../dtos/EventState";
import TrainingServiceLoop from "../services/TrainingServiceLoop";
import colours from "../Colours";

const TrainingInterface = (): ReactElement => {
  const [state, setState] = useState<EventState>(EventState.start);
  const [attitude, setAttitude] = useState<number>(30);
  const [speak, setSpeak] = useState<boolean>(false);
  const trainingService = new TrainingServiceLoop(
    window,
    setState,
    setAttitude,
  );

  useEffect(() => {
    if (state === EventState.speak && !speak) {
      setSpeak(true);
    } else if (speak) {
      setSpeak(false);
    }
  }, [state])

  if (state === EventState.start) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        paddingTop: '33vh',
      }}>
        <button onClick={trainingService.run} style={{
          backgroundImage: `linear-gradient(45deg, ${colours.gradients.purple.start}, ${colours.gradients.purple.middle}, ${colours.gradients.purple.end})`,
          backgroundSize: '300%',
          animation: 'gradient-bg-animate 5s infinite alternate',
          borderRadius: '30px',
          width: '20rem',
          height: '10rem',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <p style={{
            fontSize: '5rem',
            fontWeight: '800',
            color: 'white',
          }}>
            START
          </p>
        </button>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      width: '100%'
    }}>
      <div style={{ paddingTop: '33vh' }}>
        <AttitudeIndicator
          attitude={attitude}
          speak={speak}
        />
        <p>{EventState[state]}</p>
        <p>{attitude}</p>
      </div>
    </div>
  );
};

export default TrainingInterface;
