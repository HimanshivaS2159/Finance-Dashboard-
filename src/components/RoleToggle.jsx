import React from 'react';
import useStore from '../store/useStore';

const RoleToggle = () => {
  const { role, setRole } = useStore();

  return (
    <div className="flex items-center space-x-2 bg-surface p-1 rounded-lg border border-white/5">
      <button
        onClick={() => setRole('Viewer')}
        className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-300 ${
          role === 'Viewer'
            ? 'bg-[#00F5FF]/10 text-[#00F5FF] shadow-neon-cyan border border-[#00F5FF]/50'
            : 'text-text-muted hover:text-[#00F5FF]'
        }`}
      >
        Viewer
      </button>
      <button
        onClick={() => setRole('Admin')}
        className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-300 ${
          role === 'Admin'
            ? 'bg-[#7C3AED]/20 text-[#c4b5fd] shadow-neon-violet border border-[#7C3AED]/50'
            : 'text-text-muted hover:text-[#7C3AED]'
        }`}
      >
        Admin
      </button>
    </div>
  );
};

export default RoleToggle;
