export type Role = 'admin' | 'moderator' | 'normal' | 'user';

export type Presence = 'online' | 'idle' | 'dnd' | 'offline';

export interface User {
  id: string;
  name: string;
  avatar: string;
  role: Role;
  presence: Presence;
  activity?: string;
  discriminator?: string;
}

export interface Reaction {
  emoji: string;
  count: number;
}

export interface Message {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: Role;
  content: string;
  timestamp: Date;
  reactions?: Reaction[];
  isSystem?: boolean;
  systemText?: string;
}

export interface Channel {
  id: string;
  name: string;
  type: 'text' | 'voice';
  unread: boolean;
  mentionCount?: number;
}

export interface ChannelCategory {
  name: string;
  channels: Channel[];
}

export interface Server {
  id: string;
  name: string;
  icon?: string;
  bgColor?: string;
  unread: boolean;
  mentionCount?: number;
  categories: ChannelCategory[];
}

export interface TypingUser {
  name: string;
  id: string;
}
