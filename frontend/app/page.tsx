"use client";

import { useState, useEffect } from "react";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import ChatWindow from "@/components/ChatWindow";

const AI_SERVICES = ["GPT", "Gemini", "Claude"];

export default function MultiAIChat() {
  const [sharedInput, setSharedInput] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { prompt: string; responses: Record<string, string> }[]
  >([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("chatHistory");
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  const chatStates = AI_SERVICES.reduce((acc, ai) => {
    // eslint-disable-next-line
    acc[ai] = useChat({
      api: `/api/chat/${ai.toLowerCase()}`,
      onFinish: (message) => {
        setChatHistory((prev) => {
          const lastEntry = prev[prev.length - 1];
          return [
            ...prev.slice(0, -1),
            {
              ...lastEntry,
              responses: {
                ...lastEntry.responses,
                [ai]: message.content
              }
            }
          ];
        });
      }
    });
    return acc;
  }, {} as Record<string, ReturnType<typeof useChat>>);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sharedInput.trim()) {
      const currentInput = sharedInput;
      setSharedInput("");

      setChatHistory((prev) => [
        ...prev,
        { prompt: currentInput, responses: {} }
      ]);

      AI_SERVICES.forEach((ai) => {
        chatStates[ai].append({
          content: currentInput,
          role: "user"
        });
        chatStates[ai].reload();
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      // eslint-disable-next-line
      handleSubmit(e as any);
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col bg-white text-black">
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Multi AI Platform</h1>
          <Link
            href="/local-storage"
            className="text-blue-500 hover:underline"
          >
            View Local Storage
          </Link>
        </div>
      </div>
      <div className="flex-1 flex overflow-hidden">
        {AI_SERVICES.map((ai) => (
          <ChatWindow
            key={ai}
            aiName={ai}
            chatHistory={chatHistory}
            isLoading={chatStates[ai].isLoading}
          />
        ))}
      </div>
      <div className="sticky bottom-0 z-10 p-4 border-t bg-white">
        <form
          onSubmit={handleSubmit}
          className="flex space-x-2"
        >
          <Textarea
            value={sharedInput}
            onChange={(e) => setSharedInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            className="flex-1"
            style={{ width: "50vw" }}
          />
          <Button type="submit">Send to All</Button>
        </form>
      </div>
    </div>
  );
}
