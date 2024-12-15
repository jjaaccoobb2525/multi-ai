"use client";

import { useState, useEffect } from "react";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import ChatWindow from "@/components/ChatWindow";

const AI_SERVICES = ["GPT", "Gemini", "Claude"];

type Conversation = {
  prompt: string;
  responses: Record<string, string>;
};

export default function MultiAIChat() {
  const [sharedInput, setSharedInput] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const savedConversations = localStorage.getItem("conversations");
    if (savedConversations) {
      try {
        const parsed = JSON.parse(savedConversations);
        setConversations(Array.isArray(parsed) ? parsed : []);
      } catch (error) {
        console.error("Error parsing conversations:", error);
        setConversations([]);
      }
    }
  }, []);

  const chatStates = AI_SERVICES.reduce((acc, ai) => {
    acc[ai] = useChat({
      api: `/api/chat/${ai.toLowerCase()}`,
      onFinish: (message) => {
        setConversations((prev) => {
          const updatedConversations = [...prev];
          const lastConversation =
            updatedConversations[updatedConversations.length - 1];
          if (lastConversation) {
            lastConversation.responses[ai] = message.content;
            localStorage.setItem(
              "conversations",
              JSON.stringify(updatedConversations)
            );
          }
          return updatedConversations;
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

      setConversations((prev) => {
        const updatedConversations = [
          ...prev,
          { prompt: currentInput, responses: {} }
        ];
        localStorage.setItem(
          "conversations",
          JSON.stringify(updatedConversations)
        );
        return updatedConversations;
      });

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
      handleSubmit(e as any);
    }
  };

  console.log(chatStates);

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
            messages={conversations.flatMap((conv) => [
              { role: "user", content: conv.prompt },
              ...(conv.responses[ai]
                ? [{ role: "assistant", content: conv.responses[ai] }]
                : [])
            ])}
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
