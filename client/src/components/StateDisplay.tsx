import { ReactElement } from "react";
import EventState from "../dtos/EventState";
import colours from "../Colours";

interface props {
  state: EventState,
}

const StateDisplay = ({
  state,
}: props): ReactElement => {

  const isError = () => (state === EventState.error);

  return (
    <div>
      <p style={{
        color: isError() ? colours.gradients.red.end : colours.neutral.dark,
        padding: '0.5rem',
        border: `1px solid ${isError() ? colours.gradients.red.end : colours.neutral.mid}`,
        backgroundColor: colours.neutral.light,
        borderRadius: '20px',
      }}>
        {EventState[state]}
      </p>
    </div>
  );
};

export default StateDisplay;
