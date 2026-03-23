"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Loader2, Calendar, Phone, RotateCcw } from "lucide-react";
import { EMERGENCY_PHONE_TEL } from "@/content/site";

const WHATSAPP_NUMBER = EMERGENCY_PHONE_TEL.replace("+", "");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const APPOINTMENT_URL = "/appointments";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content: "Hello! I am Dr. Parmar's AI assistant. How can I assist you today?",
};

const QUICK_SUGGESTIONS = [
  "What conditions do you treat?",
  "What are your clinic timings?",
  "I need to book an appointment",
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function shouldShowAppointmentCTA(content: string): boolean {
  const keywords = ["appointment", "book", "schedule", "visit", "consult", "consultation", "come in", "see the doctor", "clinic"];
  const lower = content.toLowerCase();
  return keywords.some((kw) => lower.includes(kw));
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSend = useCallback(
    async (text?: string) => {
      const messageText = (text ?? input).trim();
      if (!messageText || isLoading) return;

      const userMessage: Message = { role: "user", content: messageText };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);
      setShowSuggestions(false);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: [...messages, userMessage] }),
        });

        const data = await response.json();

        if (data.message) {
          setMessages((prev) => [...prev, data.message]);
        } else {
          throw new Error(data.error || "Failed to get response");
        }
      } catch (error) {
        console.error("Chat Error:", error);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "I'm sorry, I'm having trouble connecting right now. Please try again later." },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [input, isLoading, messages]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setMessages([INITIAL_MESSAGE]);
    setShowSuggestions(true);
    setInput("");
  };

  const lastAssistantMessage = [...messages].reverse().find((m) => m.role === "assistant");
  const showAppointmentCTA = lastAssistantMessage ? shouldShowAppointmentCTA(lastAssistantMessage.content) : false;

  return (
    <>
      {isOpen ? (
        <div className="flex flex-col bg-white shadow-2xl overflow-hidden border border-gray-100 transition-all duration-300 animate-in slide-in-from-bottom-5 w-[calc(100vw-2rem)] max-w-[400px] h-[min(550px,calc(100dvh-6rem))] rounded-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-secondary text-white shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-secondary">
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="absolute bottom-0 right-0 h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-green-400 border-2 border-white" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-sm leading-tight">AI Assistant</span>
                <span className="text-[11px] text-white/80 leading-tight">Dr. Nisarg Parmar</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 1 && (
                <button
                  onClick={handleReset}
                  className="text-white/70 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
                  aria-label="Reset chat"
                  title="New conversation"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
                aria-label="Close chat"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-gray-50 text-sm overscroll-contain">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] sm:text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-secondary text-white rounded-tr-sm"
                      : "bg-white text-gray-800 border border-gray-100 shadow-sm rounded-tl-sm"
                  }`}
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex w-full justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl px-4 py-3 bg-white border border-gray-100 shadow-sm rounded-tl-sm">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            {/* Quick suggestions after greeting */}
            {showSuggestions && messages.length === 1 && !isLoading && (
              <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                {QUICK_SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSend(suggestion)}
                    className="rounded-full border border-secondary/30 bg-white px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs text-secondary hover:bg-secondary/5 hover:border-secondary/50 transition-colors active:scale-95"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {/* Appointment CTA when conversation mentions booking */}
            {showAppointmentCTA && !isLoading && (
              <div className="flex justify-start">
                <a
                  href={APPOINTMENT_URL}
                  className="inline-flex items-center gap-2 rounded-xl bg-secondary/10 border border-secondary/20 px-3.5 py-2 text-xs font-medium text-secondary hover:bg-secondary/20 transition-colors active:scale-95"
                >
                  <Calendar className="h-3.5 w-3.5" />
                  Book an Appointment
                </a>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions Bar */}
          <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 bg-gray-50 border-t border-gray-100 shrink-0 overflow-x-auto scrollbar-hide">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 sm:gap-1.5 shrink-0 rounded-lg bg-[#25D366]/10 px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-medium text-[#25D366] hover:bg-[#25D366]/20 transition-colors active:scale-95"
            >
              <WhatsAppIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              WhatsApp
            </a>
            <a
              href={APPOINTMENT_URL}
              className="inline-flex items-center gap-1 sm:gap-1.5 shrink-0 rounded-lg bg-secondary/10 px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-medium text-secondary hover:bg-secondary/20 transition-colors active:scale-95"
            >
              <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              Appointment
            </a>
            <a
              href={`tel:${EMERGENCY_PHONE_TEL}`}
              className="inline-flex items-center gap-1 sm:gap-1.5 shrink-0 rounded-lg bg-red-500/10 px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-medium text-red-600 hover:bg-red-500/20 transition-colors active:scale-95"
            >
              <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              Call Now
            </a>
          </div>

          {/* Input Area */}
          <div className="p-2.5 sm:p-3 bg-white border-t border-gray-100 flex items-end gap-2 shrink-0">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="w-full max-h-24 sm:max-h-32 min-h-[40px] sm:min-h-[44px] resize-none overflow-y-auto rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 sm:py-2.5 text-sm focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary/50"
              rows={1}
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-white transition-colors hover:bg-secondary/90 disabled:bg-gray-200 disabled:text-gray-400 active:scale-95"
              aria-label="Send message"
            >
              {isLoading ? <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" /> : <Send className="h-4 w-4 sm:h-5 sm:w-5 ml-0.5" />}
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-secondary text-white shadow-[0_4px_20px_rgba(30,58,138,0.3)] transition-all hover:scale-110 hover:shadow-[0_4px_25px_rgba(30,58,138,0.5)] active:scale-95"
          aria-label="Open AI Assistant"
        >
          <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
          <span className="absolute left-full ml-3 sm:ml-4 whitespace-nowrap rounded-lg bg-black/80 px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none hidden sm:block">
            Ask Dr. Parmar AI
          </span>
        </button>
      )}
    </>
  );
}
