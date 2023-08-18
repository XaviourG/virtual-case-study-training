import EventState from "../dtos/EventState";
import TextToSpeechService from "./text-to-speech/TextToSpeechService";
import VoiceRecognition, { IWindow } from "./voice/VoiceRecognition";

class TrainingServiceLoop {
  constructor (window: Window, setState: (state: EventState) => void) {
    this.Voice = new VoiceRecognition(window as unknown as IWindow);
    this.Speech = new TextToSpeechService(window);
    this.SetState = setState;
  }

  protected Voice: VoiceRecognition;

  protected Speech: TextToSpeechService;

  protected SetState: (state: EventState) => void;

  run = async () => {
    this.SetState(EventState.speak);
    this.Voice.start();
    const question = await this.Voice.autoStop();
    console.log(question);

    this.SetState(EventState.loadingAnwser);
    await new Promise(f => setTimeout(f, 1000));
    const answer = 'This is a fake anwser I\'m pretending to load from chat g p t';

    this.SetState(EventState.listen);
    await this.Speech.speak(answer);

    this.SetState(EventState.done);
  }
}

export default TrainingServiceLoop;
