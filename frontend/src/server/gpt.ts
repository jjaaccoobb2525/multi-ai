"use sever";

import OpenAI from "openai";

const client = new OpenAI({
  apiKey:
    "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",
  dangerouslyAllowBrowser: true
});

export async function gpt(prompt: string) {
  const chatCompletion = await client.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4o-mini"
  });

  return chatCompletion.choices[0].message.content;
}
