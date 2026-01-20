
export interface Story {
  id: string;
  imageUrl: string;
  text?: string;
  viewed: boolean;
  timestamp: string;
}

export type ParticipantRole = 'listener' | 'speaker' | 'admin';
export type GroupRole = 'admin' | 'moderator' | 'member';
export type GroupPrivacy = 'public' | 'private';

export interface User {
  id: string;
  displayName: string;
  username: string;
  birthYear: string;
  avatar: string;
  bio?: string;
  password?: string; // Stored as a hash
  stories?: Story[];
}

export interface GroupMember extends User {
  groupRole: GroupRole;
  isMuted: boolean;
}

export type MessageType = 'text' | 'voice';

export interface Message {
  id: string;
  senderId: string;
  text?: string;
  voiceDuration?: string;
  type: MessageType;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

export interface Chat {
  id: string;
  isGroup: boolean;
  groupName?: string;
  privacy?: GroupPrivacy;
  participants: User[];
  groupMembers?: GroupMember[];
  lastMessage: Message;
  unreadCount: number;
}

export interface VoiceRoom {
  id: string;
  name: string;
  participants: User[];
  isLive: boolean;
  isPrivate?: boolean;
}

export type Screen = 'onboarding' | 'messages' | 'chat' | 'voiceRooms' | 'insideRoom' | 'profile' | 'settings' | 'groupInfo' | 'groupSearch';
