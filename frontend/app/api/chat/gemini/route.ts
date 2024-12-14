import { NextResponse } from 'next/server'
import { chatGemini } from '@/app/actions/chat'

export async function POST(req: Request) {
  const { messages } = await req.json()
  const result = await chatGemini(messages)
  return NextResponse.json(result)
}

