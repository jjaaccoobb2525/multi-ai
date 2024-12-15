import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Maximize2, Minimize2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ChatWindowProps {
  aiName: string
  messages: { content: string, role: 'user' | 'assistant' }[]
  isLoading: boolean
}

export default function ChatWindow({ aiName, messages, isLoading }: ChatWindowProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const ChatContent = () => (
    <>
      {messages.map((message, index) => (
        <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
          <div className="inline-block p-2 rounded-lg bg-black text-white">
            {message.content}
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex justify-center items-center">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      )}
    </>
  )

  return (
    <>
      <div className="h-full flex flex-col border-r last:border-r-0 w-1/3">
        <div className="sticky top-0 z-10 flex justify-between items-center p-4 border-b bg-white">
          <h2 className="text-lg font-semibold">{aiName}</h2>
          <Button variant="ghost" size="icon" onClick={() => setIsExpanded(true)}>
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            <ChatContent />
          </div>
        </ScrollArea>
      </div>

      <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
        <DialogContent className="max-w-[66vw] max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>{aiName}</span>
              <Button variant="ghost" size="icon" onClick={() => setIsExpanded(false)}>
                <Minimize2 className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              <ChatContent />
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  )
}

