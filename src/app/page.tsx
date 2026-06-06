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

type GameType = 'select' | 'relationship' | 'parent-child' | 'listen' | 'sos' | 'emotion' | 'parent-type' | 'behavior';

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

  if (gameType === 'listen') {
    return <ListenGame />;
  }

  if (gameType === 'sos') {
    return <SOSGame onBack={handleBack} />;
  }

  if (gameType === 'emotion') {
    return <EmotionGame onBack={handleBack} />;
  }

  if (gameType === 'parent-type') {
    return <ParentTypeGame onBack={handleBack} />;
  }

  if (gameType === 'behavior') {
    return <BehaviorGame onBack={handleBack} />;
  }

  return null;
}
