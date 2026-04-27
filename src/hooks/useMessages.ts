import { useState, useCallback, useRef } from 'react';
import type { Message } from '@/types';

export function useMessages(initial: Record<string, Message[]>) {
  const [messagesMap, setMessagesMap] = useState<Record<string, Message[]>>(initial);
  const [typingMap, setTypingMap] = useState<Record<string, string[]>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const getMessages = useCallback((channelId: string) => {
    return messagesMap[channelId] || [];
  }, [messagesMap]);

  const addMessage = useCallback((channelId: string, message: Message) => {
    setMessagesMap(prev => ({
      ...prev,
      [channelId]: [...(prev[channelId] || []), message],
    }));
    setTimeout(() => {
      containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' });
    }, 50);
  }, []);

  const setTyping = useCallback((channelId: string, names: string[]) => {
    setTypingMap(prev => ({ ...prev, [channelId]: names }));
  }, []);

  const getTyping = useCallback((channelId: string) => {
    return typingMap[channelId] || [];
  }, [typingMap]);

  return { messagesMap, getMessages, addMessage, typingMap, getTyping, setTyping, containerRef };
}
