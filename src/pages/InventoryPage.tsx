import { useState, useEffect } from 'react';
import { Header } from '../../components/ui/Header';
import { Trash2 } from 'lucide-react';

interface InventoryItem {
  id: number;
  name: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  value: number;
}

const rarityColors = {
  common: {
    bg: 'bg-gray-500/20',
    text: 'text-gray-400',
    border: 'border-gray-500/30',
    badge: 'bg-gray-500/20 text-gray-400',
  },
  rare: {
    bg: 'bg-blue-500/20',
    text: 'text-blue-400',
    border: 'border-blue-500/30',
    badge: 'bg-blue-500/20 text-blue-400',
  },
  epic: {
    bg: 'bg-purple-500/20',
    text: 'text-purple-400',
    border: 'border-purple-500/30',
    badge: 'bg-purple-500/20 text-purple-400',
  },
  legendary: {
    bg: 'bg-yellow-500/20',
    text: 'text-yellow-400',
    border: 'border-yellow-500/30',
    badge: 'bg-yellow-500/20 text-yellow-400',
  },
  mythic: {
    bg: 'bg-pink-500/20',
    text: 'text-pink-400',
    border: 'border-pink-500/30',
    badge: 'bg-pink-500/20 text-pink-400',
  },
};

export default function InventoryPage() {
  const [balance, setBalance] = useState(1250);
  const [isConnected, setIsConnected] = useState(true);
  const [username] = useState('Steve_2024');
  const [isVisible, setIsVisible] = useState(false);

  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([
    {
      id: 1,
      name: 'Enchanted Diamond Sword',
      icon: '⚔️',
      rarity: 'legendary',
      value: 500,
    },
    {
      id: 2,
      name: 'Enchanted Book (Mending)',
      icon: '📚',
      rarity: 'epic',
      value: 200,
    },
    {
      id: 3,
      name: 'Enchanted Pickaxe',
      icon: '⛏️',
      rarity: 'rare',
      value: 150,
    },
    {
      id: 4,
      name: 'Experience Bottle',
      icon: '🧪',
      rarity: 'common',
      value: 50,
    },
    {
      id: 5,
      name: 'Enchanted Armor',
      icon: '🛡️',
      rarity: 'epic',
      value: 250,
    },
    {
      id: 6,
      name: 'Ancient Tome',
      icon: '📖',
      rarity: 'mythic',
      value: 800,
    },
  ]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleDeleteItem = (id: number) => {
    setInventoryItems(inventoryItems.filter((item) => item.id !== id));
  };

  const totalValue = inventoryItems.reduce((sum, item) => sum + item.value, 0);
  const legendaryCount = inventoryItems.filter((item) =>
    ['legendary', 'mythic'].includes(item.rarity),
  ).length;
  const epicCount = inventoryItems.filter((item) => item.rarity === 'epic').length;

  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-slate-900">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(42, 240, 140, 0.08) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(42, 240, 140, 0.08) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
            pointerEvents: 'none',
          }}
        />
      </div>

      <div className="relative z-10">
        <Header
          balance={balance}
          username={username}
          isConnected={isConnected}
          onConnect={() => setIsConnected(true)}
        />

        <div className="px-6 py-16">
          <div className="max-w-7xl mx-auto">
            <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                  Мой инвентарь
                </span>
              </h1>
              <p className="text-slate-400 text-lg">
                {inventoryItems.length} предметов · {totalValue.toLocaleString()} MC общей стоимости
              </p>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  {inventoryItems.length}
                </div>
                <div className="text-slate-400">Всего предметов</div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  {legendaryCount}
                </div>
                <div className="text-slate-400">Легендарных</div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {epicCount}
                </div>
                <div className="text-slate-400">Эпических</div>
              </div>
            </div>

            {inventoryItems.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📭</div>
                <p className="text-slate-400 text-xl">Ваш инвентарь пуст</p>
                <p className="text-slate-500 text-sm mt-2">
                  Откройте кейсы, чтобы получить предметы
                </p>
              </div>
            ) : (
              <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {inventoryItems.map((item) => {
                  const colors = rarityColors[item.rarity];
                  return (
                    <div
                      key={item.id}
                      className={`group p-6 rounded-lg border backdrop-blur-sm transition-all hover:scale-105 hover:border-emerald-400/50 ${colors.bg} ${colors.border}`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-5xl">{item.icon}</div>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-400 transition-all duration-200 p-2 hover:bg-red-900/20 rounded"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      <h3 className="text-2xl text-white mb-2 line-clamp-2">{item.name}</h3>

                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${colors.badge}`}
                        >
                          {item.rarity}
                        </span>
                        <span className="text-emerald-400 font-bold">{item.value} MC</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

