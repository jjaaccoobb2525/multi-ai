import { NextResponse } from 'next/server'
import { chatClaude } from '@/app/actions/chat'

export async function POST(req: Request) {
  const { messages } = await req.json()
  const result = await chatClaude(messages)
  return NextResponse.json(result)
}

