class TextToSpeechService {
  constructor (window: Window) {
    this.speechEngine = window.speechSynthesis;
  }

  protected speechEngine: SpeechSynthesis;

  speak = async (text: string): Promise<SpeechSynthesisEvent> => {
    const utterence = new SpeechSynthesisUtterance(text);
    utterence.rate = 0.9;
    this.speechEngine.speak(utterence);
    return new Promise(resolve => {
      utterence.onend = resolve;
    });
  }

}

export default TextToSpeechService;
