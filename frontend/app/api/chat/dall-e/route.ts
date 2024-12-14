import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { messages } = await req.json()
  const lastMessage = messages[messages.length - 1]
  
  // This is a mock response. Replace with actual DALL-E API call
  const response = `DALL-E response to: "${lastMessage.content}"`

  return NextResponse.json({ response })
}

