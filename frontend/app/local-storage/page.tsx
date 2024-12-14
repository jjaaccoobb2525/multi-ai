'use client'

import { useState, useEffect } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

export default function LocalStoragePage() {
  const [chatHistory, setChatHistory] = useState<{ prompt: string, responses: Record<string, string> }[]>([])

  useEffect(() => {
    const savedHistory = localStorage.getItem('chatHistory')
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory))
    }
  }, [])

  const downloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(chatHistory, null, 2))
    const downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", "chat_history.json")
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
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
          {chatHistory.map((entry, index) => (
            <div key={index} className="mb-8 pb-4 border-b last:border-b-0">
              <div className="font-bold text-lg mb-2">User Prompt:</div>
              <div className="ml-4 mb-4 p-2 bg-black text-white rounded-lg">{entry.prompt}</div>
              <div className="font-bold text-lg mb-2">AI Responses:</div>
              {Object.entries(entry.responses).map(([ai, response]) => (
                <div key={ai} className="ml-4 mb-2">
                  <span className="font-semibold">{ai}: </span>
                  <div className="p-2 bg-black text-white rounded-lg mt-1">
                    <ReactMarkdown>{response}</ReactMarkdown>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  )
}

