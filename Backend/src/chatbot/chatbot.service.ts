import Groq from "groq-sdk";

import { retrieveRelevantChunks } from "./retriever";
import { buildPrompt } from "./prompt";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function askGitScope(question: string) {
  const chunks = await retrieveRelevantChunks(question);

  const prompt = buildPrompt(question, chunks);

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.2,
  });

  return response.choices[0]?.message?.content ?? "No response generated.";
}