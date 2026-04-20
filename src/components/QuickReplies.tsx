// src/components/QuickReplies.tsx
"use client";

const SUGGESTIONS = [
  "What are your pricing plans?",
  "Do you offer a free trial?",
  "What integrations do you support?",
  "How do I contact support?",
];

interface Props {
  onSelect: (text: string) => void;
}

export default function QuickReplies({ onSelect }: Props) {
  return (
    <div className="px-4 pb-2">
      <p className="text-gray-500 text-xs mb-2">Suggested questions</p>
      <div className="flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => onSelect(s)}
            className="text-xs bg-surface-2 border border-white/10 text-gray-300 hover:text-white hover:border-brand-500/50 hover:bg-surface-3 rounded-full px-3 py-1.5 transition-all"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
