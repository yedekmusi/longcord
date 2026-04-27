import { ChevronDown, Hash, Volume2, Settings, Mic, MicOff, Headphones, HeadphoneOff } from 'lucide-react';
import type { Server, User } from '@/types';
import Tooltip from './Tooltip';

interface ChannelSidebarProps {
  server: Server;
  activeChannelId: string;
  onSelectChannel: (id: string) => void;
  user: User;
  muted: boolean;
  deafened: boolean;
  onToggleMute: () => void;
  onToggleDeafen: () => void;
  onOpenSettings: () => void;
}

export default function ChannelSidebar({
  server,
  activeChannelId,
  onSelectChannel,
  user,
  muted,
  deafened,
  onToggleMute,
  onToggleDeafen,
  onOpenSettings,
}: ChannelSidebarProps) {
  return (
    <div className="w-[240px] min-w-[240px] bg-[#2B2D31] flex flex-col select-none">
      {/* Header */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-[#1E1F22] hover:bg-[#35373C] cursor-pointer transition-colors shrink-0">
        <span className="text-[#F2F3F5] font-semibold text-base truncate">{server.name}</span>
        <ChevronDown className="w-5 h-5 text-[#B5BAC1] shrink-0" />
      </div>

      {/* Channels */}
      <div className="flex-1 overflow-y-auto scrollbar-discord py-3 px-2">
        {server.categories.map(cat => (
          <div key={cat.name} className="mb-2">
            <div className="flex items-center gap-1 px-2 mb-1 cursor-pointer group">
              <ChevronDown className="w-3 h-3 text-[#949BA4] group-hover:text-[#DCDDDE]" />
              <span className="text-xs font-semibold text-[#949BA4] uppercase tracking-wide">{cat.name}</span>
            </div>
            <div className="flex flex-col gap-[2px]">
              {cat.channels.map(ch => {
                const isActive = activeChannelId === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => onSelectChannel(ch.id)}
                    className={`flex items-center gap-[6px] h-8 px-2 rounded text-left transition-colors ${
                      isActive
                        ? 'bg-[#3E3E44]'
                        : 'hover:bg-[#35373C]'
                    }`}
                  >
                    {ch.type === 'text' ? (
                      <Hash className={`w-5 h-5 shrink-0 ${isActive ? 'text-[#DCDDDE]' : ch.unread ? 'text-[#DBDEE1]' : 'text-[#80848E]'}`} />
                    ) : (
                      <Volume2 className={`w-5 h-5 shrink-0 ${isActive ? 'text-[#DCDDDE]' : 'text-[#80848E]'}`} />
                    )}
                    <span
                      className={`text-sm truncate ${
                        isActive
                          ? 'text-white font-medium'
                          : ch.unread
                          ? 'text-[#DBDEE1] font-medium'
                          : 'text-[#949BA4]'
                      }`}
                    >
                      {ch.name}
                    </span>
                    {ch.unread && !isActive && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-white shrink-0" />
                    )}
                    {ch.mentionCount && ch.mentionCount > 0 && (
                      <div className="ml-auto min-w-[16px] h-4 bg-[#F23F43] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shrink-0">
                        {ch.mentionCount > 99 ? '99+' : ch.mentionCount}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User Panel */}
      <div className="h-[52px] bg-[#232428] px-2 flex items-center gap-2 shrink-0">
        <div className="relative group cursor-pointer hover:bg-[#35373C] rounded px-1 py-1 flex items-center gap-3 transition-colors">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className={`absolute -bottom-[2px] -right-[2px] w-[10px] h-[10px] rounded-full border-[2px] border-[#232428] ${
              user.presence === 'online' ? 'bg-[#23A55A]' :
              user.presence === 'idle' ? 'bg-[#F0B232]' :
              user.presence === 'dnd' ? 'bg-[#F23F43]' :
              'bg-[#80848E]'
            }`} />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-white">{user.name}</span>
            <span className="text-xs text-[#949BA4]">#{user.discriminator || '0000'}</span>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-1">
          <Tooltip text={muted ? 'Unmute' : 'Mute'} position="top">
            <button
              onClick={onToggleMute}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#35373C] text-[#B5BAC1] hover:text-white transition-colors"
            >
              {muted ? (
                <MicOff className="w-5 h-5 text-[#F23F43]" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </button>
          </Tooltip>
          <Tooltip text={deafened ? 'Undeafen' : 'Deafen'} position="top">
            <button
              onClick={onToggleDeafen}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#35373C] text-[#B5BAC1] hover:text-white transition-colors"
            >
              {deafened ? (
                <HeadphoneOff className="w-5 h-5 text-[#F23F43]" />
              ) : (
                <Headphones className="w-5 h-5" />
              )}
            </button>
          </Tooltip>
          <Tooltip text="Settings" position="top">
            <button
              onClick={onOpenSettings}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#35373C] text-[#B5BAC1] hover:text-white transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
