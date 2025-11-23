'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { UserMenu } from './UserMenu';

interface HeaderProps {
  balance: number;
  username: string;
  isConnected: boolean;
  onConnect: () => void;
}

export function Header({
  balance,
  username,
  isConnected,
  onConnect,
}: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouter();

  return (
    <>
      <header className="relative z-20 px-6 py-4 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => router.push('/')}
            className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            MC-CASE BATTLE
          </button>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            {/* Balance */}
            <div className="flex items-center space-x-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-600">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-emerald-400 font-semibold">{balance.toLocaleString()}</span>
              <span className="text-slate-400 text-sm">эмеральдов</span>
            </div>

            {/* User Menu */}
            {isConnected ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 bg-emerald-500/20 px-4 py-2 rounded-full border border-emerald-500/30 hover:border-emerald-400/50 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-500 rounded text-sm font-bold flex items-center justify-center">
                    {username.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-emerald-400 text-sm font-semibold">{username}</span>
                  <ChevronDown
                    size={18}
                    className={`text-emerald-400 transition-transform ${
                      showUserMenu ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Menu */}
                {showUserMenu && (
                  <UserMenu
                    onMenuItemClick={() => setShowUserMenu(false)}
                  />
                )}
              </div>
            ) : (
              <button
                onClick={onConnect}
                className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full font-semibold hover:from-emerald-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105"
              >
                Привязать ник
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Backdrop для закрытия меню */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </>
  );
}