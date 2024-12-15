'use client'

import { useState } from 'react'
import { useChat } from 'ai/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

const AI_SERVICES = ['GPT-3', 'Claude', 'DALL-E']

export default function MultiAIChat() {
  const [activeAI, setActiveAI] = useState<string>(AI_SERVICES[0])
  const [sharedInput, setSharedInput] = useState('')

  const chatStates = AI_SERVICES.reduce((acc, ai) => {
    acc[ai] = useChat({ api: `/api/chat/${ai.toLowerCase()}` })
    return acc
  }, {} as Record<string, ReturnType<typeof useChat>>)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (sharedInput.trim()) {
      chatStates[activeAI].append({
        content: sharedInput,
        role: 'user',
      })
      chatStates[activeAI].reload()
      setSharedInput('')
    }
  }

  return (
    <div className="flex flex-col h-screen max-h-screen">
      <div className="flex-1 flex overflow-hidden">
        {AI_SERVICES.map((ai) => (
          <ChatWindow
            key={ai}
            aiName={ai}
            messages={chatStates[ai].messages}
            isActive={activeAI === ai}
          />
        ))}
      </div>
      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            value={sharedInput}
            onChange={(e) => setSharedInput(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1"
          />
          <select
            value={activeAI}
            onChange={(e) => setActiveAI(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            {AI_SERVICES.map((ai) => (
              <option key={ai} value={ai}>
                {ai}
              </option>
            ))}
          </select>
          <Button type="submit">Send</Button>
        </form>
      </div>
    </div>
  )
}

function ChatWindow({ aiName, messages, isActive }: {
  aiName: string
  messages: { content: string; role: 'user' | 'assistant' }[]
  isActive: boolean
}) {
  return (
    <div className={`flex-1 p-4 ${isActive ? 'bg-background' : 'bg-muted'}`}>
      <h2 className="text-lg font-semibold mb-4">{aiName}</h2>
      <ScrollArea className="h-[calc(100vh-180px)]">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.role === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <span
              className={`inline-block p-2 rounded-lg ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}
            >
              {message.content}
            </span>
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}

