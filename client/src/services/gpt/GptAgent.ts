import { OpenAI } from "openai";
import { GPT_API_KEY, GPT_ORG } from "./KEY";

export interface GptMessage {
  role: "function" | "system" | "user" | "assistant",
  content: string,
}

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

  ask = async (messageList: GptMessage[]): Promise<string> => {
    const request: OpenAI.Chat.Completions.CompletionCreateParamsNonStreaming = {
      model: 'gpt-3.5-turbo',
      messages: messageList,
    }

    const res = await this.agent.chat.completions.create(request);
    return res.choices[0].message.content as string;
  } 
}

export default GptAgent;
