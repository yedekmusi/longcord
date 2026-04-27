import { Home, Plus, Compass, Download } from 'lucide-react';
import type { Server } from '@/types';
import Tooltip from './Tooltip';

interface ServerSidebarProps {
  servers: Server[];
  activeServerId: string;
  onSelect: (id: string) => void;
}

export default function ServerSidebar({ servers, activeServerId, onSelect }: ServerSidebarProps) {
  return (
    <div className="w-[72px] min-w-[72px] bg-[#1E1F22] flex flex-col items-center py-3 gap-2 overflow-y-auto scrollbar-discord select-none">
      {/* Home / DM Button */}
      <Tooltip text="Direct Messages">
        <button
          onClick={() => onSelect('longcord')}
          className={`relative w-12 h-12 flex items-center justify-center transition-all duration-200 group ${
            activeServerId === 'longcord'
              ? 'bg-[#5865F2] rounded-[16px]'
              : 'bg-[#313338] hover:bg-[#5865F2] rounded-[50%] hover:rounded-[16px]'
          }`}
        >
          {activeServerId === 'longcord' && (
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-2 h-10 bg-white rounded-r-[4px]" />
          )}
          <Home className={`w-5 h-5 transition-colors ${activeServerId === 'longcord' ? 'text-white' : 'text-[#DBDEE1] group-hover:text-white'}`} />
        </button>
      </Tooltip>

      <div className="w-8 h-[2px] bg-[#35373C] rounded-full my-1" />

      {/* Server List */}
      {servers.filter(s => s.id !== 'longcord').map(server => {
        const isActive = activeServerId === server.id;
        return (
          <Tooltip key={server.id} text={server.name}>
            <button
              onClick={() => onSelect(server.id)}
              className="relative w-12 h-12 group"
            >
              {isActive ? (
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-2 h-10 bg-white rounded-r-[4px] transition-all duration-200" />
              ) : (
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-r-[4px] opacity-0 group-hover:opacity-100 group-hover:h-5 transition-all duration-200" />
              )}

              {server.icon ? (
                <img
                  src={server.icon}
                  alt={server.name}
                  className={`w-12 h-12 object-cover transition-all duration-200 ${
                    isActive ? 'rounded-[16px]' : 'rounded-[50%] group-hover:rounded-[16px]'
                  }`}
                />
              ) : (
                <div
                  className={`w-12 h-12 flex items-center justify-center text-white font-bold text-sm transition-all duration-200 ${
                    isActive ? 'rounded-[16px]' : 'rounded-[50%] group-hover:rounded-[16px]'
                  }`}
                  style={{ backgroundColor: server.bgColor || '#5865F2' }}
                >
                  {server.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                </div>
              )}

              {(server.unread || server.mentionCount) && (
                <div className="absolute -bottom-1 -right-1 min-w-[16px] h-4 bg-[#F23F43] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 border-2 border-[#1E1F22]">
                  {server.mentionCount || ''}
                </div>
              )}
            </button>
          </Tooltip>
        );
      })}

      <div className="w-8 h-[2px] bg-[#35373C] rounded-full my-1" />

      {/* Add Server */}
      <Tooltip text="Add a Server">
        <button className="relative w-12 h-12 flex items-center justify-center bg-[#313338] hover:bg-[#23A55A] rounded-[50%] hover:rounded-[16px] transition-all duration-200 group">
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-r-[4px] opacity-0 group-hover:opacity-100 group-hover:h-5 transition-all duration-200" />
          <Plus className="w-5 h-5 text-[#23A55A] group-hover:text-white transition-colors" strokeWidth={3} />
        </button>
      </Tooltip>

      {/* Explore */}
      <Tooltip text="Explore Public Servers">
        <button className="relative w-12 h-12 flex items-center justify-center bg-[#313338] hover:bg-[#23A55A] rounded-[50%] hover:rounded-[16px] transition-all duration-200 group">
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-r-[4px] opacity-0 group-hover:opacity-100 group-hover:h-5 transition-all duration-200" />
          <Compass className="w-5 h-5 text-[#23A55A] group-hover:text-white transition-colors" />
        </button>
      </Tooltip>

      <div className="flex-1" />

      {/* Download */}
      <Tooltip text="Download Apps">
        <button className="relative w-12 h-12 flex items-center justify-center bg-[#313338] hover:bg-[#DBDEE1] rounded-[50%] hover:rounded-[16px] transition-all duration-200 group mb-2">
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-r-[4px] opacity-0 group-hover:opacity-100 group-hover:h-5 transition-all duration-200" />
          <Download className="w-5 h-5 text-[#DBDEE1] group-hover:text-[#1E1F22] transition-colors" />
        </button>
      </Tooltip>
    </div>
  );
}
