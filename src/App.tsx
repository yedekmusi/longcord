import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { nanoid } from 'nanoid';

import type { Server, Channel, Message, User } from '@/types';
import { servers, users, initialMessages, mockResponses } from '@/data/mock';

import LoginScreen from '@/sections/LoginScreen';
import ServerSidebar from '@/sections/ServerSidebar';
import ChannelSidebar from '@/sections/ChannelSidebar';
import ChatArea from '@/sections/ChatArea';
import MembersSidebar from '@/sections/MembersSidebar';
import SettingsModal from '@/sections/SettingsModal';

function findChannel(server: Server, channelId: string): Channel | undefined {
  for (const cat of server.categories) {
    const ch = cat.channels.find(c => c.id === channelId);
    if (ch) return ch;
  }
  return undefined;
}

function findDefaultChannel(server: Server): Channel {
  const firstText = server.categories.flatMap(c => c.channels).find(c => c.type === 'text');
  return firstText || server.categories[0].channels[0];
}

function makeUserMessage(content: string, user: User): Message {
  return {
    id: nanoid(),
    authorId: user.id,
    authorName: user.name,
    authorAvatar: user.avatar,
    authorRole: user.role,
    content,
    timestamp: new Date(),
  };
}

function makeFakeMessage(content: string, authorId: string): Message {
  const u = users[authorId];
  return {
    id: nanoid(),
    authorId,
    authorName: u?.name || 'Unknown',
    authorAvatar: u?.avatar || '',
    authorRole: u?.role || 'normal',
    content,
    timestamp: new Date(),
  };
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeServerId, setActiveServerId] = useState('longcord');
  const [activeChannelId, setActiveChannelId] = useState('general');
  const [messagesMap, setMessagesMap] = useState<Record<string, Message[]>>(initialMessages);
  const [typingMap, setTypingMap] = useState<Record<string, string[]>>({});
  const [membersOpen, setMembersOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [muted, setMuted] = useState(false);
  const [deafened, setDeafened] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const responseTimers = useRef<number[]>([]);

  const activeServer = servers.find(s => s.id === activeServerId) || servers[0];
  const activeChannel = findChannel(activeServer, activeChannelId) || findDefaultChannel(activeServer);
  const currentUser: User = users.demouser;

  const messages = messagesMap[activeChannelId] || [];
  const typingUsers = typingMap[activeChannelId] || [];

  const handleLogin = useCallback(() => {
    setLoggedIn(true);
  }, []);

  const handleSelectServer = useCallback((id: string) => {
    setActiveServerId(id);
    const server = servers.find(s => s.id === id);
    if (server) {
      const defaultCh = findDefaultChannel(server);
      setActiveChannelId(defaultCh.id);
    }
  }, []);

  const handleSelectChannel = useCallback((id: string) => {
    setActiveChannelId(id);
  }, []);

  const sendMessage = useCallback((content: string) => {
    const msg = makeUserMessage(content, currentUser);
    setMessagesMap(prev => ({
      ...prev,
      [activeChannelId]: [...(prev[activeChannelId] || []), msg],
    }));

    // Trigger fake response
    const fakeUserIds = Object.keys(users).filter(id => id !== 'demouser');
    const randomUserId = fakeUserIds[Math.floor(Math.random() * fakeUserIds.length)];
    const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];

    // Show typing
    setTypingMap(prev => ({
      ...prev,
      [activeChannelId]: [users[randomUserId]?.name || 'Someone'],
    }));

    const timer = window.setTimeout(() => {
      setTypingMap(prev => ({ ...prev, [activeChannelId]: [] }));
      const resp = makeFakeMessage(randomResponse, randomUserId);
      setMessagesMap(prev => ({
        ...prev,
        [activeChannelId]: [...(prev[activeChannelId] || []), resp],
      }));
    }, 2000 + Math.random() * 1500);

    responseTimers.current.push(timer);
  }, [activeChannelId, currentUser]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      responseTimers.current.forEach(t => clearTimeout(t));
    };
  }, []);

  return (
    <div className="h-screen w-screen bg-[#313338] text-[#DBDEE1] overflow-hidden font-sans">
      <AnimatePresence>
        {!loggedIn && (
          <motion.div
            key="login"
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute inset-0 z-50"
          >
            <LoginScreen onLogin={handleLogin} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {loggedIn && (
          <motion.div
            key="app"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-full w-full flex"
          >
            <ServerSidebar
              servers={servers}
              activeServerId={activeServerId}
              onSelect={handleSelectServer}
            />

            <ChannelSidebar
              server={activeServer}
              activeChannelId={activeChannelId}
              onSelectChannel={handleSelectChannel}
              user={currentUser}
              muted={muted}
              deafened={deafened}
              onToggleMute={() => setMuted(m => !m)}
              onToggleDeafen={() => setDeafened(d => !d)}
              onOpenSettings={() => setSettingsOpen(true)}
            />

            <ChatArea
              channel={activeChannel}
              messages={messages}
              typingUsers={typingUsers}
              membersOpen={membersOpen}
              onToggleMembers={() => setMembersOpen(m => !m)}
              onSendMessage={sendMessage}
              containerRef={chatContainerRef}
            />

            {membersOpen && <MembersSidebar />}
          </motion.div>
        )}
      </AnimatePresence>

      {settingsOpen && (
        <SettingsModal
          user={currentUser}
          onClose={() => setSettingsOpen(false)}
        />
      )}
    </div>
  );
}
