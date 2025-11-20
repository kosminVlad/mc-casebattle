'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { url } from 'inspector';

export default function Page() {
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
            price: 150,
            rarity: 'legendary',
            color: 'from-yellow-500 to-orange-600',
            url: 'anvil',
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

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden"
            data-oid="wpdsei1"
        >
            {/* Animated Background Particles */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none" data-oid="pmlc_bw">
                <div
                    className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400 rounded-full animate-pulse opacity-60"
                    data-oid="sfi7d24"
                ></div>
                <div
                    className="absolute top-3/4 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-40"
                    data-oid="k4rjiqd"
                ></div>
                <div
                    className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-yellow-400 rounded-full animate-bounce opacity-30"
                    data-oid="he9ughv"
                ></div>
            </div>

            {/* Header */}
            <header
                className="relative z-10 px-6 py-4 border-b border-slate-700/50 backdrop-blur-sm"
                data-oid="eqe0083"
            >
                <div
                    className="max-w-7xl mx-auto flex items-center justify-between"
                    data-oid="udwjjgw"
                >
                    <div className="flex items-center space-x-4" data-oid="tw2rkx3">
                        <div
                            className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent"
                            data-oid="t0mt_.u"
                        >
                            MC-Case Battle
                        </div>
                    </div>

                    <div className="flex items-center space-x-6" data-oid="eci_zfe">
                        <div
                            className="flex items-center space-x-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-600"
                            data-oid="v22_o87"
                        >
                            <div
                                className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
                                data-oid="u:.tfht"
                            ></div>
                            <span className="text-emerald-400 font-semibold" data-oid="5hp5sle">
                                {balance.toLocaleString()}
                            </span>
                            <span className="text-slate-400 text-sm" data-oid="e9wzf0k">
                                MC-Coins
                            </span>
                        </div>

                        {isConnected ? (
                            <div
                                className="flex items-center space-x-2 bg-emerald-500/20 px-4 py-2 rounded-full border border-emerald-500/30"
                                data-oid="2sf9lou"
                            >
                                <div
                                    className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-500 rounded"
                                    data-oid="av3gfj:"
                                ></div>
                                <span className="text-emerald-400" data-oid="_br6p2j">
                                    Steve_2024
                                </span>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsConnected(true)}
                                className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full font-semibold hover:from-emerald-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105"
                                data-oid="ajcb_xj"
                            >
                                Подключить Minecraft
                            </button>
                        )}
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative px-6 py-16" data-oid="r-v0vas">
                <div className="max-w-7xl mx-auto text-center" data-oid="tshi9.0">
                    <h1
                        className={`text-6xl md:text-8xl font-bold mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        data-oid="5oyh3yx"
                    >
                        <span
                            className="bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
                            data-oid="3b5vbv."
                        >
                            Открой
                        </span>
                        <br data-oid="j.nherz" />
                        <span className="text-white" data-oid="e9xcfp6">
                            свой кейс
                        </span>
                    </h1>

                    <p
                        className={`text-xl text-slate-300 max-w-2xl mx-auto mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        data-oid="re...35"
                    >
                        Получай уникальные предметы Minecraft, открывая кейсы в стиле игровых
                        объектов. Все выигрыши автоматически доставляются в твой инвентарь!
                    </p>

                    <div
                        className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        data-oid="42u2z9:"
                    >
                        <button
                            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full text-lg font-semibold hover:from-emerald-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/25"
                            data-oid="gkfbey7"
                        >
                            Открыть первый кейс
                        </button>
                        <button
                            className="px-8 py-4 border-2 border-slate-600 rounded-full text-lg font-semibold hover:border-emerald-400 hover:text-emerald-400 transition-all duration-300"
                            data-oid="-ipg6v1"
                        >
                            Как это работает
                        </button>
                    </div>
                </div>
            </section>

            {/* Cases Grid */}
            <section className="px-6 py-16" data-oid="5rhc9q_">
                <div className="max-w-7xl mx-auto" data-oid="mptho8t">
                    <h2 className="text-4xl font-bold text-center mb-12" data-oid="-t9u-yd">
                        <span
                            className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent"
                            data-oid="4-d4ja7"
                        >
                            Выбери свой кейс
                        </span>
                    </h2>

                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                        data-oid="1-a2x_k"
                    >
                        {cases.map((caseItem, index) => (
                            <div
                                key={caseItem.id}
                                className={`group relative bg-gradient-to-br ${caseItem.color} p-1 rounded-2xl transition-all duration-500 hover:scale-105 cursor-pointer`}
                                style={{ animationDelay: `${index * 200}ms` }}
                                data-oid="jupbzfs"
                            >
                                <div
                                    className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 h-full"
                                    data-oid="8:180ph"
                                >
                                    {/* 3D Object Placeholder */}
                                    <div
                                        className="relative h-48 mb-6 flex items-center justify-center"
                                        data-oid="ct9m:w2"
                                    >
                                        <div
                                            className={`w-24 h-24 bg-gradient-to-br ${caseItem.color} rounded-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-500 shadow-lg`}
                                            data-oid="k856_cu"
                                        >
                                            <div
                                                className="w-full h-full bg-slate-800/30 rounded-lg flex items-center justify-center"
                                                data-oid="2kj9g0y"
                                            >
                                                <div className="text-2xl" data-oid="ni4-kx8">
                                                    ⚒️
                                                </div>
                                            </div>
                                        </div>

                                        {/* Glow Effect */}
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-br ${caseItem.color} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500`}
                                            data-oid="6ihv4z5"
                                        ></div>
                                    </div>

                                    <h3
                                        className="text-xl font-bold mb-2 text-center"
                                        data-oid="dad59b7"
                                    >
                                        {caseItem.name}
                                    </h3>

                                    <div
                                        className="flex items-center justify-between mb-4"
                                        data-oid="ivl69_f"
                                    >
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${caseItem.rarity === 'legendary'
                                                    ? 'bg-yellow-500/20 text-yellow-400'
                                                    : caseItem.rarity === 'epic'
                                                        ? 'bg-purple-500/20 text-purple-400'
                                                        : caseItem.rarity === 'rare'
                                                            ? 'bg-blue-500/20 text-blue-400'
                                                            : 'bg-pink-500/20 text-pink-400'
                                                }`}
                                            data-oid="wzv-yxt"
                                        >
                                            {caseItem.rarity}
                                        </span>
                                        <span
                                            className="text-emerald-400 font-bold"
                                            data-oid="i1w9b.4"
                                        >
                                            {caseItem.price} MC
                                        </span>
                                    </div>

                                    <Link href={`/case/${caseItem.url}`}>
                                        <button className="w-full py-3 bg-slate-800 hover:bg-slate-700 rounded-lg font-semibold transition-colors duration-300 border border-slate-600 hover:border-emerald-400"
                                            data-oid="_y44rpk">
                                            Открыть кейс
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Live Drops */}
            <section className="px-6 py-8 border-t border-slate-700/50" data-oid="551vy05">
                <div className="max-w-7xl mx-auto" data-oid="ogzm.xa">
                    <div className="flex items-center justify-between mb-6" data-oid="p5wlxv5">
                        <h3 className="text-2xl font-bold" data-oid="zide:wo">
                            <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent" data-oid="9437-:.">
                                Последние выпадения
                            </span>
                        </h3>
                        <div
                            className="flex items-center space-x-2 text-emerald-400"
                            data-oid="p5jtrau"
                        >
                            <div
                                className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
                                data-oid="x.ux-.x"
                            ></div>
                            <span className="text-sm" data-oid="bkc8t5m">
                                Live
                            </span>
                        </div>
                    </div>

                    <div className="overflow-hidden" data-oid="06isv9o">
                        <div className="flex space-x-6 animate-scroll" data-oid="gaa7k4n">
                            {recentDrops.concat(recentDrops).map((drop, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0 bg-slate-800/50 rounded-lg p-4 border border-slate-700"
                                    data-oid="ks-ifp."
                                >
                                    <div className="flex items-center space-x-3" data-oid="lo.7351">
                                        <div
                                            className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-500 rounded"
                                            data-oid="mk7ilb4"
                                        ></div>
                                        <div data-oid="2_wflle">
                                            <div
                                                className="text-sm font-semibold"
                                                data-oid=".usot7z"
                                            >
                                                {drop.player}
                                            </div>
                                            <div
                                                className="text-xs text-slate-400"
                                                data-oid="vrou0wh"
                                            >
                                                получил
                                            </div>
                                        </div>
                                        <div
                                            className={`px-2 py-1 rounded text-xs font-semibold ${drop.rarity === 'legendary'
                                                    ? 'bg-yellow-500/20 text-yellow-400'
                                                    : drop.rarity === 'epic'
                                                        ? 'bg-purple-500/20 text-purple-400'
                                                        : 'bg-blue-500/20 text-blue-400'
                                                }`}
                                            data-oid="brua:pp"
                                        >
                                            {drop.item}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="px-6 py-12 border-t border-slate-700/50 mt-16" data-oid="tr7qzkw">
                <div className="max-w-7xl mx-auto" data-oid="ue6grfp">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8" data-oid="6ich73y">
                        <div data-oid="n9twhnv">
                            <div
                                className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent mb-4"
                                data-oid="82hdpg9"
                            >
                                MC-Case Battle
                            </div>
                            <p className="text-slate-400 text-sm" data-oid="ajovita">
                                Современная платформа для открытия кейсов Minecraft с автоматической
                                доставкой предметов в игру.
                            </p>
                        </div>

                        <div data-oid="o0tj:01">
                            <h4 className="font-semibold mb-4" data-oid="pw57u::">
                                Платформа
                            </h4>
                            <ul className="space-y-2 text-sm text-slate-400" data-oid="ulfn77w">
                                <li data-oid="_szimdn">
                                    <a
                                        href="#"
                                        className="hover:text-emerald-400 transition-colors"
                                        data-oid="w79mvj3"
                                    >
                                        Как играть
                                    </a>
                                </li>
                                <li data-oid="2wj-ef0">
                                    <a
                                        href="#"
                                        className="hover:text-emerald-400 transition-colors"
                                        data-oid="dg6rrz0"
                                    >
                                        Правила
                                    </a>
                                </li>
                                <li data-oid="1mfp9g8">
                                    <a
                                        href="#"
                                        className="hover:text-emerald-400 transition-colors"
                                        data-oid="0qk:e6x"
                                    >
                                        FAQ
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div data-oid="fncifs5">
                            <h4 className="font-semibold mb-4" data-oid="-yls3eh">
                                Поддержка
                            </h4>
                            <ul className="space-y-2 text-sm text-slate-400" data-oid="yitbsfi">
                                <li data-oid="41aais0">
                                    <a
                                        href="#"
                                        className="hover:text-emerald-400 transition-colors"
                                        data-oid="vfvx4x2"
                                    >
                                        Discord
                                    </a>
                                </li>
                                <li data-oid="w5iax4i">
                                    <a
                                        href="#"
                                        className="hover:text-emerald-400 transition-colors"
                                        data-oid="u_cyadh"
                                    >
                                        Техподдержка
                                    </a>
                                </li>
                                <li data-oid="zu.ljvd">
                                    <a
                                        href="#"
                                        className="hover:text-emerald-400 transition-colors"
                                        data-oid="k9_zvun"
                                    >
                                        Баг-репорты
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div data-oid="_i7sgk0">
                            <h4 className="font-semibold mb-4" data-oid="f3fav00">
                                Правовая информация
                            </h4>
                            <ul className="space-y-2 text-sm text-slate-400" data-oid="xxn5ezt">
                                <li data-oid="w7k731a">
                                    <a
                                        href="#"
                                        className="hover:text-emerald-400 transition-colors"
                                        data-oid="baeq2kw"
                                    >
                                        Пользовательское соглашение
                                    </a>
                                </li>
                                <li data-oid="vcv9jgu">
                                    <a
                                        href="#"
                                        className="hover:text-emerald-400 transition-colors"
                                        data-oid="jbcfgys"
                                    >
                                        Политика конфиденциальности
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div
                        className="border-t border-slate-700/50 mt-8 pt-8 text-center text-slate-400 text-sm"
                        data-oid="smxmloa"
                    >
                        © 2024 MC-Case Battle. Все права защищены.
                    </div>
                </div>
            </footer>

            <style jsx data-oid="s:ub6fn">{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                .animate-scroll {
                    animation: scroll 20s linear infinite;
                }
            `}</style>
        </div>
    );
}
