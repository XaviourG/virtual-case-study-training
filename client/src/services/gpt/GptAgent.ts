import { OpenAI } from "openai";
import { GPT_API_KEY, GPT_ORG } from "./KEY";

class GptAgent {
  constructor () {
    const config = {
      organization: GPT_ORG,
      apiKey: GPT_API_KEY,
      dangerouslyAllowBrowser: true,
    }
    this.agent = new OpenAI(config);
  }

  protected agent: OpenAI;

  protected first: boolean = true;

  // protected conversation: OpenAI.Chat;

  ask = async (q: string): Promise<string> => {
    const request: OpenAI.Chat.Completions.CompletionCreateParamsNonStreaming = {
      model: 'gpt-3.5-turbo',
      messages: [],
    }
    if (this.first) {
      request.messages.push(
        {role: 'system', content: 'Hi Chat GPT, for the following question will simulate the interview process with a teenage criminal. You are to roleplay as a thirteen year old male who has been convicted for assult and put into the australian youth justice system. You are now being interviewed by your case worker for the first time. You should be slightly uncoperative towards the interviewer and only provide short responses. If the interviewer asks a closed question you are to respond in a closed manner. This simulation is to train novice case workers so they can provide better service to their charges.'},
      );
      this.first = false;
    }
    request.messages.push(
      {role: 'user', content: q },
    );

    const res = await this.agent.chat.completions.create(request);
    return res.choices[0].message.content as string;
  } 
}

export default GptAgent;
