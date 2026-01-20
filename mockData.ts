
import { User, Chat, VoiceRoom, Story, GroupMember } from './types';

const MOCK_STORIES: Story[] = [
  { id: 's1', imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800', text: 'Midnight thoughts.', viewed: false, timestamp: '2h ago' },
  { id: 's2', imageUrl: 'https://images.unsplash.com/photo-1518005020480-10f44bc397b2?q=80&w=800', text: 'Elegance in shadows.', viewed: true, timestamp: '5h ago' },
];

export const CURRENT_USER: User = {
  id: 'me',
  displayName: 'Alex Smith',
  username: '@alex',
  birthYear: '1995',
  avatar: 'https://picsum.photos/seed/me/200',
  stories: [MOCK_STORIES[0]]
};

export const USERS: User[] = [
  { 
    id: '1', 
    displayName: 'Ayoub', 
    username: '@ayoub', 
    birthYear: '1998', 
    avatar: 'https://picsum.photos/seed/ayoub/200',
    stories: [MOCK_STORIES[1]]
  },
  { id: '2', displayName: 'Elena', username: '@elena_v', birthYear: '2000', avatar: 'https://picsum.photos/seed/elena/200' },
  { id: '3', displayName: 'Marcus', username: '@marcus_k', birthYear: '1992', avatar: 'https://picsum.photos/seed/marcus/200', stories: [{ id: 's3', imageUrl: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=800', viewed: false, timestamp: '1h ago' }] },
  { id: '4', displayName: 'Sarah', username: '@sarah', birthYear: '1997', avatar: 'https://picsum.photos/seed/sarah/200' },
];

const GROUP_MEMBERS: GroupMember[] = [
  { ...CURRENT_USER, groupRole: 'admin', isMuted: false },
  { ...USERS[0], groupRole: 'moderator', isMuted: false },
  { ...USERS[1], groupRole: 'member', isMuted: false },
  { ...USERS[2], groupRole: 'member', isMuted: true },
];

export const CHATS: Chat[] = [
  {
    id: 'g1',
    isGroup: true,
    groupName: 'Design Ethos Crew',
    participants: USERS.slice(0, 3),
    groupMembers: GROUP_MEMBERS,
    lastMessage: { id: 'gm1', senderId: '1', text: 'Marcus is muted for spamming lol', type: 'text', timestamp: '10:05', status: 'read' },
    unreadCount: 0
  },
  {
    id: 'c1',
    isGroup: false,
    participants: [USERS[0]],
    lastMessage: { id: 'm1', senderId: '1', text: 'Hey, are you joining the session tonight?', type: 'text', timestamp: '14:20', status: 'read' },
    unreadCount: 2
  },
  {
    id: 'c2',
    isGroup: false,
    participants: [USERS[1]],
    lastMessage: { id: 'm2', senderId: 'me', text: 'Sounds good to me!', type: 'text', timestamp: 'Yesterday', status: 'read' },
    unreadCount: 0
  },
];

export const VOICE_ROOMS: VoiceRoom[] = [
  { id: 'v1', name: 'Design Ethos', participants: [USERS[0], USERS[1], USERS[2]], isLive: true },
  { id: 'v2', name: 'Tech Talk 2025', participants: [USERS[3]], isLive: true },
  { id: 'v3', name: 'Ambient Chillout', participants: [USERS[0], USERS[3]], isLive: false },
];
