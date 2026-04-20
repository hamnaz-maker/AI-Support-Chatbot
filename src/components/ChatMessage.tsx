"use client";

import { Message } from "@/lib/types";
import { Bot, User } from "lucide-react";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface Props {
  message: Message;
  isStreaming?: boolean;
}

export default function ChatMessage({ message, isStreaming }: Props) {
  const isBot = message.role === "assistant";
  const [visible, setVisible] = useState(false);

  // Pop-in animation on mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={clsx(
        "flex gap-3 items-end transition-all duration-300",
        isBot ? "justify-start" : "justify-end",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      )}
    >
      {isBot && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/30">
          <Bot size={16} className="text-white" />
        </div>
      )}

      <div
        className={clsx(
          "max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed relative",
          isBot
            ? "bg-surface-2 text-gray-100 rounded-bl-sm border border-white/5"
            : "bg-brand-500 text-white rounded-br-sm shadow-lg shadow-brand-500/25"
        )}
      >
        {message.content}

        {/* Streaming cursor */}
        {isStreaming && isBot && message.content && (
          <span className="inline-block w-0.5 h-4 bg-brand-500 ml-0.5 align-middle animate-pulse" />
        )}
      </div>

      {!isBot && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-surface-3 border border-white/10 flex items-center justify-center">
          <User size={16} className="text-gray-300" />
        </div>
      )}
    </div>
  );
}