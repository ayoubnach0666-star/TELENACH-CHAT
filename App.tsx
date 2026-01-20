
import React, { useState, useEffect, useRef } from 'react';
import { Layout } from './components/Layout';
import { TopBar } from './components/TopBar';
import { BottomNav } from './components/BottomNav';
import { Onboarding } from './screens/Onboarding';
import { ChatList } from './screens/ChatList';
import { PrivateChat } from './screens/PrivateChat';
import { VoiceRoomList } from './screens/VoiceRoomList';
import { InsideVoiceRoom } from './screens/InsideVoiceRoom';
import { Profile } from './screens/Profile';
import { Settings } from './screens/Settings';
import { SplashScreen } from './screens/SplashScreen';
import { GroupInfo } from './screens/GroupInfo';
import { GroupSearch } from './screens/GroupSearch';
import { CreateModal } from './components/CreateModal';
import { ProfilePanel } from './components/ProfilePanel';
import { StoryViewer } from './components/StoryViewer';
import { User, Screen, Chat, VoiceRoom, GroupMember, GroupPrivacy } from './types';
import { CHATS, VOICE_ROOMS } from './mockData';

const App: React.FC = () => {
  const [isSplashing, setIsSplashing] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [activeRoom, setActiveRoom] = useState<VoiceRoom | null>(null);
  const [isPlusModalOpen, setIsPlusModalOpen] = useState(false);
  const [isProfilePanelOpen, setIsProfilePanelOpen] = useState(false);
  const [activeStoryUser, setActiveStoryUser] = useState<User | null>(null);
  const [allChats, setAllChats] = useState<Chat[]>(CHATS);
  const [toast, setToast] = useState<string | null>(null);

  const touchStartX = useRef<number | null>(null);

  // Check for stored user
  useEffect(() => {
    const stored = localStorage.getItem('telenach_user');
    if (stored) {
      setUser(JSON.parse(stored));
      setCurrentScreen('messages');
    }
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartX.current - touchEndX;

    if (deltaX > 70 && !isProfilePanelOpen && user && !['insideRoom', 'chat', 'groupInfo', 'groupSearch'].includes(currentScreen)) {
      setIsProfilePanelOpen(true);
    }
    if (deltaX < -70 && isProfilePanelOpen) {
      setIsProfilePanelOpen(false);
    }
    touchStartX.current = null;
  };

  const handleOnboardingComplete = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('telenach_user', JSON.stringify(newUser));
    setCurrentScreen('messages');
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
    setActiveChat(null);
    setActiveRoom(null);
    setIsProfilePanelOpen(false);
  };

  const handleChatClick = (chat: Chat) => {
    setActiveChat(chat);
    setCurrentScreen('chat');
  };

  const handleRoomClick = (room: VoiceRoom) => {
    setActiveRoom(room);
    setCurrentScreen('insideRoom');
  };

  const handleCreateGroup = (name: string, privacy: GroupPrivacy) => {
    if (!user) return;
    const newGroup: Chat = {
      id: `g_${Date.now()}`,
      isGroup: true,
      groupName: name,
      privacy: privacy,
      participants: [user],
      groupMembers: [
        { ...user, groupRole: 'admin', isMuted: false }
      ],
      lastMessage: {
        id: `m_${Date.now()}`,
        senderId: 'sys',
        text: 'Group created successfully',
        type: 'text',
        timestamp: 'Just now',
        status: 'read'
      },
      unreadCount: 0
    };
    setAllChats([newGroup, ...allChats]);
    setActiveChat(newGroup);
    setCurrentScreen('chat');
    setToast("Group created successfully");
  };

  const handleUpdateMember = (memberId: string, updates: Partial<GroupMember>) => {
    if (!activeChat) return;
    const updatedChats = allChats.map(c => {
      if (c.id === activeChat.id) {
        return {
          ...c,
          groupMembers: c.groupMembers?.map(m => m.id === memberId ? { ...m, ...updates } : m)
        };
      }
      return c;
    });
    setAllChats(updatedChats);
    setActiveChat(updatedChats.find(c => c.id === activeChat.id) || null);
  };

  const handleRemoveMember = (memberId: string) => {
    if (!activeChat) return;
    const updatedChats = allChats.map(c => {
      if (c.id === activeChat.id) {
        return {
          ...c,
          groupMembers: c.groupMembers?.filter(m => m.id !== memberId)
        };
      }
      return c;
    });
    setAllChats(updatedChats);
    setActiveChat(updatedChats.find(c => c.id === activeChat.id) || null);
  };

  const handleDeleteGroup = () => {
    if (!activeChat) return;
    setAllChats(prev => prev.filter(c => c.id !== activeChat.id));
    handleNavigate('messages');
  };

  const handleMessageUserFromRoom = (targetUser: User) => {
    // Find existing chat or create temporary one
    const existing = allChats.find(c => !c.isGroup && c.participants.some(p => p.id === targetUser.id));
    if (existing) {
      handleChatClick(existing);
    } else {
      const tempChat: Chat = {
        id: `temp_${Date.now()}`,
        isGroup: false,
        participants: [targetUser],
        lastMessage: { id: 'temp', senderId: targetUser.id, text: 'New conversation', type: 'text', timestamp: 'Now', status: 'read' },
        unreadCount: 0
      };
      setAllChats([tempChat, ...allChats]);
      handleChatClick(tempChat);
    }
  };

  const renderScreen = () => {
    if (!user) return <Onboarding onComplete={handleOnboardingComplete} />;

    switch (currentScreen) {
      case 'messages':
        return (
          <ChatList 
            chats={allChats} 
            activeVoiceRooms={VOICE_ROOMS} 
            onChatClick={handleChatClick}
            onVoiceRoomPillClick={() => setCurrentScreen('voiceRooms')}
            onStoryClick={setActiveStoryUser}
            onCreateGroupShortcut={() => setIsPlusModalOpen(true)}
          />
        );
      case 'chat':
        return activeChat && (
          <PrivateChat 
            chat={activeChat} 
            currentUser={user} 
            onBack={() => setCurrentScreen('messages')} 
            onInfoClick={() => setCurrentScreen('groupInfo')}
          />
        );
      case 'groupInfo':
        return activeChat && (
          <GroupInfo 
            chat={activeChat} 
            currentUser={user} 
            onBack={() => setCurrentScreen('chat')}
            onUpdateMember={handleUpdateMember}
            onRemoveMember={handleRemoveMember}
            onDeleteGroup={handleDeleteGroup}
          />
        );
      case 'groupSearch':
        return <GroupSearch 
          onBack={() => setCurrentScreen('messages')} 
          onSelectGroup={handleChatClick}
        />;
      case 'voiceRooms':
        return (
          <VoiceRoomList 
            rooms={VOICE_ROOMS} 
            onRoomClick={handleRoomClick}
            onBack={() => setCurrentScreen('messages')}
          />
        );
      case 'insideRoom':
        return activeRoom && (
          <InsideVoiceRoom 
            room={activeRoom} 
            currentUser={user}
            onExit={() => setCurrentScreen('voiceRooms')}
            onMessageUser={handleMessageUserFromRoom}
          />
        );
      case 'profile':
        return <Profile user={user} />;
      case 'settings':
        return <Settings onBack={() => setCurrentScreen('messages')} />;
      default:
        return <ChatList chats={allChats} activeVoiceRooms={VOICE_ROOMS} onChatClick={handleChatClick} onVoiceRoomPillClick={() => setCurrentScreen('voiceRooms')} onStoryClick={setActiveStoryUser} onCreateGroupShortcut={() => setIsPlusModalOpen(true)} />;
    }
  };

  if (isSplashing) {
    return <SplashScreen onFinished={() => setIsSplashing(false)} />;
  }

  const showTopBar = user && !['onboarding', 'insideRoom', 'settings', 'groupInfo', 'groupSearch'].includes(currentScreen);
  const showBottomNav = user && !['onboarding', 'insideRoom', 'chat', 'settings', 'groupInfo', 'groupSearch'].includes(currentScreen);

  return (
    <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} className="w-full h-full relative">
      <Layout>
        {showTopBar && (
          <TopBar 
            user={user} 
            onProfileClick={() => setIsProfilePanelOpen(true)} 
            onBack={currentScreen !== 'messages' ? () => handleNavigate('messages') : undefined}
          />
        )}
        
        {renderScreen()}

        {showBottomNav && (
          <BottomNav 
            currentScreen={currentScreen} 
            onNavigate={handleNavigate} 
            onPlusClick={() => setIsPlusModalOpen(true)}
          />
        )}

        {/* Confirmation Toast */}
        {toast && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[150] animate-in slide-in-from-top-4 duration-500">
            <div className="bg-orange-600 text-white px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-orange-600/30">
              {toast}
            </div>
          </div>
        )}

        <CreateModal 
          isOpen={isPlusModalOpen} 
          onClose={() => setIsPlusModalOpen(false)}
          onCreateVoiceRoom={() => {
            setIsPlusModalOpen(false);
            setCurrentScreen('voiceRooms');
          }}
          onCreateGroup={handleCreateGroup}
          onSearchGroup={() => setCurrentScreen('groupSearch')}
        />

        {user && (
          <ProfilePanel 
            user={user} 
            isOpen={isProfilePanelOpen} 
            onClose={() => setIsProfilePanelOpen(false)} 
            onOpenStory={() => {
              if (user.stories && user.stories.length > 0) {
                setActiveStoryUser(user);
                setIsProfilePanelOpen(false);
              }
            }}
            onSettingsClick={() => {
              handleNavigate('settings');
              setIsProfilePanelOpen(false);
            }}
          />
        )}

        {activeStoryUser && (
          <StoryViewer user={activeStoryUser} onClose={() => setActiveStoryUser(null)} />
        )}
      </Layout>
    </div>
  );
};

export default App;
