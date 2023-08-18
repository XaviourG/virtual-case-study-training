/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IWindow extends Window {
  webkitSpeechRecognition: any;
  SpeechRecognition: any;
}

class VoiceRecognition {
  constructor(window: IWindow) {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const engine: any = new SpeechRecognition();

    engine.interimResults = true;
    engine.continuous = true;

    engine.addEventListener('result', (e: any) => {
      const transcript = Array.from(e.results)
        .map((result) => (result as any[])[0])
        .map((result) => result.transcript);
      this.transcript = transcript;
    });

    this.speechEngine = engine;
    this.transcript = [];
  }

  protected speechEngine: any;

  protected transcript: string[];

  start = () => {
    this.speechEngine.start();
  }

  autoStop = async (): Promise<string> => {
    let clock = 0;
    let events = 0;
    let active = true;
    this.speechEngine.addEventListener('end', () => {
      active = false;
    });
    this.speechEngine.addEventListener('result', () => {
      events++;
      clock = 0;
    });

    while (active) {
      if (events > 1 && clock >= 2) {
        console.log(`clock out ${clock}`);
        active = false;
      }
      await new Promise(f => setTimeout(f, 1000));
      clock++;
    }

    this.speechEngine.stop();
    const result = this.transcript.join(" ");
    this.transcript = [];
    return result;
  }

  stop = (): string => {
    this.speechEngine.stop();
    const result = this.transcript.join(" ");
    this.transcript = [];
    return result;
  }
  
}

export default VoiceRecognition;
