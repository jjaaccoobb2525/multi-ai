import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env["GPT_API_KEY"]
});

export async function gpt() {
  const chatCompletion = await client.chat.completions.create({
    messages: [{ role: "user", content: "Say this is a test" }],
    model: "gpt-4o-mini"
  });

  return chatCompletion.choices[0].message.content;
}
