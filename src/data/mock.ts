import type { Server, User, Message } from '@/types';

export const users: Record<string, User> = {
  demouser: {
    id: 'demouser',
    name: 'DemoUser',
    avatar: '/images/avatar-demouser.png',
    role: 'user',
    presence: 'online',
    discriminator: '1234',
  },
  alice: {
    id: 'alice',
    name: 'Alice',
    avatar: '/images/avatar-alice.png',
    role: 'moderator',
    presence: 'online',
    activity: 'Editing design.md',
  },
  bob: {
    id: 'bob',
    name: 'Bob',
    avatar: '/images/avatar-bob.png',
    role: 'normal',
    presence: 'online',
  },
  charlie: {
    id: 'charlie',
    name: 'Charlie',
    avatar: '/images/avatar-charlie.png',
    role: 'normal',
    presence: 'idle',
    activity: 'Listening to Spotify — Lo-Fi Beats',
  },
  diana: {
    id: 'diana',
    name: 'Diana',
    avatar: '/images/avatar-diana.png',
    role: 'admin',
    presence: 'online',
    activity: 'Playing LongCord Dev',
  },
  eve: {
    id: 'eve',
    name: 'Eve',
    avatar: '/images/avatar-eve.png',
    role: 'normal',
    presence: 'offline',
  },
  frank: {
    id: 'frank',
    name: 'Frank',
    avatar: '/images/avatar-frank.png',
    role: 'normal',
    presence: 'offline',
  },
};

export const servers: Server[] = [
  {
    id: 'longcord',
    name: 'LongCord Hub',
    icon: '/images/server-longcord.png',
    unread: false,
    categories: [
      {
        name: 'GENERAL',
        channels: [
          { id: 'general', name: 'general', type: 'text', unread: false },
          { id: 'rules', name: 'rules', type: 'text', unread: false },
          { id: 'announcements', name: 'announcements', type: 'text', unread: true },
          { id: 'introductions', name: 'introductions', type: 'text', unread: false },
        ],
      },
      {
        name: 'TOPICS',
        channels: [
          { id: 'gaming', name: 'gaming', type: 'text', unread: true },
          { id: 'music', name: 'music', type: 'text', unread: false },
          { id: 'coding', name: 'coding', type: 'text', unread: false },
          { id: 'random', name: 'random', type: 'text', unread: true },
        ],
      },
      {
        name: 'VOICE',
        channels: [
          { id: 'voice-general', name: 'General Voice', type: 'voice', unread: false },
          { id: 'voice-music', name: 'Music Room', type: 'voice', unread: false },
          { id: 'voice-coding', name: 'Coding Together', type: 'voice', unread: false },
        ],
      },
    ],
  },
  {
    id: 'gameden',
    name: 'Game Den',
    icon: '/images/server-gameden.png',
    bgColor: '#23A55A',
    unread: true,
    categories: [
      {
        name: 'LOBBY',
        channels: [
          { id: 'gd-general', name: 'general', type: 'text', unread: true },
          { id: 'gd-news', name: 'game-news', type: 'text', unread: false },
        ],
      },
      {
        name: 'GAMES',
        channels: [
          { id: 'gd-val', name: 'valorant', type: 'text', unread: false },
          { id: 'gd-mc', name: 'minecraft', type: 'text', unread: true },
        ],
      },
    ],
  },
  {
    id: 'music',
    name: 'Music Lounge',
    icon: '/images/server-music.png',
    bgColor: '#EB459E',
    unread: false,
    categories: [
      {
        name: 'GENERAL',
        channels: [
          { id: 'ml-general', name: 'general', type: 'text', unread: false },
          { id: 'ml-share', name: 'share-music', type: 'text', unread: false },
        ],
      },
    ],
  },
  {
    id: 'devtalk',
    name: 'Dev Talk',
    icon: '/images/server-devtalk.png',
    bgColor: '#0070E0',
    unread: true,
    mentionCount: 3,
    categories: [
      {
        name: 'GENERAL',
        channels: [
          { id: 'dt-general', name: 'general', type: 'text', unread: true, mentionCount: 2 },
          { id: 'dt-help', name: 'help', type: 'text', unread: false },
        ],
      },
      {
        name: 'TECH',
        channels: [
          { id: 'dt-react', name: 'react', type: 'text', unread: true, mentionCount: 1 },
          { id: 'dt-rust', name: 'rust', type: 'text', unread: false },
        ],
      },
    ],
  },
  {
    id: 'design',
    name: 'Design Hub',
    icon: '/images/server-design.png',
    bgColor: '#F0B232',
    unread: false,
    categories: [
      {
        name: 'GENERAL',
        channels: [
          { id: 'dh-general', name: 'general', type: 'text', unread: false },
          { id: 'dh-showcase', name: 'showcase', type: 'text', unread: false },
        ],
      },
    ],
  },
  {
    id: 'movie',
    name: 'Movie Night',
    icon: '/images/server-movie.png',
    bgColor: '#A66EF5',
    unread: true,
    categories: [
      {
        name: 'GENERAL',
        channels: [
          { id: 'mn-general', name: 'general', type: 'text', unread: true },
          { id: 'mn-recs', name: 'recommendations', type: 'text', unread: false },
        ],
      },
    ],
  },
];

function makeMsg(
  id: string,
  authorId: string,
  content: string,
  timestamp: Date,
  reactions?: Message['reactions'],
  isSystem?: boolean,
  systemText?: string
): Message {
  const u = users[authorId];
  return {
    id,
    authorId,
    authorName: isSystem ? 'System' : u?.name || 'Unknown',
    authorAvatar: u?.avatar || '',
    authorRole: u?.role || 'normal',
    content: isSystem ? systemText || '' : content,
    timestamp,
    reactions,
    isSystem,
    systemText,
  };
}

const now = new Date();
const todayAt = (h: number, m: number) => {
  const d = new Date(now);
  d.setHours(h, m, 0, 0);
  return d;
};

export const initialMessages: Record<string, Message[]> = {
  general: [
    makeMsg('sys1', 'demouser', '', todayAt(10, 58), undefined, true, 'DemoUser started a thread: Welcome everyone! 🎉'),
    makeMsg('m1', 'alice', 'Hey everyone! Welcome to the LongCord demo. This is a fully interactive Discord clone built in React. Feel free to click around, switch channels, and send messages!', todayAt(11, 0)),
    makeMsg('m2', 'bob', 'Wow, this looks amazing! The animations are so smooth. How did you build the typing indicator?', todayAt(11, 2)),
    makeMsg('m3', 'charlie', 'I see the unread badges on servers too. Nice touch! 🔥', todayAt(11, 3), [{ emoji: '🔥', count: 2 }, { emoji: '👍', count: 1 }]),
    makeMsg('m4', 'alice', "It's all Framer Motion + CSS. The typing dots use a staggered scale animation. Check the code if you're curious!", todayAt(11, 5)),
    makeMsg('m5', 'diana', "Don't forget to try the settings gear in the user panel — it opens a full settings modal. And yes, the login screen has a gradient animation.", todayAt(11, 8)),
    makeMsg('sys2', 'demouser', '', todayAt(11, 9), undefined, true, 'DemoUser pinned a message to this channel.'),
    makeMsg('m6', 'bob', 'Can we send images?', todayAt(11, 10)),
    makeMsg('m7', 'alice', 'Not in this demo, but the message input supports Enter to send and Shift+Enter for newlines. Try typing something!', todayAt(11, 12)),
    makeMsg('m8', 'demouser', "This is so cool! I'm typing this right now... 🚀", todayAt(11, 15)),
  ],
  gaming: [
    makeMsg('g1', 'bob', 'Anyone up for a Valorant match tonight?', todayAt(10, 30)),
    makeMsg('g2', 'charlie', 'I\'m down! What time?', todayAt(10, 32)),
    makeMsg('g3', 'diana', '9 PM works for me.', todayAt(10, 35)),
  ],
  music: [
    makeMsg('mu1', 'alice', 'New Porter Robinson just dropped 👀', todayAt(9, 0)),
    makeMsg('mu2', 'charlie', 'On repeat already', todayAt(9, 5)),
  ],
  coding: [
    makeMsg('c1', 'diana', 'Tailwind v4 is looking spicy', todayAt(8, 45)),
    makeMsg('c2', 'bob', 'Still on v3 here, worth upgrading?', todayAt(8, 50)),
    makeMsg('c3', 'diana', 'Absolutely. The performance gains are real.', todayAt(8, 52)),
  ],
  random: [
    makeMsg('r1', 'charlie', 'Why do programmers prefer dark mode? Because light attracts bugs.', todayAt(7, 0)),
    makeMsg('r2', 'bob', '😂 old but gold', todayAt(7, 5)),
    makeMsg('r3', 'alice', 'I\'m stealing that for my next talk.', todayAt(7, 6)),
  ],
};

export const mockResponses = [
  "That's really cool! 🎉",
  'Totally agree with this.',
  'Has anyone tried the voice channels yet?',
  'The UI is super polished.',
  'LongCord > Discord 😄',
  'How do I change my avatar?',
  'This channel is so active!',
  'I love the blurple theme.',
  'Nice work on this clone!',
  'The animations are butter smooth.',
];

export const allMembers: User[] = [
  users.diana,
  users.alice,
  users.bob,
  users.charlie,
  users.eve,
  users.frank,
];
