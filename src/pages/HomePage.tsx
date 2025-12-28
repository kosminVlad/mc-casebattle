import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components/ui/Header';

export default function HomePage() {
    const [isVisible, setIsVisible] = useState(false);
    const [balance, setBalance] = useState(1250);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const cases = [
        {
            id: 1,
            name: 'Стол зачарований',
            type: 'enchanting_table',
            price: 100,
            rarity: 'epic',
            color: 'from-purple-500 to-blue-600',
            url: 'enchanting-table',
        },
        {
            id: 2,
            name: 'Наковальня',
            type: 'anvil',
            rarity: 'upgrade',
            color: 'from-yellow-500 to-orange-600',
            url: '/upgrade',
        },
        {
            id: 3,
            name: 'Верстак',
            type: 'crafting_table',
            price: 75,
            rarity: 'rare',
            color: 'from-green-500 to-emerald-600',
            url: 'crafting-table',
        },
        {
            id: 4,
            name: 'Зельеварка',
            type: 'brewing_stand',
            price: 200,
            rarity: 'mythic',
            color: 'from-pink-500 to-purple-600',
            url: 'brewing-stand',
        },
    ];

    const recentDrops = [
        { player: 'Steve_2024', item: 'Diamond Sword', rarity: 'legendary' },
        { player: 'Alex_Pro', item: 'Enchanted Bow', rarity: 'epic' },
        { player: 'Creeper_King', item: 'Golden Apple', rarity: 'rare' },
    ];

    const ambientCubes = [
        { top: '8%', left: '6%', size: 160, delay: '0s' },
        { top: '65%', left: '12%', size: 120, delay: '4s' },
        { top: '20%', left: '75%', size: 140, delay: '8s' },
        { top: '70%', left: '75%', size: 110, delay: '12s' },
    ];

    const ambientClouds = [
        { top: '12%', left: '35%', delay: '2s', width: 220 },
        { top: '40%', left: '80%', delay: '6s', width: 180 },
        { top: '68%', left: '50%', delay: '10s', width: 200 },
    ];

    return (
        <div className="relative min-h-screen text-white overflow-hidden">
            <div className="mc-grid"></div>
            <div className="mc-ambient-layer">
                {ambientCubes.map((cube, index) => (
                    <span
                        key={`cube-${index}`}
                        className="mc-ambient-cube"
                        style={{
                            top: cube.top,
                            left: cube.left,
                            width: cube.size,
                            height: cube.size,
                            animationDelay: cube.delay,
                        }}
                    />
                ))}
                {ambientClouds.map((cloud, index) => (
                    <span
                        key={`cloud-${index}`}
                        className="mc-ambient-cloud"
                        style={{
                            top: cloud.top,
                            left: cloud.left,
                            width: cloud.width,
                            animationDelay: cloud.delay,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10">
                {/* Header */}
                <Header
                    balance={balance}
                    username="Steve_2024"
                    isConnected={isConnected}
                    onConnect={() => setIsConnected(true)}
                />

                {/* Hero Section */}
                <section className="relative px-6 py-16">
                    <div className="max-w-7xl mx-auto text-center">
                        <h1
                            className={`text-6xl md:text-8xl font-bold mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        >
                            <span className="bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                                Зажги маяк
                            </span>
                            <br />
                            и забери свой лут
                        </h1>

                        <p
                            className={`text-xl text-slate-300 max-w-2xl mx-auto mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        >
                            Открывай порталы в любимые предметы Minecraft, заряжай маяк эмеральдами и
                            пополняй инвентарь легендарными находками. Всё, что выпадет, мгновенно
                            отправится в твою игру.
                        </p>

                        <div
                            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        >
                            <button
                                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full text-lg font-semibold hover:from-emerald-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/25"
                            >
                                Забрать стартовый сундук
                            </button>
                            <button
                                className="px-8 py-4 border-2 border-slate-600 rounded-full text-lg font-semibold hover:border-emerald-400 hover:text-emerald-400 transition-all duration-300"
                            >
                                Путеводитель искателя сокровищ
                            </button>
                        </div>
                    </div>
                </section>

                {/* Cases Grid */}
                <section className="px-6 py-16">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl font-bold text-center mb-12">
                            <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                                Выбери режим
                            </span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {cases.map((caseItem, index) => (
                                <div
                                    key={caseItem.id}
                                    className={`group relative bg-gradient-to-br ${caseItem.color} p-1 rounded-2xl transition-all duration-500 hover:scale-105 cursor-pointer`}
                                    style={{ animationDelay: `${index * 200}ms` }}
                                >
                                    <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 h-full">
                                        {/* 3D Object Placeholder */}
                                        <div className="relative h-48 mb-6 flex items-center justify-center">
                                            <div
                                                className={`w-24 h-24 bg-gradient-to-br ${caseItem.color} rounded-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-500 shadow-lg`}
                                            >
                                                <div className="w-full h-full bg-slate-800/30 rounded-lg flex items-center justify-center">
                                                    <div className="text-2xl">
                                                        ⚒️
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Glow Effect */}
                                            <div
                                                className={`absolute inset-0 bg-gradient-to-br ${caseItem.color} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500`}
                                            ></div>
                                        </div>

                                        <h3 className="text-xl font-bold mb-2 text-center">
                                            {caseItem.name}
                                        </h3>

                                        <div className="flex items-center justify-between mb-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${caseItem.rarity === 'legendary'
                                                    ? 'bg-yellow-500/20 text-yellow-400'
                                                    : caseItem.rarity === 'epic'
                                                        ? 'bg-purple-500/20 text-purple-400'
                                                        : caseItem.rarity === 'rare'
                                                            ? 'bg-blue-500/20 text-blue-400'
                                                            : 'bg-pink-500/20 text-pink-400'
                                                    }`}
                                            >
                                                {caseItem.rarity}
                                            </span>
                                            <span className="text-emerald-400 font-bold">
                                            </span>
                                        </div>

                                        <Link to={caseItem.url.startsWith('/') ? caseItem.url : `/case/${caseItem.url}`}>
                                            <button className="w-full py-3 bg-slate-800 hover:bg-slate-700 rounded-lg font-semibold transition-colors duration-300 border border-slate-600 hover:border-emerald-400">
                                                Активировать портал
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Live Drops */}
                <section className="px-6 py-8 border-t border-slate-700/50">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold">
                                <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                                    Хроника выпадений
                                </span>
                            </h3>
                            <div className="flex items-center space-x-2 text-emerald-400">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                                <span className="text-sm">
                                    Live
                                </span>
                            </div>
                        </div>

                        <div className="overflow-hidden">
                            <div className="mc-marquee-track">
                                {[...Array(3)].map((_, loopIndex) =>
                                    recentDrops.map((drop, index) => (
                                        <div
                                            key={`${loopIndex}-${index}`}
                                            className="flex-shrink-0 min-w-[240px] bg-slate-800/50 rounded-lg p-4 border border-slate-700"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-500 rounded"></div>
                                                <div>
                                                    <div className="text-sm font-semibold">{drop.player}</div>
                                                    <div className="text-xs text-slate-400">получил</div>
                                                </div>
                                                <div
                                                    className={`px-2 py-1 rounded text-xs font-semibold ${drop.rarity === 'legendary'
                                                        ? 'bg-yellow-500/20 text-yellow-400'
                                                        : drop.rarity === 'epic'
                                                            ? 'bg-purple-500/20 text-purple-400'
                                                            : 'bg-blue-500/20 text-blue-400'
                                                        }`}
                                                >
                                                    {drop.item}
                                                </div>
                                            </div>
                                        </div>
                                    )),
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="px-6 py-12 border-t border-slate-700/50 mt-16">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div>
                                <div className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent mb-4">
                                    MC-Case Battle
                                </div>
                                <p className="text-slate-400 text-sm">
                                    Современная платформа для открытия кейсов Minecraft с автоматической
                                    доставкой предметов в игру.
                                </p>
                            </div>

                            <div>
                                <h4 className="font-semibold mb-4">
                                    Платформа
                                </h4>
                                <ul className="space-y-2 text-sm text-slate-400">
                                    <li>
                                        <a href="#" className="hover:text-emerald-400 transition-colors">
                                            Как играть
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-emerald-400 transition-colors">
                                            Правила
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-emerald-400 transition-colors">
                                            FAQ
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-semibold mb-4">
                                    Поддержка
                                </h4>
                                <ul className="space-y-2 text-sm text-slate-400">
                                    <li>
                                        <a href="#" className="hover:text-emerald-400 transition-colors">
                                            Discord
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-emerald-400 transition-colors">
                                            Техподдержка
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-emerald-400 transition-colors">
                                            Баг-репорты
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-semibold mb-4">
                                    Правовая информация
                                </h4>
                                <ul className="space-y-2 text-sm text-slate-400">
                                    <li>
                                        <a href="#" className="hover:text-emerald-400 transition-colors">
                                            Пользовательское соглашение
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-emerald-400 transition-colors">
                                            Политика конфиденциальности
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="border-t border-slate-700/50 mt-8 pt-8 text-center text-slate-400 text-sm">
                            © 2025 MC-Case Battle. Все права защищены.
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

