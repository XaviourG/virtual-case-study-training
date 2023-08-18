class TextToSpeechService {
  constructor (window: Window) {
    this.speechEngine = window.speechSynthesis;
  }

  protected speechEngine: SpeechSynthesis;

  speak = (text: string): void => {
    const utterence = new SpeechSynthesisUtterance(text);
    this.speechEngine.speak(utterence);
  }

}

export default TextToSpeechService;
