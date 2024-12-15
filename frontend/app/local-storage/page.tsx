'use client'

import { useState, useEffect } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

type Conversation = {
  prompt: string
  responses: Record<string, string>
}

export default function LocalStoragePage() {
  const [conversations, setConversations] = useState<Conversation[]>([])

  useEffect(() => {
    const savedConversations = localStorage.getItem('conversations')
    if (savedConversations) {
      setConversations(JSON.parse(savedConversations))
    }
  }, [])

  const downloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(conversations, null, 2))
    const downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", "conversations.json")
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  const deleteConversation = (index: number) => {
    const updatedConversations = conversations.filter((_, i) => i !== index)
    setConversations(updatedConversations)
    localStorage.setItem('conversations', JSON.stringify(updatedConversations))
  }

  return (
    <div className="min-h-screen bg-white text-black p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Local Storage Content</h1>
          <div className="space-x-4">
            <Button onClick={downloadJSON}>Download JSON</Button>
            <Link href="/">
              <Button variant="outline">Back to Chat</Button>
            </Link>
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-200px)] border rounded-md p-4">
          {conversations.map((conversation, index) => (
            <div key={index} className="mb-8 pb-4 border-b last:border-b-0">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold">Conversation {index + 1}</h2>
                <Button variant="destructive" size="sm" onClick={() => deleteConversation(index)}>Delete</Button>
              </div>
              <div className="mb-4 p-2 rounded-lg bg-black text-white">
                <strong>User Prompt:</strong> {conversation.prompt}
              </div>
              {Object.entries(conversation.responses).map(([ai, response]) => (
                <div key={ai} className="mb-4 p-2 rounded-lg bg-black text-white">
                  <strong>{ai} Response:</strong> {response}
                </div>
              ))}
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  )
}

