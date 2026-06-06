'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { parentLevels, generateParentReport, wiseParentTraits, emotionalParentTraits, parentInsights, type ParentChoice } from '@/lib/parent-type-data';

// 打字机效果组件
function TypewriterText({ text, speed = 30, onComplete }: { text: string; speed?: number; onComplete?: () => void }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setIsComplete(false);
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setIsComplete(true);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed, onComplete]);

  return (
    <span>
      {displayedText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </span>
  );
}

// 浮动粒子效果
function FloatingParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      width: `${(i % 5) * 2 + 4}px`,
      height: `${((i + 3) % 5) * 2 + 4}px`,
      left: `${(i * 7) % 100}%`,
      top: `${(i * 11) % 100}%`,
      duration: `${4 + (i % 4)}s`,
      delay: `-${i * 0.3}s`,
    })),
  []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full opacity-30"
          style={{
            width: particle.width,
            height: particle.height,
            background: particle.id % 2 === 0 ? '#e8b4b8' : '#c9b8d4',
            left: particle.left,
            top: particle.top,
            animation: `float ${particle.duration} ease-in-out infinite`,
            animationDelay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}

// 开始页面
function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative bg-gradient-to-b from-[#1a1625] via-[#2d2640] to-[#1a1625]">
      <FloatingParticles />
      
      <div className="relative z-10 text-center max-w-md mx-auto">
        {/* 标题 */}
        <div className="mb-6">
          <span className="text-4xl mb-4 block">👨‍👩‍👧</span>
          <h1 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
            情绪化父母 VS 智慧型父母
          </h1>
          <p className="text-white/70 text-sm">
            发现你的养育模式
          </p>
        </div>

        {/* 对比卡片 */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="bg-red-500/20 backdrop-blur-sm rounded-xl p-4 border border-red-400/30">
            <div className="text-2xl mb-2">😤</div>
            <h3 className="text-white font-medium text-sm mb-2">情绪化父母</h3>
            <ul className="text-xs text-white/70 space-y-1 text-left">
              <li>• 容易失去耐心</li>
              <li>• 习惯教训孩子</li>
              <li>• 容易生气发火</li>
            </ul>
          </div>
          <div className="bg-green-500/20 backdrop-blur-sm rounded-xl p-4 border border-green-400/30">
            <div className="text-2xl mb-2">🌸</div>
            <h3 className="text-white font-medium text-sm mb-2">智慧型父母</h3>
            <ul className="text-xs text-white/70 space-y-1 text-left">
              <li>• 保持耐心</li>
              <li>• 倾听多于说教</li>
              <li>• 情绪稳定</li>
            </ul>
          </div>
        </div>

        {/* 说明 */}
        <p className="text-white/60 text-sm mb-8">
          6个育儿场景，测试你的父母类型<br/>
          选择智慧型回应，获得成长
        </p>

        {/* 开始按钮 */}
        <button
          onClick={onStart}
          className="bg-gradient-to-r from-rose-400 to-purple-400 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
        >
          开始测试
        </button>
      </div>
    </div>
  );
}

// 游戏页面
function GameScreen({
  level,
  onChoice,
  progress
}: {
  level: typeof parentLevels[0];
  onChoice: (choice: ParentChoice) => void;
  progress: number;
}) {
  const [selectedChoice, setSelectedChoice] = useState<ParentChoice | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelect = (choice: ParentChoice) => {
    if (selectedChoice) return;
    setSelectedChoice(choice);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (selectedChoice) {
      onChoice(selectedChoice);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 relative bg-gradient-to-b from-[#1a1625] via-[#2d2640] to-[#1a1625]">
      {/* 进度条 */}
      <div className="w-full bg-white/10 rounded-full h-2 mb-6">
        <div
          className="bg-gradient-to-r from-rose-400 to-purple-400 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 关卡标题 */}
      <div className="text-center mb-4">
        <span className="text-3xl mb-2 block">{level.emotionIcon}</span>
        <h2 className="text-lg font-bold text-white drop-shadow-lg">
          第{level.id}关 · {level.title}
        </h2>
      </div>

      {/* 场景描述 */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 mb-6 border border-white/20">
        <p className="text-white leading-relaxed text-sm">
          {level.scenario}
        </p>
      </div>

      {/* 选择卡片 */}
      <div className="space-y-3 mb-6 flex-1">
        {level.choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleSelect(choice)}
            disabled={!!selectedChoice}
            className={`w-full p-4 rounded-xl text-left transition-all ${
              selectedChoice
                ? choice.type === 'wise'
                  ? 'bg-green-500/30 border-2 border-green-400'
                  : choice === selectedChoice
                  ? 'bg-red-500/30 border-2 border-red-400'
                  : 'bg-white/5 border border-white/10 opacity-50'
                : 'bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/40'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className={`text-xl ${selectedChoice && choice.type === 'wise' ? 'animate-bounce' : ''}`}>
                {choice.type === 'wise' ? '🌸' : '💨'}
              </span>
              <p className="text-white text-sm flex-1">{choice.text}</p>
            </div>
          </button>
        ))}
      </div>

      {/* 反馈区域 */}
      {selectedChoice && showFeedback && (
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 mb-4 border border-white/20">
          <div className={`text-center mb-3 ${
            selectedChoice.type === 'wise' ? 'text-green-300' : 'text-amber-300'
          }`}>
            {selectedChoice.type === 'wise' ? (
              <span>✨ 智慧型回应！</span>
            ) : (
              <span>💭 情绪化回应</span>
            )}
          </div>
          <p className="text-white/80 text-sm leading-relaxed mb-3">
            <TypewriterText text={selectedChoice.feedback} speed={20} />
          </p>
          {selectedChoice.type === 'wise' && (
            <div className="bg-purple-500/20 rounded-lg p-3 border border-purple-400/30">
              <p className="text-purple-200 text-xs text-center">
                💡 {level.wiseInsight}
              </p>
            </div>
          )}
        </div>
      )}

      {/* 下一步按钮 */}
      {selectedChoice && (
        <button
          onClick={handleNext}
          className="w-full bg-gradient-to-r from-rose-400 to-purple-400 text-white py-3 rounded-xl font-medium shadow-lg"
        >
          继续下一步 →
        </button>
      )}
    </div>
  );
}

// 结果页面
function ResultScreen({
  score,
  choices,
  onRestart,
  onBack
}: {
  score: number;
  choices: { levelId: number; choiceType: 'emotional' | 'wise' }[];
  onRestart: () => void;
  onBack: () => void;
}) {
  const report = generateParentReport(score, choices);
  const [showInsights, setShowInsights] = useState(false);
  const [showTraits, setShowTraits] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowInsights(true), 500);
    const timer2 = setTimeout(() => setShowTraits(true), 1000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col p-4 relative overflow-y-auto bg-gradient-to-b from-[#1a1625] via-[#2d2640] to-[#1a1625]">
      {/* 返回按钮 */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 text-white/60 hover:text-white text-sm z-10"
      >
        ← 返回首页
      </button>

      {/* 标题 */}
      <div className="text-center pt-12 pb-4">
        <span className="text-5xl mb-3 block">{report.stage.icon}</span>
        <h1 className="text-xl font-bold text-white mb-2 drop-shadow-lg">
          你的父母类型报告
        </h1>
        <div className="text-3xl font-bold text-white/90">
          {report.stage.title}
        </div>
      </div>

      {/* 分数展示 */}
      <div className="flex justify-center mb-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
          <div className="text-4xl font-bold text-white mb-1">
            {report.score}/{report.total}
          </div>
          <div className="text-white/60 text-sm">智慧型回应</div>
          <div className="text-white/40 text-xs mt-1">{report.percentage}%</div>
        </div>
      </div>

      {/* 阶段说明 */}
      <div
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-4 border border-white/20 text-center"
        style={{ borderColor: report.stage.color + '40' }}
      >
        <p className="text-white/80 text-sm">{report.stage.description}</p>
      </div>

      {/* 洞察 */}
      {showInsights && (
        <div className="bg-purple-500/20 backdrop-blur-sm rounded-2xl p-4 mb-4 border border-purple-400/30">
          <h3 className="text-purple-200 font-medium text-sm mb-3">💡 你的洞察</h3>
          <ul className="space-y-2">
            {report.insights.map((insight, i) => (
              <li key={i} className="text-white/70 text-xs flex items-start gap-2">
                <span>•</span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 建议 */}
      {showTraits && (
        <div className="bg-green-500/20 backdrop-blur-sm rounded-2xl p-4 mb-4 border border-green-400/30">
          <h3 className="text-green-200 font-medium text-sm mb-3">🌱 成长建议</h3>
          <ul className="space-y-2">
            {report.suggestions.map((suggestion, i) => (
              <li key={i} className="text-white/70 text-xs flex items-start gap-2">
                <span>→</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 对比展示 */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        <div className="bg-red-500/10 backdrop-blur-sm rounded-xl p-3 border border-red-400/20">
          <div className="text-xs text-red-300 mb-1">情绪化回应</div>
          <div className="text-lg font-bold text-red-400">{report.emotionalCount}次</div>
        </div>
        <div className="bg-green-500/10 backdrop-blur-sm rounded-xl p-3 border border-green-400/20">
          <div className="text-xs text-green-300 mb-1">智慧型回应</div>
          <div className="text-lg font-bold text-green-400">{report.wiseCount}次</div>
        </div>
      </div>

      {/* 金句 */}
      <div className="bg-gradient-to-r from-rose-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-white/10">
        <p className="text-white/90 text-sm text-center italic leading-relaxed">
          "{parentInsights[score % parentInsights.length]}"
        </p>
      </div>

      {/* 按钮 */}
      <button
        onClick={onRestart}
        className="w-full bg-gradient-to-r from-rose-400 to-purple-400 text-white py-3 rounded-xl font-medium shadow-lg mb-3"
      >
        再测一次
      </button>
      <button
        onClick={onBack}
        className="w-full bg-white/10 text-white/80 py-3 rounded-xl font-medium border border-white/20"
      >
        返回游戏列表
      </button>
    </div>
  );
}

// 主游戏组件
export function ParentTypeGame({ onBack }: { onBack: () => void }) {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'result'>('start');
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [choices, setChoices] = useState<{ levelId: number; choiceType: 'emotional' | 'wise' }[]>([]);

  const handleStart = useCallback(() => {
    setGameState('playing');
    setCurrentLevel(0);
    setScore(0);
    setChoices([]);
  }, []);

  const handleChoice = useCallback((choice: ParentChoice) => {
    // 记录选择
    setChoices(prev => [...prev, {
      levelId: parentLevels[currentLevel].id,
      choiceType: choice.type
    }]);

    // 更新分数
    if (choice.type === 'wise') {
      setScore(prev => prev + 1);
    }

    // 进入下一关或结束
    if (currentLevel < parentLevels.length - 1) {
      setCurrentLevel(prev => prev + 1);
    } else {
      setGameState('result');
    }
  }, [currentLevel]);

  const handleRestart = useCallback(() => {
    handleStart();
  }, [handleStart]);

  if (gameState === 'start') {
    return <StartScreen onStart={handleStart} />;
  }

  if (gameState === 'playing') {
    const level = parentLevels[currentLevel];
    const progress = ((currentLevel + 1) / parentLevels.length) * 100;
    return <GameScreen level={level} onChoice={handleChoice} progress={progress} />;
  }

  if (gameState === 'result') {
    return (
      <ResultScreen
        score={score}
        choices={choices}
        onRestart={handleRestart}
        onBack={onBack}
      />
    );
  }

  return null;
}
