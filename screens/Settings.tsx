
import React from 'react';

interface SettingsProps {
  onBack: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onBack }) => {
  const settingsGroups = [
    {
      title: 'App',
      items: [
        { icon: '🎨', label: 'Theme', value: 'Dark LED' },
        { icon: '🔔', label: 'Notifications', value: 'Silent' },
        { icon: '🌍', label: 'Language', value: 'English' },
      ]
    },
    {
      title: 'Privacy',
      items: [
        { icon: '🔒', label: 'Encrypted Chats', value: 'Active' },
        { icon: '👁️', label: 'Status Visibility', value: 'Friends' },
      ]
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto px-8 py-6">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 -ml-2 text-orange-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <h2 className="text-2xl font-bold">Settings</h2>
      </div>

      <div className="space-y-8">
        {settingsGroups.map((group, idx) => (
          <div key={idx}>
            <h3 className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-4 ml-2">{group.title}</h3>
            <div className="glass-card rounded-[32px] overflow-hidden">
              {group.items.map((item, i) => (
                <button 
                  key={i}
                  className={`w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors ${i !== group.items.length - 1 ? 'border-b border-white/5' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm font-medium text-white/80">{item.label}</span>
                  </div>
                  <span className="text-xs text-orange-500/60">{item.value}</span>
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="pt-8">
          <button className="w-full h-14 bg-red-600/10 text-red-500 rounded-2xl text-xs font-bold uppercase tracking-widest active:bg-red-600 active:text-white transition-all">
            Log Out
          </button>
          <p className="text-center text-[8px] text-white/20 mt-6 uppercase tracking-widest">Version 2.0.4 - Telenach Premium</p>
        </div>
      </div>
    </div>
  );
};
