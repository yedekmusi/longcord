import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Shield, Bell, Monitor, Accessibility, LogOut } from 'lucide-react';
import type { User as UserType } from '@/types';

interface SettingsModalProps {
  user: UserType;
  onClose: () => void;
}

const tabs = [
  { id: 'account', label: 'My Account', icon: User },
  { id: 'privacy', label: 'Privacy & Safety', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Monitor },
  { id: 'accessibility', label: 'Accessibility', icon: Accessibility },
];

export default function SettingsModal({ user, onClose }: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState('account');

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className="relative z-10 w-[700px] max-w-[90vw] h-[80vh] bg-[#313338] rounded shadow-[0_8px_16px_rgba(0,0,0,0.24)] flex overflow-hidden"
        >
          {/* Left Sidebar */}
          <div className="w-[240px] min-w-[240px] bg-[#2B2D31] py-8 px-4 overflow-y-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors ${
                    isActive
                      ? 'bg-[#3E3E44] text-white font-medium'
                      : 'text-[#B5BAC1] hover:bg-[#35373C] hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
            <div className="mt-4 pt-4 border-t border-[#3F4147]">
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded text-sm text-[#F23F43] hover:bg-[#F23F43]/10 transition-colors">
                <LogOut className="w-4 h-4" />
                Log Out
              </button>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 overflow-y-auto scrollbar-discord p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#F2F3F5]">
                {tabs.find(t => t.id === activeTab)?.label}
              </h2>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#35373C] text-[#B5BAC1] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {activeTab === 'account' && (
              <div className="space-y-6">
                <div className="bg-[#111214] rounded-lg overflow-hidden">
                  <div className="h-[100px] bg-[#5865F2]" />
                  <div className="px-4 pb-4">
                    <div className="relative -mt-10 mb-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-20 h-20 rounded-full object-cover border-[6px] border-[#111214]"
                      />
                      <div className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-[3px] border-[#111214] ${
                        user.presence === 'online' ? 'bg-[#23A55A]' :
                        user.presence === 'idle' ? 'bg-[#F0B232]' :
                        user.presence === 'dnd' ? 'bg-[#F23F43]' :
                        'bg-[#80848E]'
                      }`} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white">{user.name}</h3>
                        <p className="text-sm text-[#949BA4]">{user.name}#{user.discriminator || '0000'}</p>
                      </div>
                      <button className="px-4 py-2 bg-[#5865F2] hover:bg-[#4752C4] text-white text-sm font-medium rounded transition-colors">
                        Edit User Profile
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-[#2B2D31] rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#B5BAC1] uppercase mb-1">Display Name</p>
                      <p className="text-white">{user.name}</p>
                    </div>
                    <button className="px-3 py-1.5 bg-[#3E3E44] hover:bg-[#4A4D55] text-white text-xs rounded transition-colors">Edit</button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#B5BAC1] uppercase mb-1">Email</p>
                      <p className="text-white">demo@longcord.app</p>
                    </div>
                    <button className="px-3 py-1.5 bg-[#3E3E44] hover:bg-[#4A4D55] text-white text-xs rounded transition-colors">Edit</button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#B5BAC1] uppercase mb-1">Phone Number</p>
                      <p className="text-white">+1 ** *** 1234</p>
                    </div>
                    <button className="px-3 py-1.5 bg-[#3E3E44] hover:bg-[#4A4D55] text-white text-xs rounded transition-colors">Edit</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-semibold text-[#F2F3F5] mb-3">Theme</h3>
                  <div className="flex gap-3">
                    <div className="flex-1 bg-[#2B2D31] rounded-lg p-4 border-2 border-[#5865F2] cursor-pointer">
                      <div className="w-full h-20 bg-[#313338] rounded mb-2" />
                      <p className="text-sm font-medium text-white text-center">Dark</p>
                    </div>
                    <div className="flex-1 bg-[#2B2D31] rounded-lg p-4 border-2 border-transparent hover:border-[#35373C] cursor-pointer opacity-50">
                      <div className="w-full h-20 bg-[#FFFFFF] rounded mb-2" />
                      <p className="text-sm font-medium text-[#949BA4] text-center">Light</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-[#949BA4]">LongCord demo is always dark mode.</p>
              </div>
            )}

            {activeTab !== 'account' && activeTab !== 'appearance' && (
              <div className="text-center py-12">
                <p className="text-[#949BA4] text-sm">This section is not available in the demo.</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
