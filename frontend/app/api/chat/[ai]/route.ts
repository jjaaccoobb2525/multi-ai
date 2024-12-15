import { NextResponse } from "next/server";
import { chatGPT, chatGemini, chatClaude } from "@/app/actions/chat";

export async function POST(
  req: Request,
  { params }: { params: { ai: string } }
) {
  const { messages } = await req.json();
  let result;

  switch (params.ai.toLowerCase()) {
    case "gpt":
      result = await chatGPT(messages);
      break;
    case "gemini":
      result = await chatGemini(messages);
      break;
    case "claude":
      result = await chatClaude(messages);
      break;
    default:
      return NextResponse.json(
        { error: "Invalid AI service" },
        { status: 400 }
      );
  }

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ content: result.response });
}
