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

  stop = (): string => {
    this.speechEngine.stop();
    const result = this.transcript.join(" ");
    this.transcript = [];
    return result;
  }
  
}

export default VoiceRecognition;
