import { Bot, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* avatar icon */}
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
        isUser
          ? "bg-gradient-to-br from-blue-500 to-blue-700 text-white"
          : "chat-bot-icon"
      }`}>
        {isUser ? <User size={13} /> : <Bot size={13} />}
      </div>

      {/* bubble */}
      <div className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
        isUser
          ? "chat-user-bubble rounded-tr-sm"
          : "chat-bot-bubble rounded-tl-sm"
      }`}>
        {message.content}
      </div>
    </div>
  );
}