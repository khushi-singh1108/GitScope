import { Bot, X, Sparkles } from "lucide-react";

interface ChatHeaderProps {
  onClose: () => void;
}

export default function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <div className="chat-header flex items-center justify-between px-4 py-3.5 rounded-t-2xl flex-shrink-0">
      <div className="flex items-center gap-3">
        {/* avatar */}
        <div className="w-9 h-9 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center flex-shrink-0">
          <Bot size={18} className="text-white" />
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <h2 className="text-sm font-semibold text-white leading-none">GitScope Assistant</h2>
            <Sparkles size={11} className="text-blue-200 opacity-80" />
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px_#4ade80]" />
            <p className="text-[11px] text-blue-100/80">Online · Ask me anything</p>
          </div>
        </div>
      </div>

      <button
        onClick={onClose}
        className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all duration-150"
        aria-label="Close chat"
      >
        <X size={15} />
      </button>
    </div>
  );
}