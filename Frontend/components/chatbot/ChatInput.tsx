"use client";

import { SendHorizontal } from "lucide-react";
import { KeyboardEvent, useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");

  function handleSend() {
    if (!message.trim() || disabled) return;
    onSend(message.trim());
    setMessage("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="chat-input-area px-3 py-3 flex items-end gap-2 rounded-b-2xl flex-shrink-0">
      <textarea
        rows={1}
        value={message}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask about GitScope…"
        className="chat-textarea flex-1 resize-none rounded-xl px-3.5 py-2.5 text-sm font-medium"
        style={{ minHeight: 40, maxHeight: 120, overflowY: "auto" }}
      />

      <button
        onClick={handleSend}
        disabled={disabled || !message.trim()}
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
          boxShadow: message.trim() && !disabled ? "0 4px 14px rgba(37,99,235,0.4)" : "none",
        }}
        aria-label="Send message"
      >
        <SendHorizontal size={16} />
      </button>
    </div>
  );
}