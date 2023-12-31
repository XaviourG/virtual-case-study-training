import EventState from "../dtos/EventState";
import GptAgent, { GptMessage } from "./gpt/GptAgent";
import { GPT_SETUP } from "./gpt/SETUP";
import TextToSpeechService from "./text-to-speech/TextToSpeechService";
import VoiceRecognition, { IWindow } from "./voice/VoiceRecognition";

class TrainingServiceLoop {
  constructor (
    window: Window,
    setState: (state: EventState) => void,
    setAttitude: (attitude: number) => void,
  ) {
    this.Voice = new VoiceRecognition(window as unknown as IWindow);
    this.Speech = new TextToSpeechService(window);
    this.GPT = new GptAgent();
    this.SetState = setState;
    this.SetAttitude = setAttitude;
    this.ChatHistory = [
      { role: 'system', content: GPT_SETUP },
    ];
    this.active = true;
  }

  protected Voice: VoiceRecognition;

  protected Speech: TextToSpeechService;

  protected GPT: GptAgent;

  protected ChatHistory: GptMessage[];

  active: boolean;

  protected SetState: (state: EventState) => void;

  protected SetAttitude: (attitude: number) => void;

  run = async () => {
    while (this.active) {
      this.SetState(EventState.speak);
      this.Voice.start();
      const question = await this.Voice.autoStop();
      console.log(question);

      this.ChatHistory.push({
        role: 'user',
        content: question,
      });
      this.SetState(EventState.loadingAnwser);
      try {
        const answer = await this.GPT.ask(this.ChatHistory);
        this.ChatHistory.push({
          role: 'assistant',
          content: [answer.message, answer.attitude].join('|||'),
        });
        this.SetAttitude(answer.attitude);
        this.SetState(EventState.listen);
        await this.Speech.speak(answer.message);
      } catch (e) {
          this.SetState(EventState.error);
          this.kill();
      }
    }
  }

  kill = () => {
    this.active = false;
  }
}

export default TrainingServiceLoop;
