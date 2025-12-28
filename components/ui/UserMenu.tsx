import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Package, LogOut } from 'lucide-react';

interface UserMenuProps {
  onMenuItemClick: () => void;
}

export function UserMenu({ onMenuItemClick }: UserMenuProps) {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    onMenuItemClick();
  };

  const handleLogout = () => {
    // TODO: Добавить логику выхода из аккаунта
    console.log('Выход из аккаунта');
    onMenuItemClick();
  };

  return (
    <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl overflow-hidden z-50 animate-[slideDown_0.2s_ease-out]">
      {/* Профиль */}
      <button
        onClick={() => handleNavigate('/profile')}
        className="w-full text-left px-4 py-3 hover:bg-slate-800 transition-colors border-b border-slate-700 flex items-center space-x-3 group"
      >
        <User size={18} className="text-emerald-400 group-hover:text-emerald-300" />
        <span className="text-white group-hover:text-emerald-300 transition-colors">Профиль</span>
      </button>

      {/* Инвентарь */}
      <button
        onClick={() => handleNavigate('/inventory')}
        className="w-full text-left px-4 py-3 hover:bg-slate-800 transition-colors border-b border-slate-700 flex items-center space-x-3 group"
      >
        <Package size={18} className="text-blue-400 group-hover:text-blue-300" />
        <span className="text-white group-hover:text-blue-300 transition-colors">Инвентарь</span>
      </button>

      {/* Выход */}
      <button
        onClick={handleLogout}
        className="w-full text-left px-4 py-3 hover:bg-red-900/30 transition-colors flex items-center space-x-3 group"
      >
        <LogOut size={18} className="text-red-400 group-hover:text-red-300" />
        <span className="text-red-400 group-hover:text-red-300 transition-colors">Выход</span>
      </button>
    </div>
  );
}