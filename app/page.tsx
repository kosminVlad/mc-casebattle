'use client';

import { useState, useEffect } from 'react';

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
        },
        {
            id: 2,
            name: 'Наковальня',
            type: 'anvil',
            price: 150,
            rarity: 'legendary',
            color: 'from-yellow-500 to-orange-600',
        },
        {
            id: 3,
            name: 'Верстак',
            type: 'crafting_table',
            price: 75,
            rarity: 'rare',
            color: 'from-green-500 to-emerald-600',
        },
        {
            id: 4,
            name: 'Зельеварка',
            type: 'brewing_stand',
            price: 200,
            rarity: 'mythic',
            color: 'from-pink-500 to-purple-600',
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
            data-oid="avv:iyi"
        >
            {/* Animated Background Particles */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none" data-oid="tkpyt2x">
                <div
                    className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400 rounded-full animate-pulse opacity-60"
                    data-oid="eq0fisn"
                ></div>
                <div
                    className="absolute top-3/4 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-40"
                    data-oid="sm0n_k."
                ></div>
                <div
                    className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-yellow-400 rounded-full animate-bounce opacity-30"
                    data-oid="8ewejrt"
                ></div>
            </div>

            {/* Header */}
            <header
                className="relative z-10 px-6 py-4 border-b border-slate-700/50 backdrop-blur-sm"
                data-oid="ru2l6gg"
            >
                <div
                    className="max-w-7xl mx-auto flex items-center justify-between"
                    data-oid="hertey."
                >
                    <div className="flex items-center space-x-4" data-oid="x67iujs">
                        <div
                            className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent"
                            data-oid="fm0st9m"
                        >
                            MC-Case Battle
                        </div>
                    </div>

                    <div className="flex items-center space-x-6" data-oid="p:qs1_e">
                        <div
                            className="flex items-center space-x-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-600"
                            data-oid="40:-uyh"
                        >
                            <div
                                className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
                                data-oid="jt0xu8-"
                            ></div>
                            <span className="text-emerald-400 font-semibold" data-oid="a4or:3y">
                                {balance.toLocaleString()}
                            </span>
                            <span className="text-slate-400 text-sm" data-oid="r7ry_p9">
                                MC-Coins
                            </span>
                        </div>

                        {isConnected ? (
                            <div
                                className="flex items-center space-x-2 bg-emerald-500/20 px-4 py-2 rounded-full border border-emerald-500/30"
                                data-oid="0jlu0ha"
                            >
                                <div
                                    className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-500 rounded"
                                    data-oid="iw_uwrc"
                                ></div>
                                <span className="text-emerald-400" data-oid="qa9xe9r">
                                    Steve_2024
                                </span>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsConnected(true)}
                                className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full font-semibold hover:from-emerald-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105"
                                data-oid="c375xj0"
                            >
                                Подключить Minecraft
                            </button>
                        )}
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative px-6 py-16" data-oid="6fx5hwy">
                <div className="max-w-7xl mx-auto text-center" data-oid="scl7n48">
                    <h1
                        className={`text-6xl md:text-8xl font-bold mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        data-oid="s40-pqq"
                    >
                        <span
                            className="bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
                            data-oid=".zd-88k"
                        >
                            Открой
                        </span>
                        <br data-oid="fv3uehy" />
                        <span className="text-white" data-oid="l8cg5h8">
                            свой кейс
                        </span>
                    </h1>

                    <p
                        className={`text-xl text-slate-300 max-w-2xl mx-auto mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        data-oid="iymd:o4"
                    >
                        Получай уникальные предметы Minecraft, открывая кейсы в стиле игровых
                        объектов. Все выигрыши автоматически доставляются в твой инвентарь!
                    </p>

                    <div
                        className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        data-oid="lseqd3i"
                    >
                        <button
                            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full text-lg font-semibold hover:from-emerald-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/25"
                            data-oid="1cv_8qk"
                        >
                            Открыть первый кейс
                        </button>
                        <button
                            className="px-8 py-4 border-2 border-slate-600 rounded-full text-lg font-semibold hover:border-emerald-400 hover:text-emerald-400 transition-all duration-300"
                            data-oid="b_h3:vw"
                        >
                            Как это работает
                        </button>
                    </div>
                </div>
            </section>

            {/* Cases Grid */}
            <section className="px-6 py-16" data-oid="tqzalig">
                <div className="max-w-7xl mx-auto" data-oid="ycs8i3v">
                    <h2 className="text-4xl font-bold text-center mb-12" data-oid="urmj_cx">
                        <span
                            className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent"
                            data-oid="5m0-pak"
                        >
                            Выбери свой кейс
                        </span>
                    </h2>

                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                        data-oid="qjkaawn"
                    >
                        {cases.map((caseItem, index) => (
                            <div
                                key={caseItem.id}
                                className={`group relative bg-gradient-to-br ${caseItem.color} p-1 rounded-2xl transition-all duration-500 hover:scale-105 cursor-pointer`}
                                style={{ animationDelay: `${index * 200}ms` }}
                                data-oid="-1dw1:q"
                            >
                                <div
                                    className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 h-full"
                                    data-oid="fll6jlx"
                                >
                                    {/* 3D Object Placeholder */}
                                    <div
                                        className="relative h-48 mb-6 flex items-center justify-center"
                                        data-oid="vivc_3m"
                                    >
                                        <div
                                            className={`w-24 h-24 bg-gradient-to-br ${caseItem.color} rounded-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-500 shadow-lg`}
                                            data-oid="zbp-7i6"
                                        >
                                            <div
                                                className="w-full h-full bg-slate-800/30 rounded-lg flex items-center justify-center"
                                                data-oid="sk3nb8d"
                                            >
                                                <div className="text-2xl" data-oid="_kjnf1b">
                                                    ⚒️
                                                </div>
                                            </div>
                                        </div>

                                        {/* Glow Effect */}
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-br ${caseItem.color} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500`}
                                            data-oid="01t:7ly"
                                        ></div>
                                    </div>

                                    <h3
                                        className="text-xl font-bold mb-2 text-center"
                                        data-oid="hv_dkaq"
                                    >
                                        {caseItem.name}
                                    </h3>

                                    <div
                                        className="flex items-center justify-between mb-4"
                                        data-oid="sgee.-f"
                                    >
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                caseItem.rarity === 'legendary'
                                                    ? 'bg-yellow-500/20 text-yellow-400'
                                                    : caseItem.rarity === 'epic'
                                                      ? 'bg-purple-500/20 text-purple-400'
                                                      : caseItem.rarity === 'rare'
                                                        ? 'bg-blue-500/20 text-blue-400'
                                                        : 'bg-pink-500/20 text-pink-400'
                                            }`}
                                            data-oid="-ogf.1j"
                                        >
                                            {caseItem.rarity}
                                        </span>
                                        <span
                                            className="text-emerald-400 font-bold"
                                            data-oid="k7fmoyt"
                                        >
                                            {caseItem.price} MC
                                        </span>
                                    </div>

                                    <button
                                        className="w-full py-3 bg-slate-800 hover:bg-slate-700 rounded-lg font-semibold transition-colors duration-300 border border-slate-600 hover:border-emerald-400"
                                        data-oid="x28lmxg"
                                    >
                                        Открыть кейс
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Live Drops */}
            <section className="px-6 py-8 border-t border-slate-700/50" data-oid="yegko4-">
                <div className="max-w-7xl mx-auto" data-oid=".4_z_tv">
                    <div className="flex items-center justify-between mb-6" data-oid="6bs2uj7">
                        <h3 className="text-2xl font-bold" data-oid="wlj0vi6">
                            <span
                                className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent"
                                data-oid="nu:u0us"
                            >
                                Последние выпадения
                            </span>
                        </h3>
                        <div
                            className="flex items-center space-x-2 text-emerald-400"
                            data-oid="6:cb7c3"
                        >
                            <div
                                className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
                                data-oid="1u4l4qq"
                            ></div>
                            <span className="text-sm" data-oid="b9b04jq">
                                Live
                            </span>
                        </div>
                    </div>

                    <div className="overflow-hidden" data-oid="_hr14c5">
                        <div className="flex space-x-6 animate-scroll" data-oid="rtqi4sl">
                            {recentDrops.concat(recentDrops).map((drop, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0 bg-slate-800/50 rounded-lg p-4 border border-slate-700"
                                    data-oid="c:u2dt5"
                                >
                                    <div className="flex items-center space-x-3" data-oid=".jg7wem">
                                        <div
                                            className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-500 rounded"
                                            data-oid="u7gjvd7"
                                        ></div>
                                        <div data-oid="2sylmp.">
                                            <div
                                                className="text-sm font-semibold"
                                                data-oid="zgq_gam"
                                            >
                                                {drop.player}
                                            </div>
                                            <div
                                                className="text-xs text-slate-400"
                                                data-oid="eicappo"
                                            >
                                                получил
                                            </div>
                                        </div>
                                        <div
                                            className={`px-2 py-1 rounded text-xs font-semibold ${
                                                drop.rarity === 'legendary'
                                                    ? 'bg-yellow-500/20 text-yellow-400'
                                                    : drop.rarity === 'epic'
                                                      ? 'bg-purple-500/20 text-purple-400'
                                                      : 'bg-blue-500/20 text-blue-400'
                                            }`}
                                            data-oid="cruemmy"
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
            <footer className="px-6 py-12 border-t border-slate-700/50 mt-16" data-oid="jx3x.:-">
                <div className="max-w-7xl mx-auto" data-oid="8ps._eq">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8" data-oid="y:vhpr2">
                        <div data-oid="d0yxj3y">
                            <div
                                className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent mb-4"
                                data-oid="p7ja.j."
                            >
                                MC-Case Battle
                            </div>
                            <p className="text-slate-400 text-sm" data-oid="m1--b4m">
                                Современная платформа для открытия кейсов Minecraft с автоматической
                                доставкой предметов в игру.
                            </p>
                        </div>

                        <div data-oid="zuy:mt0">
                            <h4 className="font-semibold mb-4" data-oid="qbwor_:">
                                Платформа
                            </h4>
                            <ul className="space-y-2 text-sm text-slate-400" data-oid="n4um_96">
                                <li data-oid="yjh4e_:">
                                    <a
                                        href="#"
                                        className="hover:text-emerald-400 transition-colors"
                                        data-oid="2i.tnzw"
                                    >
                                        Как играть
                                    </a>
                                </li>
                                <li data-oid="j_0e9p3">
                                    <a
                                        href="#"
                                        className="hover:text-emerald-400 transition-colors"
                                        data-oid="fk9xi19"
                                    >
                                        Правила
                                    </a>
                                </li>
                                <li data-oid="5z_8keq">
                                    <a
                                        href="#"
                                        className="hover:text-emerald-400 transition-colors"
                                        data-oid="v.:39jv"
                                    >
                                        FAQ
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div data-oid="4hoisaw">
                            <h4 className="font-semibold mb-4" data-oid="_kom2l9">
                                Поддержка
                            </h4>
                            <ul className="space-y-2 text-sm text-slate-400" data-oid="qv-p_zm">
                                <li data-oid="auokt_x">
                                    <a
                                        href="#"
                                        className="hover:text-emerald-400 transition-colors"
                                        data-oid=":b1-qa7"
                                    >
                                        Discord
                                    </a>
                                </li>
                                <li data-oid="v9yfomc">
                                    <a
                                        href="#"
                                        className="hover:text-emerald-400 transition-colors"
                                        data-oid="s561-.o"
                                    >
                                        Техподдержка
                                    </a>
                                </li>
                                <li data-oid="7n.d.la">
                                    <a
                                        href="#"
                                        className="hover:text-emerald-400 transition-colors"
                                        data-oid="y-ev2ra"
                                    >
                                        Баг-репорты
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div data-oid="k4pvuq9">
                            <h4 className="font-semibold mb-4" data-oid="zh4:af_">
                                Правовая информация
                            </h4>
                            <ul className="space-y-2 text-sm text-slate-400" data-oid="0umggwh">
                                <li data-oid="2t6hu_u">
                                    <a
                                        href="#"
                                        className="hover:text-emerald-400 transition-colors"
                                        data-oid="698.:ko"
                                    >
                                        Пользовательское соглашение
                                    </a>
                                </li>
                                <li data-oid="q4dyoi5">
                                    <a
                                        href="#"
                                        className="hover:text-emerald-400 transition-colors"
                                        data-oid="13h_7jx"
                                    >
                                        Политика конфиденциальности
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div
                        className="border-t border-slate-700/50 mt-8 pt-8 text-center text-slate-400 text-sm"
                        data-oid="ajw0pc8"
                    >
                        © 2024 MC-Case Battle. Все права защищены.
                    </div>
                </div>
            </footer>

            <style jsx data-oid="_qx0e89">{`
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
