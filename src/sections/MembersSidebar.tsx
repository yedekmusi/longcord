import { Crown } from 'lucide-react';
import type { User } from '@/types';
import { allMembers } from '@/data/mock';

function getPresenceColor(presence: string): string {
  switch (presence) {
    case 'online': return 'bg-[#23A55A]';
    case 'idle': return 'bg-[#F0B232]';
    case 'dnd': return 'bg-[#F23F43]';
    default: return 'bg-[#80848E]';
  }
}

function getRoleColor(role: string): string {
  if (role === 'admin') return '#5865F2';
  if (role === 'moderator') return '#1ABCFE';
  return '#DBDEE1';
}

export default function MembersSidebar() {
  const online = allMembers.filter(m => m.presence !== 'offline');
  const offline = allMembers.filter(m => m.presence === 'offline');

  const renderMember = (member: User) => (
    <div
      key={member.id}
      className="flex items-center gap-3 px-2 h-[42px] rounded hover:bg-[#35373C] cursor-pointer transition-colors"
    >
      <div className="relative shrink-0">
        <img
          src={member.avatar}
          alt={member.name}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className={`absolute -bottom-[2px] -right-[2px] w-[10px] h-[10px] rounded-full border-[2px] border-[#2B2D31] ${getPresenceColor(member.presence)}`} />
      </div>
      <div className="flex flex-col min-w-0 leading-tight">
        <div className="flex items-center gap-1">
          <span
            className="text-[15px] font-medium truncate"
            style={{ color: getRoleColor(member.role) }}
          >
            {member.name}
          </span>
          {member.role === 'admin' && (
            <Crown className="w-3 h-3 text-[#F0B232] shrink-0" />
          )}
        </div>
        {member.activity && (
          <span className="text-xs text-[#949BA4] truncate">{member.activity}</span>
        )}
        {!member.activity && member.presence === 'offline' && (
          <span className="text-xs text-[#949BA4]">Offline</span>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-[240px] min-w-[240px] bg-[#2B2D31] flex flex-col overflow-y-auto scrollbar-discord select-none">
      {online.length > 0 && (
        <div className="mt-5 mb-1">
          <div className="px-4 pb-2">
            <span className="text-xs font-semibold text-[#949BA4] uppercase tracking-wide">
              ONLINE — {online.length}
            </span>
          </div>
          <div className="flex flex-col gap-[2px] px-2">
            {online.map(renderMember)}
          </div>
        </div>
      )}

      {offline.length > 0 && (
        <div className="mt-2 mb-4">
          <div className="px-4 pb-2">
            <span className="text-xs font-semibold text-[#949BA4] uppercase tracking-wide">
              OFFLINE — {offline.length}
            </span>
          </div>
          <div className="flex flex-col gap-[2px] px-2">
            {offline.map(renderMember)}
          </div>
        </div>
      )}
    </div>
  );
}
