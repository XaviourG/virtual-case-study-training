import { ReactElement, useEffect, useState } from "react";
import colours from "../Colours";
import MicOffIcon from "../assets/MicOnIcon";
import MicOnIcon from "../assets/MicOnIcon";

interface props {
  attitude: number,
  speak: boolean,
}

const AttitudeIndicator = ({
  attitude,
  speak,
}: props): ReactElement => {
  const [gradient, setGradient] = useState(colours.gradients.purple);

  useEffect(() => {
    if (attitude > 70 && gradient.start !== colours.gradients.green.start) {
      setGradient(colours.gradients.green);
    } else if (attitude < 30 && gradient.start !== colours.gradients.red.start) {
      setGradient(colours.gradients.red);
    } else if (gradient.start !== colours.gradients.purple.start) {
      setGradient(colours.gradients.purple);
    }
  }, [attitude]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '300px',
      height: '300px',
      backgroundImage: `linear-gradient(45deg, ${gradient.start}, ${gradient.middle}, ${gradient.end})`,
      backgroundSize: '300%',
      animation: 'gradient-bg-animate 5s infinite alternate',
      borderRadius: '100%',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: '90%',
        borderRadius: '100%',
        backgroundColor: 'white',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50%',
          color: gradient.middle,
        }}>
        {
          speak
          ?
          <MicOnIcon/>
          :
          <MicOffIcon/>
        }
        </div>
      </div>
    </div>
  );
};

export default AttitudeIndicator;
