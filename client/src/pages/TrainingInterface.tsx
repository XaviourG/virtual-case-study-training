import { ReactElement } from "react";
import AttitudeIndicator from "../components/AttitudeIndicator";

const TrainingInterface = (): ReactElement => {

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      width: '100%'
    }}>
      <div style={{ paddingTop: '33vh' }}>
        <AttitudeIndicator
          attitude={90}
          speak={true}
        />
      </div>
    </div>
  );
};

export default TrainingInterface;
