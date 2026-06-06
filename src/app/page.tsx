'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { GameContainer } from '@/components/game/container';
import { ParentChildGame } from '@/components/game/parent-child-game';
import { ListenGame } from '@/components/game/listen-game';
import { SOSGame } from '@/components/game/sos-game';
import { EmotionGame } from '@/components/game/emotion-game';
import { ParentTypeGame } from '@/components/game/parent-type-game';
import { BehaviorGame } from '@/components/game/behavior-game';
import AwakeningJourneyGame from '@/components/game/awakening-journey-game';
import BelongingGame from '@/components/game/belonging-game';
import LastFoodGame from '@/components/game/last-food-game';
import TreasureHuntGame from '@/components/game/treasure-hunt-game';
import { MusicButton } from '@/components/game/MusicButton';

type GameType = 'select' | 'relationship' | 'parent-child' | 'listen' | 'sos' | 'emotion' | 'parent-type' | 'behavior' | 'awakening-journey' | 'belonging' | 'last-food' | 'treasure-hunt';

// 游戏选择界面
function GameSelect({ onSelect }: { onSelect: (game: GameType) => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 使用 useMemo 预生成粒子位置，避免渲染中使用随机数
  const particles = useMemo(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${(i * 7) % 100}%`,
      top: `${(i * 11) % 100}%`,
      delay: `${i * 0.5}s`,
      duration: `${4 + (i % 4)}s`,
    })),
  []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* 背景 */}
      <div className="absolute inset-0">
        <Image
          src="/assets/封面.png"
          alt="背景"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1625]/80 via-[#2d2640]/70 to-[#1a1625]/90" />
      </div>

      {/* 浮动粒子 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full bg-white/20 animate-float"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}
      </div>

      {/* 内容 */}
      <div className={`relative z-10 flex flex-col items-center justify-center min-h-screen px-6 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-md w-full">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
              此刻花开
            </h1>
            <p className="text-white/60 text-sm">
              觉察之旅
            </p>
          </div>

          {/* 游戏卡片 */}
          <div className="space-y-4">
            {/* 觉醒之旅增强版 */}
            <button
              onClick={() => onSelect('awakening-journey')}
              className="w-full text-left p-5 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-md rounded-2xl border border-pink-400/30 hover:from-pink-500/30 hover:to-purple-500/30 hover:border-pink-400/50 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">🌸</div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-white mb-1 group-hover:text-pink-300 transition-colors">
                    亲密关系：觉醒之旅 ✨增强版
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    RPG风格觉察游戏！经验值系统、隐藏任务、道具升级。经历六关灵魂旅程，找到通往觉醒的门。
                  </p>
                  <div className="flex gap-2 mt-3">
                    <span className="text-xs text-pink-300/80 bg-pink-500/20 px-2 py-1 rounded">⭐ XP系统</span>
                    <span className="text-xs text-yellow-300/80 bg-yellow-500/20 px-2 py-1 rounded">🔮 隐藏任务</span>
                    <span className="text-xs text-purple-300/80 bg-purple-500/20 px-2 py-1 rounded">🎁 道具升级</span>
                  </div>
                </div>
                <div className="text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all">
                  →
                </div>
              </div>
            </button>

            {/* 亲密关系游戏 */}
            <button
              onClick={() => onSelect('relationship')}
              className="w-full text-left p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 hover:border-[#e8b4b8]/50 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">💜</div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-white mb-1 group-hover:text-[#e8b4b8] transition-colors">
                    亲密关系：觉醒之旅
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    透过关系，找到自己。经历期待、失望、冲突、觉察，最终找到通往觉醒的门。
                  </p>
                  <div className="flex gap-2 mt-3">
                    <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded">6关</span>
                    <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded">剧情选择</span>
                    <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded">觉醒报告</span>
                  </div>
                </div>
                <div className="text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all">
                  →
                </div>
              </div>
            </button>

            {/* 亲子观察游戏 */}
            <button
              onClick={() => onSelect('parent-child')}
              className="w-full text-left p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 hover:border-[#c9b8d4]/50 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">👁️</div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-white mb-1 group-hover:text-[#c9b8d4] transition-colors">
                    亲子观察：看见孩子，看见自己
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    每天10分钟，不教育、不纠正、不讲道理。观察孩子的情绪、眼神、表达，同时也观察自己。
                  </p>
                  <div className="flex gap-2 mt-3">
                    <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded">6关</span>
                    <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded">情景练习</span>
                    <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded">觉察报告</span>
                  </div>
                </div>
                <div className="text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all">
                  →
                </div>
              </div>
            </button>

            {/* 倾听孩子游戏 */}
            <button
              onClick={() => onSelect('listen')}
              className="w-full text-left p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 hover:border-[#f9a8d4]/50 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">👂</div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-white mb-1 group-hover:text-[#f9a8d4] transition-colors">
                    倾听孩子：90%的时间，只是倾听
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    真正的倾听，不是解决问题，而是让孩子感觉"我被听见了"。放下手机、保持眼神、接纳情绪。
                  </p>
                  <div className="flex gap-2 mt-3">
                    <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded">6关</span>
                    <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded">情景练习</span>
                    <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded">倾听报告</span>
                  </div>
                </div>
                <div className="text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all">
                  →
                </div>
              </div>
            </button>

            {/* 求救信号识别游戏 */}
            <button
              onClick={() => onSelect('sos')}
              className="w-full text-left p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 hover:border-red-400/50 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">🚨</div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-white mb-1 group-hover:text-red-300 transition-colors">
                    求救信号识别：父母的感受 = 孩子的求救
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    很多父母只看见孩子最后的爆发，却没看见：孩子曾无数次轻声求救。学会识别孩子行为背后的信号。
                  </p>
                  <div className="flex gap-2 mt-3">
                    <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded">5关</span>
                    <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded">程度识别</span>
                    <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded">觉察报告</span>
                  </div>
                </div>
                <div className="text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all">
                  →
                </div>
              </div>
            </button>

            {/* 情绪地图游戏 */}
            <button
              onClick={() => onSelect('emotion')}
              className="w-full text-left p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 hover:border-amber-400/50 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">🗺️</div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-white mb-1 group-hover:text-amber-300 transition-colors">
                    情绪地图：父母的情绪，是理解孩子的地图
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    孩子的行为是他们内心的语言，父母的情绪是理解他们的线索。读懂情绪背后的信号，看见孩子真正的需要。
                  </p>
                  <div className="flex gap-2 mt-3">
                    <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded">5关</span>
                    <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded">情绪解读</span>
                    <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded">觉察报告</span>
                  </div>
                </div>
                <div className="text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all">
                  →
                </div>
              </div>
            </button>

            {/* 父母类型测试游戏 */}
            <button
              onClick={() => onSelect('parent-type')}
              className="w-full text-left p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 hover:border-green-400/50 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">👨‍👩‍👧</div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-white mb-1 group-hover:text-green-300 transition-colors">
                    父母类型测试：情绪化 VS 智慧型
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    6个育儿场景，测试你的养育模式。发现自己是情绪化还是智慧型，学习更稳定的回应方式。
                  </p>
                  <div className="flex gap-2 mt-3">
                    <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded">6关</span>
                    <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded">场景选择</span>
                    <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded">类型报告</span>
                  </div>
                </div>
                <div className="text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all">
                  →
                </div>
              </div>
            </button>

            {/* 偏差行为识别游戏 */}
            <button
              onClick={() => onSelect('behavior')}
              className="w-full text-left p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 hover:border-purple-400/50 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">🔍</div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-white mb-1 group-hover:text-purple-300 transition-colors">
                    偏差行为识别：四种严重程度
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    所有偏差行为，本质都不是攻击，而是没有被满足的需求。学习识别行为类型和严重程度，看见孩子真正的需要。
                  </p>
                  <div className="flex gap-2 mt-3">
                    <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded">8关</span>
                    <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded">类型识别</span>
                    <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded">程度判断</span>
                  </div>
                </div>
                <div className="text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all">
                  →
                </div>
              </div>
            </button>

            {/* 归属感与特殊性游戏 */}
            <button
              onClick={() => onSelect('belonging')}
              className="w-full text-left p-5 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 backdrop-blur-md rounded-2xl border border-teal-400/30 hover:from-teal-500/30 hover:to-cyan-500/30 hover:border-teal-400/50 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">🏠</div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-white mb-1 group-hover:text-teal-300 transition-colors">
                    归属与特殊：找回自己
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    七关觉醒之旅，探索童年的回音、接纳之岛、懂事的面具...找回真正属于自己的归属感。
                  </p>
                  <div className="flex gap-2 mt-3">
                    <span className="text-xs text-teal-300/60 bg-teal-400/20 px-2 py-1 rounded">7关</span>
                    <span className="text-xs text-teal-300/60 bg-teal-400/20 px-2 py-1 rounded">XP系统</span>
                    <span className="text-xs text-teal-300/60 bg-teal-400/20 px-2 py-1 rounded">隐藏任务</span>
                  </div>
                </div>
                <div className="text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all">
                  →
                </div>
              </div>
            </button>

            {/* 最后的食物游戏 */}
            <button
              onClick={() => onSelect('last-food')}
              className="w-full text-left p-5 bg-gradient-to-r from-amber-500/20 to-red-500/20 backdrop-blur-md rounded-2xl border border-amber-400/30 hover:from-amber-500/30 hover:to-red-500/30 hover:border-amber-400/50 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">🍖</div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-white mb-1 group-hover:text-amber-300 transition-colors">
                    最后的食物：动物性觉察
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    10人6份食物，生存游戏开始。你会如何选择？觉察自己的动物性、社会性、人性，看见完整的自己。
                  </p>
                  <div className="flex gap-2 mt-3">
                    <span className="text-xs text-amber-300/60 bg-amber-500/20 px-2 py-1 rounded">多轮制</span>
                    <span className="text-xs text-amber-300/60 bg-amber-500/20 px-2 py-1 rounded">隐藏任务</span>
                    <span className="text-xs text-amber-300/60 bg-amber-500/20 px-2 py-1 rounded">觉察报告</span>
                  </div>
                </div>
                <div className="text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all">
                  →
                </div>
              </div>
            </button>

            {/* 生命寻宝游戏 */}
            <button
              onClick={() => onSelect('treasure-hunt')}
              className="w-full text-left p-5 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 backdrop-blur-md rounded-2xl border border-yellow-400/30 hover:from-yellow-500/30 hover:to-amber-500/30 hover:border-yellow-400/50 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">🗺️</div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-white mb-1 group-hover:text-yellow-300 transition-colors">
                    生命寻宝：寻找自己，认出自己
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    你以为在寻找宝藏，其实是在寻找自己。找到五个宝藏，收集隐藏卡片，认出真正的自己。
                  </p>
                  <div className="flex gap-2 mt-3">
                    <span className="text-xs text-yellow-300/60 bg-yellow-500/20 px-2 py-1 rounded">5关寻宝</span>
                    <span className="text-xs text-yellow-300/60 bg-yellow-500/20 px-2 py-1 rounded">隐藏拼图</span>
                    <span className="text-xs text-yellow-300/60 bg-yellow-500/20 px-2 py-1 rounded">冥想时刻</span>
                  </div>
                </div>
                <div className="text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all">
                  →
                </div>
              </div>
            </button>
          </div>

          {/* 底部提示 */}
          <p className="text-center text-white/40 text-xs mt-8">
            真正的成长，永远从觉察开始 💜
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [gameType, setGameType] = useState<GameType>('select');

  // 监听URL hash，支持直接链接访问特定游戏
  useEffect(() => {
    const hash = window.location.hash.slice(1); // 移除 # 号
    if (hash && ['relationship', 'parent-child', 'listen', 'sos', 'emotion', 'parent-type', 'behavior', 'awakening-journey', 'belonging', 'last-food', 'treasure-hunt'].includes(hash)) {
      setGameType(hash as GameType);
    }
  }, []);

  const handleSelectGame = (game: GameType) => {
    setGameType(game);
    window.location.hash = game; // 更新URL hash
  };

  const handleBack = () => {
    setGameType('select');
    window.location.hash = ''; // 清除hash
  };

  return (
    <>
      <MusicButton />
      {gameType === 'select' && <GameSelect onSelect={handleSelectGame} />}
      {gameType === 'relationship' && <GameContainer onBack={handleBack} />}
      {gameType === 'parent-child' && <ParentChildGame onBack={handleBack} />}
      {gameType === 'listen' && <ListenGame />}
      {gameType === 'sos' && <SOSGame onBack={handleBack} />}
      {gameType === 'emotion' && <EmotionGame onBack={handleBack} />}
      {gameType === 'parent-type' && <ParentTypeGame onBack={handleBack} />}
      {gameType === 'behavior' && <BehaviorGame onBack={handleBack} />}
      {gameType === 'awakening-journey' && <AwakeningJourneyGame />}
      {gameType === 'belonging' && <BelongingGame onBack={handleBack} />}
      {gameType === 'last-food' && <LastFoodGame onBack={handleBack} />}
      {gameType === 'treasure-hunt' && <TreasureHuntGame onBack={handleBack} />}
    </>
  );
}
