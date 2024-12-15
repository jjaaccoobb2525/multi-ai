"use client";

import { useState, useEffect } from "react";
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
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sharedInput.trim() && !isLoading) {
      const currentInput = sharedInput;
      setSharedInput("");
      setIsLoading(true);

      const newConversation: Conversation = {
        prompt: currentInput,
        responses: {}
      };
      setConversations((prev) => [...prev, newConversation]);

      try {
        const responses = await Promise.all(
          AI_SERVICES.map((ai) =>
            fetch(`/api/chat/${ai.toLowerCase()}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                messages: [{ role: "user", content: currentInput }]
              })
            }).then((res) => res.json())
          )
        );

        setConversations((prev) => {
          const updated = [...prev];
          const lastConversation = updated[updated.length - 1];
          AI_SERVICES.forEach((ai, index) => {
            lastConversation.responses[ai] = responses[index].content;
          });
          localStorage.setItem("conversations", JSON.stringify(updated));
          return updated;
        });
      } catch (error) {
        console.error("Error fetching AI responses:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
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
            messages={conversations.flatMap((conv) => [
              { role: "user", content: conv.prompt },
              ...(conv.responses[ai]
                ? [{ role: "assistant", content: conv.responses[ai] }]
                : [])
            ])}
            isLoading={isLoading}
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
          <Button
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send to All"}
          </Button>
        </form>
      </div>
    </div>
  );
}
