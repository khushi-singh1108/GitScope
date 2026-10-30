import { Bot } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="flex gap-2.5">
      <div className="w-7 h-7 rounded-lg chat-bot-icon flex items-center justify-center flex-shrink-0 mt-0.5">
        <Bot size={13} />
      </div>
      <div className="chat-typing-bg rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
        {[0, 0.15, 0.3].map((delay, i) => (
          <span
            key={i}
            className="chat-typing-dot w-1.5 h-1.5 rounded-full animate-bounce"
            style={{ animationDelay: `${delay}s`, animationDuration: "0.9s" }}
          />
        ))}
      </div>
    </div>
  );
}