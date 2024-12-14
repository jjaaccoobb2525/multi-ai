import { NextResponse } from 'next/server'
import { chatGPT } from '@/app/actions/chat'

export async function POST(req: Request) {
  const { messages } = await req.json()
  const result = await chatGPT(messages)
  return NextResponse.json(result)
}

