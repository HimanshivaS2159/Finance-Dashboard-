import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Shield, Crown, User } from 'lucide-react';
import useStore from '../store/useStore';

const RoleToggle = () => {
  const { role, setRole } = useStore();

  const roles = [
    { 
      id: 'Viewer', 
      label: 'Viewer', 
      icon: Eye, 
      color: 'primary',
      bgColor: 'bg-primary/20',
      borderColor: 'border-primary/50',
      shadow: 'shadow-neon-cyan',
      description: 'View only'
    },
    { 
      id: 'Admin', 
      label: 'Admin', 
      icon: Crown, 
      color: 'secondary',
      bgColor: 'bg-secondary/20',
      borderColor: 'border-secondary/50',
      shadow: 'shadow-neon-violet',
      description: 'Full access'
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1 bg-surface/80 p-1.5 rounded-xl border border-white/10 backdrop-blur-sm">
        {roles.map((r) => {
          const IconComponent = r.icon;
          const isActive = role === r.id;
          
          return (
            <motion.button
              key={r.id}
              onClick={() => setRole(r.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                isActive
                  ? `${r.bgColor} ${r.borderColor} ${r.shadow} border`
                  : 'text-text-muted hover:text-text'
              }`}
            >
              <IconComponent size={16} className={isActive ? `text-${r.color}` : ''} />
              <span className={isActive ? `text-${r.color}` : ''}>{r.label}</span>
              
              {/* Active indicator dot */}
              {isActive && (
                <motion.div
                  layoutId="roleIndicator"
                  className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-${r.color}`}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
      <p className="text-[10px] text-text-muted/70 text-center mt-1.5">
        {roles.find(r => r.id === role)?.description}
      </p>
    </div>
  );
};

export default RoleToggle;
