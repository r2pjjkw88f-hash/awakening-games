'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { GameContainer } from '@/components/game/container';
import { ParentChildGame } from '@/components/game/parent-child-game';

type GameType = 'select' | 'relationship' | 'parent-child';

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

  const handleSelectGame = (game: GameType) => {
    setGameType(game);
  };

  const handleBack = () => {
    setGameType('select');
  };

  if (gameType === 'select') {
    return <GameSelect onSelect={handleSelectGame} />;
  }

  if (gameType === 'relationship') {
    return <GameContainer onBack={handleBack} />;
  }

  if (gameType === 'parent-child') {
    return <ParentChildGame onBack={handleBack} />;
  }

  return null;
}
