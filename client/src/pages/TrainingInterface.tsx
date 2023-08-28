import { ReactElement, useEffect, useState } from "react";
import AttitudeIndicator from "../components/AttitudeIndicator";
import EventState from "../dtos/EventState";
import TrainingServiceLoop from "../services/TrainingServiceLoop";

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
      <div>
        <button onClick={trainingService.run}>
          Start
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
