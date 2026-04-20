// src/components/ChatWidget.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  X,
  Minimize2,
  RotateCcw,
  UserPlus,
  Send,
  Bot,
} from "lucide-react";
import clsx from "clsx";
import ChatMessage from "./ChatMessage";
import LeadForm from "./LeadForm";
import QuickReplies from "./QuickReplies";
import { useChatbot } from "@/lib/useChatbot";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [showLead, setShowLead] = useState(false);
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { messages, isLoading, sendMessage, clearChat } = useChatbot();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const handleSend = () => {
    if (!input.trim()) return;
    setShowSuggestions(false);
    sendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickReply = (text: string) => {
    setShowSuggestions(false);
    sendMessage(text);
  };

  // ── This one variable controls the typing dots ──
  const lastMessage = messages[messages.length - 1];
  const showTypingDots =
    isLoading &&
    lastMessage?.role === "assistant" &&
    lastMessage?.content === "";

  return (
    <>
      {/* Floating Launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={clsx(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl",
          "flex items-center justify-center transition-all duration-300",
          "bg-brand-500 hover:bg-brand-600 hover:scale-110",
          "shadow-brand-500/40",
          open && "rotate-90"
        )}
        aria-label="Toggle chat"
      >
        {open ? (
          <X size={22} className="text-white" />
        ) : (
          <MessageSquare size={22} className="text-white" />
        )}
      </button>

      {/* Unread dot */}
      {!open && (
        <span className="fixed bottom-[72px] right-6 z-50 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0d0f1a] animate-pulse-slow" />
      )}

      {/* Chat Window */}
      <div
        className={clsx(
          "fixed bottom-24 right-6 z-50 w-[370px] max-h-[600px]",
          "flex flex-col rounded-2xl overflow-hidden",
          "bg-surface-1 border border-white/10",
          "shadow-2xl shadow-black/60",
          "transition-all duration-300 origin-bottom-right",
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-90 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-surface-2 border-b border-white/5">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/30">
              <Bot size={18} className="text-white" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-surface-2" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-semibold leading-tight">AI Support</p>
            <p className="text-green-400 text-xs">Online · Typically replies instantly</p>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setShowLead((v) => !v)}
              title="Talk to a human"
              className="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <UserPlus size={15} />
            </button>
            <button
              onClick={clearChat}
              title="Clear chat"
              className="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <RotateCcw size={14} />
            </button>
            <button
              onClick={() => setOpen(false)}
              className="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <Minimize2 size={14} />
            </button>
          </div>
        </div>

        {/* Lead Form */}
        {showLead && (
          <div className="bg-surface-1 border-b border-white/5">
            <LeadForm onClose={() => setShowLead(false)} />
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
          {messages.map((msg, i) => {
            const isLastMsg = i === messages.length - 1;
            const isStreamingThis =
              isLoading && isLastMsg && msg.role === "assistant";

            // Hide empty placeholder while typing dots show
            if (isStreamingThis && msg.content === "") return null;

            return (
              <ChatMessage
                key={msg.id}
                message={msg}
                isStreaming={isStreamingThis && msg.content !== ""}
              />
            );
          })}

          {/* ONE typing dots block — controlled by showTypingDots */}
          {showTypingDots && (
            <div className="flex gap-3 items-end justify-start animate-fade-up">
              <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/30">
                <Bot size={16} className="text-white animate-pulse" />
              </div>
              <div className="bg-surface-2 border border-white/5 rounded-2xl rounded-bl-sm px-4 py-3">
                <div className="flex gap-1.5 items-center h-4">
                  {[0, 1, 2].map((j) => (
                    <span
                      key={j}
                      className="w-2 h-2 rounded-full bg-brand-500 animate-bounce"
                      style={{ animationDelay: `${j * 180}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Quick Replies */}
        {showSuggestions && messages.length <= 1 && (
          <QuickReplies onSelect={handleQuickReply} />
        )}

        {/* Input */}
        <div className="px-3 py-3 bg-surface-2 border-t border-white/5 flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message…"
            disabled={isLoading}
            className="flex-1 bg-surface-3 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-500/60 disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:opacity-40 flex items-center justify-center transition-colors shadow-lg shadow-brand-500/20"
          >
            <Send size={16} className="text-white" />
          </button>
        </div>

        {/* Footer */}
        <div className="text-center py-1.5 text-[10px] text-gray-600 bg-surface-1">
          Powered by AI · Built with Next.js + Groq
        </div>
      </div>
    </>
  );
}