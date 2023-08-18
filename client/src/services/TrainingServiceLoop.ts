import EventState from "../dtos/EventState";
import GptAgent from "./gpt/GptAgent";
import TextToSpeechService from "./text-to-speech/TextToSpeechService";
import VoiceRecognition, { IWindow } from "./voice/VoiceRecognition";

class TrainingServiceLoop {
  constructor (window: Window, setState: (state: EventState) => void) {
    this.Voice = new VoiceRecognition(window as unknown as IWindow);
    this.Speech = new TextToSpeechService(window);
    this.GPT = new GptAgent();
    this.SetState = setState;
  }

  protected Voice: VoiceRecognition;

  protected Speech: TextToSpeechService;

  protected GPT: GptAgent;

  protected SetState: (state: EventState) => void;

  run = async () => {
    while (true) {
      this.SetState(EventState.speak);
      this.Voice.start();
      const question = await this.Voice.autoStop();
      console.log(question);

      this.SetState(EventState.loadingAnwser);
      const answer = await this.GPT.ask(question);

      this.SetState(EventState.listen);
      await this.Speech.speak(answer);

      this.SetState(EventState.done);
    }
  }
}

export default TrainingServiceLoop;
