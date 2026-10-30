"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import SuggestedQuestions from "./SuggestedQuestions";
import TypingIndicator from "./TypingIndicator";
import api from "@/lib/axios";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chatbot() {
  const [open, setOpen]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [unread, setUnread]   = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "👋 Hi! I'm GitScope Assistant.\n\nAsk me anything about Repository Analysis, Issue Analysis, Dashboard or Explore.",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  /* mark unread dot when a new bot message arrives and chat is closed */
  useEffect(() => {
    if (!open && messages.length > 1 && messages[messages.length - 1].role === "assistant") {
      setUnread(true);
    }
  }, [messages]);

  const handleOpen = () => { setOpen(true); setUnread(false); };

  async function sendMessage(question: string) {
    if (!question.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setLoading(true);

    try {
      const res = await api.post("/chatbot/chat", { question });
      setMessages((prev) => [...prev, { role: "assistant", content: res.data.answer }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    }

    setLoading(false);
  }

  return (
    <>
      {/* ── Chat window ── */}
      {open && (
        <div className="chat-window chat-window-enter fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[380px] rounded-2xl flex flex-col z-50 overflow-hidden"
          style={{ height: "min(600px, calc(100vh - 140px))" }}
        >
          <ChatHeader onClose={() => setOpen(false)} />

          {/* messages */}
          <div className="chat-messages flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.length === 1 && (
              <SuggestedQuestions onSelect={sendMessage} />
            )}

            {messages.map((msg, i) => (
              <ChatMessage key={i} message={msg} />
            ))}

            {loading && <TypingIndicator />}

            <div ref={messagesEndRef} />
          </div>

          <ChatInput disabled={loading} onSend={sendMessage} />
        </div>
      )}

      {/* ── Floating action button ── */}
      <button
        onClick={open ? () => setOpen(false) : handleOpen}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-6 right-4 sm:right-6 w-14 h-14 rounded-2xl text-white flex items-center justify-center z-50 transition-transform duration-200 hover:scale-105 active:scale-95"
        style={{
          background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
          boxShadow: "var(--chat-fab-shadow)",
          animation: !open ? "chat-fab-pulse 3s ease-in-out infinite" : "none",
        }}
      >
        {open
          ? <X size={22} />
          : <MessageCircle size={22} />}

        {/* unread dot */}
        {!open && unread && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white shadow-sm" />
        )}
      </button>
    </>
  );
}