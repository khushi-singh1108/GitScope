import { Sparkles } from "lucide-react";

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
}

const QUESTIONS = [
  "How do I analyze a repository?",
  "What is Repository Analysis?",
  "How does Issue Analysis work?",
  "Can I analyze private repositories?",
  "What is the Explore page?",
  "How does Dashboard help me?",
];

export default function SuggestedQuestions({ onSelect }: SuggestedQuestionsProps) {
  return (
    <div className="space-y-2.5 pb-1">
      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--chat-text-muted)" }}>
        <Sparkles size={11} />
        Try asking
      </p>

      <div className="flex flex-col gap-1.5">
        {QUESTIONS.map((q) => (
          <button
            key={q}
            onClick={() => onSelect(q)}
            className="chat-suggest-btn w-full rounded-xl px-3.5 py-2.5 text-left text-xs font-medium"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}