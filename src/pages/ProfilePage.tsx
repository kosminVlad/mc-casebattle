import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/ui/Header';
import { Button } from '../../components/ui/Button';

type Rarity = 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';

interface DropItem {
  id: string;
  name: string;
  description: string;
  rarity: Rarity;
  probability: number;
  sellPrice: number;
  icon: string;
  claimedDate?: string;
}

const rarityConfig = {
  common: { color: 'from-gray-400 to-slate-500', text: 'text-gray-400', bg: 'bg-gray-400/20', border: 'border-gray-400/30', hex: '#9ca3af' },
  rare: { color: 'from-blue-400 to-cyan-500', text: 'text-blue-400', bg: 'bg-blue-400/20', border: 'border-blue-400/30', hex: '#60a5fa' },
  epic: { color: 'from-purple-400 to-fuchsia-500', text: 'text-purple-400', bg: 'bg-purple-400/20', border: 'border-purple-400/30', hex: '#a855f7' },
  legendary: { color: 'from-amber-400 to-orange-500', text: 'text-amber-400', bg: 'bg-amber-400/20', border: 'border-amber-400/30', hex: '#fbbf24' },
  mythic: { color: 'from-pink-500 to-rose-600', text: 'text-pink-500', bg: 'bg-pink-500/20', border: 'border-pink-500/30', hex: '#ec4899' }
};

const mockInventory: DropItem[] = [
  { id: 'i1', name: 'Mending Book', description: 'Починка опытом', rarity: 'legendary', probability: 0, sellPrice: 1000, icon: '📚', claimedDate: '10.05.2025' },
  { id: 'i2', name: 'Diamond Axe', description: 'Острота V', rarity: 'rare', probability: 0, sellPrice: 150, icon: '🪓', claimedDate: '08.05.2025' },
  { id: 'i3', name: 'Elytra', description: 'Прочность III', rarity: 'mythic', probability: 0, sellPrice: 5000, icon: '🦇', claimedDate: '29.04.2025' },
  { id: 'i4', name: 'Iron Pickaxe', description: 'Эффективность III', rarity: 'common', probability: 0, sellPrice: 50, icon: '⛏️', claimedDate: '20.04.2025' },
  { id: 'i5', name: 'Netherite Sword', description: 'Добыча III', rarity: 'epic', probability: 0, sellPrice: 500, icon: '⚔️', claimedDate: '15.03.2025' },
  { id: 'i6', name: 'Golden Apple', description: 'Регенерация II', rarity: 'rare', probability: 0, sellPrice: 120, icon: '🍎', claimedDate: '10.03.2025' },
];

const ambientCubes = [
    { top: '15%', left: '10%', size: 100, delay: '0s' },
    { top: '75%', left: '85%', size: 140, delay: '5s' },
    { top: '40%', left: '90%', size: 80, delay: '2s' },
];

const GradientCard: React.FC<React.PropsWithChildren<{
  color?: string;
  className?: string;
  delay?: number;
}>> = ({ children, color = "from-slate-700 to-slate-800", className = "", delay = 0 }) => {
  return (
    <div 
      className={`group relative bg-gradient-to-br ${color} p-[1px] rounded-2xl transition-all duration-500 hover:scale-[1.01] ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="bg-[#151922]/95 backdrop-blur-sm rounded-2xl h-full w-full relative overflow-hidden">
        <div className="relative z-10 p-6 h-full">
            {children}
        </div>
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
      </div>
    </div>
  );
};

const StatItem: React.FC<{ label: string; value: string | number; colorClass: string }> = ({ label, value, colorClass }) => (
    <div className="text-center p-4 rounded-xl bg-white/5 border border-white/5">
        <div className={`text-2xl md:text-3xl font-bold ${colorClass} mb-1`}>{value}</div>
        <div className="text-xs text-mc-text-secondary uppercase tracking-wider font-semibold">{label}</div>
    </div>
);

export default function ProfilePage() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(4250);
  const [inventory, setInventory] = useState(mockInventory);
  const [activeTab, setActiveTab] = useState<'inventory' | 'history'>('inventory');
  const [isConnected, setIsConnected] = useState(true);

  const totalOpened = 187;
  const rank = "Treasure Hunter";
  const progressToNextRank = 75;

  const handleSell = (id: string, price: number) => {
    setInventory(prev => prev.filter(i => i.id !== id));
    setBalance(prev => prev + price);
  };

  const stats = useMemo(() => {
    const counts = { common: 0, rare: 0, epic: 0, legendary: 0, mythic: 0 };
    inventory.forEach(i => { if (counts[i.rarity as keyof typeof counts] !== undefined) counts[i.rarity as keyof typeof counts]++ });
    return counts;
  }, [inventory]);

  return (
    <div className="min-h-screen bg-gradient-main text-mc-text-primary font-sans overflow-x-hidden">
        <style>{`
            .bg-gradient-main {
                background: #0b0e13;
                background-image: radial-gradient(circle at 50% 10%, rgba(54, 211, 153, 0.05), transparent);
            }
            .text-mc-text-primary { color: #f0f0f0; }
            .text-mc-text-secondary { color: #a0a0a0; }
            .bg-mc-bg-secondary { background-color: rgba(30, 30, 30, 0.7); }
            .bg-mc-bg-primary\/90 { background-color: rgba(11, 14, 19, 0.9); }
            .text-mc-accent-emerald { color: #36d399; }
            .bg-mc-accent-emerald { background-color: #36d399; }
            .shadow-glow-emerald { box-shadow: 0 0 15px rgba(54, 211, 153, 0.3); }

            .mc-grid {
                position: fixed; inset: 0;
                background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                                  linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
                background-size: 60px 60px;
                pointer-events: none; z-index: 0;
            }
            
            @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
            .animate-float { animation: float 6s ease-in-out infinite; }
        `}</style>

        <div className="mc-grid"></div>
        {ambientCubes.map((cube, i) => (
            <div 
                key={i}
                className="fixed bg-mc-accent-emerald/5 border border-white/5 rounded-2xl backdrop-blur-sm animate-float"
                style={{ 
                    top: cube.top, left: cube.left, width: cube.size, height: cube.size, 
                    animationDelay: cube.delay, zIndex: 0 
                }}
            ></div>
        ))}

        <Header 
            balance={balance} 
            username="Steve_2024" 
            isConnected={isConnected} 
            onConnect={() => setIsConnected(true)} 
        />

        <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
            
            <section className="mb-12">
                <GradientCard color="from-emerald-500/50 via-blue-500/50 to-purple-600/50" className="p-[2px]">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="relative group">
                            <div className="w-32 h-32 bg-[#1a1f29] rounded-2xl flex items-center justify-center text-4xl shadow-glow-emerald border-2 border-white/10 overflow-hidden">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Steve`} alt="Avatar" className="w-28 h-28 transform transition-transform group-hover:scale-110" />
                            </div>
                            <div className="absolute -bottom-3 -right-3 bg-[#0b0e13] border border-mc-accent-emerald text-mc-accent-emerald px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                                Online
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left space-y-3">
                            <div className="flex flex-col md:flex-row items-center gap-3">
                                <h1 className="text-4xl md:text-5xl font-bold text-white">Steve_2024</h1>
                                <span className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 rounded text-xs font-bold uppercase tracking-wider">
                                    {rank}
                                </span>
                            </div>
                            <p className="text-mc-text-secondary max-w-lg">
                                Искатель сокровищ уровня "Мастер". Специализируется на мифических артефактах и редких зачарованиях.
                            </p>
                            
                            <div className="mt-4 w-full max-w-md">
                                <div className="flex justify-between text-xs text-mc-text-secondary mb-1">
                                    <span>XP до следующего ранга</span>
                                    <span>{progressToNextRank}%</span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-mc-accent-emerald w-[75%] shadow-[0_0_10px_rgba(54,211,153,0.5)]"></div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 min-w-[200px]">
                            <Button variant="primary" onClick={() => console.log('Top up')}>Пополнить баланс</Button>
                            <Button variant="secondary" onClick={() => console.log('Settings')}>Настройки</Button>
                        </div>
                    </div>
                </GradientCard>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                <GradientCard className="lg:col-span-1">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                        <span className="text-mc-accent-emerald">📊</span> Статистика
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <StatItem label="Открыто кейсов" value={totalOpened} colorClass="text-white" />
                        <StatItem label="Потрачено MC" value="45.5k" colorClass="text-mc-accent-emerald" />
                        <StatItem label="Лучший дроп" value="Mythic" colorClass="text-pink-500" />
                        <StatItem label="Продано" value="128" colorClass="text-blue-400" />
                    </div>
                </GradientCard>

                <GradientCard className="lg:col-span-2">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                        <span className="text-purple-400">🔮</span> Удача (Распределение редкости)
                    </h3>
                    <div className="space-y-4">
                        {Object.entries(stats).reverse().map(([key, count]) => {
                           const conf = rarityConfig[key as Rarity];
                           const total = inventory.length || 1;
                           const percent = (count / total) * 100;
                           
                           return (
                               <div key={key} className="flex items-center gap-4">
                                   <div className={`w-24 text-xs font-bold uppercase tracking-wider ${conf.text} text-right`}>{key}</div>
                                   <div className="flex-1 h-8 bg-white/5 rounded-lg overflow-hidden relative">
                                       <div 
                                            className={`h-full bg-gradient-to-r ${conf.color} opacity-80 transition-all duration-1000`} 
                                            style={{ width: `${Math.max(percent, 2)}%` }}
                                       ></div>
                                       <div className="absolute inset-0 flex items-center pl-3 text-xs font-bold text-white drop-shadow-md">
                                           {count} шт.
                                       </div>
                                   </div>
                               </div>
                           );
                        })}
                    </div>
                </GradientCard>
            </div>

            <section>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-white">
                        Инвентарь
                    </h2>
                    <div className="flex bg-mc-bg-secondary p-1 rounded-xl border border-white/10">
                        <button 
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'inventory' ? 'bg-mc-accent-emerald text-white shadow-md' : 'text-mc-text-secondary hover:text-white'}`}
                            onClick={() => setActiveTab('inventory')}
                        >
                            Предметы
                        </button>
                        <button 
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'history' ? 'bg-blue-500 text-white shadow-md' : 'text-mc-text-secondary hover:text-white'}`}
                            onClick={() => setActiveTab('history')}
                        >
                            История
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {inventory.map((item) => {
                        const conf = rarityConfig[item.rarity];
                        return (
                            <div 
                                key={item.id} 
                                className={`group relative bg-white/5 border border-white/5 hover:border-mc-accent-emerald/30 p-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/10`}
                            >
                                <div className={`absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r ${conf.color} opacity-70`}></div>
                                
                                <div className="relative h-32 flex items-center justify-center mb-4 overflow-hidden rounded-lg bg-black/20">
                                     <div className="text-5xl z-10 filter drop-shadow-lg">{item.icon}</div>
                                     <div className={`absolute inset-0 bg-gradient-to-tr ${conf.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}></div>
                                </div>

                                <div className="mb-4">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-bold text-mc-text-primary truncate pr-2">{item.name}</h4>
                                    </div>
                                    <p className="text-xs text-mc-text-secondary truncate">{item.description}</p>
                                </div>

                                <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${conf.bg} ${conf.text} border ${conf.border}`}>
                                        {item.rarity}
                                    </span>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => handleSell(item.id, item.sellPrice)}
                                            className="px-3 py-1.5 bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-mc-text-secondary text-xs font-bold rounded transition-colors border border-white/5 hover:border-red-500/50"
                                        >
                                            {item.sellPrice} MC
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                
                {inventory.length === 0 && (
                    <div className="text-center py-20 text-mc-text-secondary bg-white/5 rounded-2xl border-2 border-dashed border-white/10">
                        <div className="text-4xl mb-4 opacity-50">🕸️</div>
                        <p>Инвентарь пуст. Время открыть пару кейсов!</p>
                        <Button variant="primary" className="mt-4" onClick={() => navigate('/')}>Перейти к кейсам</Button>
                    </div>
                )}
            </section>
        </main>
    </div>
  );
}

