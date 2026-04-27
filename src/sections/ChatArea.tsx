import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Hash, Bell, Pin, Users, Search, Gift, Smile, Send, PlusCircle,
  MessageSquare, Inbox, HelpCircle
} from 'lucide-react';
import type { Channel, Message } from '@/types';

interface ChatAreaProps {
  channel: Channel;
  messages: Message[];
  typingUsers: string[];
  membersOpen: boolean;
  onToggleMembers: () => void;
  onSendMessage: (content: string) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

function formatTimestamp(date: Date): string {
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const timeStr = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  if (isToday) return `Today at ${timeStr}`;
  return `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at ${timeStr}`;
}

function getRoleColor(role: string): string {
  if (role === 'admin') return '#5865F2';
  if (role === 'moderator') return '#1ABCFE';
  return '#DBDEE1';
}

export default function ChatArea({
  channel,
  messages,
  typingUsers,
  membersOpen,
  onToggleMembers,
  onSendMessage,
  containerRef,
}: ChatAreaProps) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    const el = containerRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'auto' });
    }
  }, [channel.id, containerRef]);

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }
  }, [messages.length, containerRef]);

  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) return;
    onSendMessage(trimmed);
    setInput('');
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }
  }, [input, onSendMessage]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 200) + 'px';
  };

  return (
    <div className="flex-1 bg-[#313338] flex flex-col min-w-0">
      {/* Header */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-[#232428] shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          {channel.type === 'text' ? (
            <Hash className="w-5 h-5 text-[#80848E] shrink-0" />
          ) : (
            <MessageSquare className="w-5 h-5 text-[#80848E] shrink-0" />
          )}
          <span className="text-base font-semibold text-[#F2F3F5] truncate">{channel.name}</span>
          {channel.type === 'text' && (
            <span className="text-sm text-[#949BA4] truncate ml-2 hidden sm:inline">General chit-chat and welcomes</span>
          )}
        </div>

        <div className="flex items-center gap-4 text-[#B5BAC1] shrink-0">
          <MessageSquare className="w-5 h-5 hover:text-[#DCDDDE] cursor-pointer transition-colors" />
          <Bell className="w-5 h-5 hover:text-[#DCDDDE] cursor-pointer transition-colors" />
          <Pin className="w-5 h-5 hover:text-[#DCDDDE] cursor-pointer transition-colors" />
          <button
            onClick={onToggleMembers}
            className={`hover:text-[#DCDDDE] cursor-pointer transition-colors ${membersOpen ? 'text-white' : ''}`}
          >
            <Users className="w-5 h-5" />
          </button>
          <div className="hidden md:flex items-center bg-[#1E1F22] rounded h-6 px-2 gap-1 text-xs text-[#949BA4] cursor-text">
            <Search className="w-3 h-3" />
            <span>Search</span>
          </div>
          <Inbox className="w-5 h-5 hover:text-[#DCDDDE] cursor-pointer transition-colors" />
          <HelpCircle className="w-5 h-5 hover:text-[#DCDDDE] cursor-pointer transition-colors" />
        </div>
      </div>

      {/* Messages */}
      <div ref={containerRef} className="flex-1 overflow-y-auto scrollbar-discord px-4 pt-4 flex flex-col">
        {/* Welcome */}
        <div className="flex flex-col items-start mb-6">
          <div className="w-16 h-16 rounded-full bg-[#3E3E44] flex items-center justify-center mb-4">
            {channel.type === 'text' ? (
              <Hash className="w-8 h-8 text-[#80848E]" />
            ) : (
              <MessageSquare className="w-8 h-8 text-[#80848E]" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-[#F2F3F5] mb-1">Welcome to #{channel.name}!</h2>
          <p className="text-base text-[#949BA4]">This is the start of the #{channel.name} channel.</p>
        </div>

        {/* Date divider */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 h-[1px] bg-[#3F4147]" />
          <span className="text-xs font-semibold text-[#949BA4] uppercase tracking-wide">27 April 2026</span>
          <div className="flex-1 h-[1px] bg-[#3F4147]" />
        </div>

        {/* Message List */}
        <div className="flex flex-col gap-1 pb-2">
          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => {
              if (msg.isSystem) {
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center py-1"
                  >
                    <div className="w-1 h-1 rounded-full bg-[#949BA4] mr-2" />
                    <span className="text-xs text-[#949BA4]">{msg.content}</span>
                  </motion.div>
                );
              }

              const prev = messages[idx - 1];
              const isCompact = prev && !prev.isSystem && prev.authorId === msg.authorId && (msg.timestamp.getTime() - prev.timestamp.getTime()) < 300000;

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-4 hover:bg-[#2E3035] rounded px-2 ${isCompact ? 'py-[2px]' : 'py-2'}`}
                >
                  {isCompact ? (
                    <div className="w-10 shrink-0 flex justify-end">
                      <span className="text-[10px] text-[#6D6F78] opacity-0 hover:opacity-100 mt-1">
                        {msg.timestamp.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                      </span>
                    </div>
                  ) : (
                    <img
                      src={msg.authorAvatar || '/images/avatar-demouser.png'}
                      alt={msg.authorName}
                      className="w-10 h-10 rounded-full object-cover shrink-0 mt-1"
                    />
                  )}

                  <div className="flex flex-col min-w-0 flex-1">
                    {!isCompact && (
                      <div className="flex items-baseline gap-2 mb-1">
                        <span
                          className="text-[15px] font-semibold cursor-pointer hover:underline"
                          style={{ color: getRoleColor(msg.authorRole) }}
                        >
                          {msg.authorName}
                        </span>
                        <span className="text-xs text-[#949BA4]">{formatTimestamp(msg.timestamp)}</span>
                      </div>
                    )}
                    <div className="text-[15px] text-[#DBDEE1] leading-relaxed whitespace-pre-wrap break-words">
                      {msg.content}
                    </div>
                    {msg.reactions && msg.reactions.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {msg.reactions.map((r, i) => (
                          <button
                            key={i}
                            className="flex items-center gap-1 bg-[#2B2D31] hover:bg-[#35373C] rounded-lg px-2 py-[2px] text-xs text-[#B5BAC1] transition-colors"
                          >
                            <span>{r.emoji}</span>
                            <span>{r.count}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Typing Indicator */}
        {typingUsers.length > 0 && (
          <div className="flex items-center gap-2 h-[22px] mb-2 px-2">
            <div className="flex items-center gap-[2px]">
              <div className="w-[6px] h-[6px] rounded-full bg-[#949BA4] animate-dot-bounce" />
              <div className="w-[6px] h-[6px] rounded-full bg-[#949BA4] animate-dot-bounce-delay-1" />
              <div className="w-[6px] h-[6px] rounded-full bg-[#949BA4] animate-dot-bounce-delay-2" />
            </div>
            <span className="text-xs text-[#949BA4]">
              {typingUsers.length === 1
                ? `${typingUsers[0]} is typing...`
                : `${typingUsers.slice(0, -1).join(', ')} and ${typingUsers[typingUsers.length - 1]} are typing...`}
            </span>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-4 pb-6 shrink-0">
        <div className="bg-[#383A40] rounded-lg flex items-end gap-3 px-4 py-[10px]">
          <button className="text-[#B5BAC1] hover:text-[#DCDDDE] shrink-0 pb-1">
            <PlusCircle className="w-6 h-6" />
          </button>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            placeholder={`Message #${channel.name}`}
            className="flex-1 bg-transparent text-[#DBDEE1] text-[15px] placeholder-[#6D6F78] outline-none resize-none max-h-[200px] min-h-[24px] leading-6 py-0"
            rows={1}
          />
          <button className="text-[#B5BAC1] hover:text-[#DCDDDE] shrink-0 pb-1">
            <Gift className="w-6 h-6" />
          </button>
          <button className="text-[#B5BAC1] hover:text-[#DCDDDE] shrink-0 pb-1">
            <Smile className="w-6 h-6" />
          </button>
          {input.trim() && (
            <button
              onClick={handleSend}
              className="text-[#5865F2] hover:text-[#4752C4] shrink-0 pb-1"
            >
              <Send className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
