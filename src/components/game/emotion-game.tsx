'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { emotionMapLevels, fourSteps, coreBelief, closingMessage, EmotionMapLevel } from '@/lib/emotion-map-data';

type GameState = 'start' | 'playing' | 'feedback' | 'result';

interface ChoiceRecord {
  levelId: number;
  choiceIndex: number;
  isCorrect: boolean;
}

// 进度环组件
function ProgressRing({ progress, size = 120, strokeWidth = 8 }: { progress: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;
  
  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="rgba(255,255,255,0.2)"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="url(#progressGradient)"
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-1000 ease-out"
      />
      <defs>
        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8b4b8" />
          <stop offset="100%" stopColor="#c9b8d4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function EmotionGame({ onBack }: { onBack?: () => void }) {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [gameState, setGameState] = useState<GameState>('start');
  const [totalPoints, setTotalPoints] = useState(0);
  const [choices, setChoices] = useState<ChoiceRecord[]>([]);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typewriterRef = useRef<NodeJS.Timeout | null>(null);

  const level = emotionMapLevels[currentLevel];

  // 打字机效果
  const startTypewriter = useCallback((text: string) => {
    setDisplayedText('');
    setIsTyping(true);
    let index = 0;
    
    if (typewriterRef.current) {
      clearInterval(typewriterRef.current);
    }
    
    typewriterRef.current = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        if (typewriterRef.current) {
          clearInterval(typewriterRef.current);
        }
      }
    }, 30);
  }, []);

  useEffect(() => {
    return () => {
      if (typewriterRef.current) {
        clearInterval(typewriterRef.current);
      }
    };
  }, []);

  // 开始游戏
  const handleStart = useCallback(() => {
    setGameStarted(true);
    setGameState('playing');
    setCurrentLevel(0);
    setTotalPoints(0);
    setChoices([]);
    setSelectedChoice(null);
  }, []);

  // 选择答案
  const handleChoice = useCallback((choiceIndex: number) => {
    if (selectedChoice !== null) return;
    
    setSelectedChoice(choiceIndex);
    const choice = level.choices[choiceIndex];
    
    const record: ChoiceRecord = {
      levelId: level.id,
      choiceIndex,
      isCorrect: choice.isCorrect
    };
    
    setChoices(prev => [...prev, record]);
    
    if (choice.isCorrect) {
      setTotalPoints(prev => prev + 1);
    }
    
    startTypewriter(choice.feedback);
    setGameState('feedback');
  }, [selectedChoice, level, startTypewriter]);

  // 下一关
  const handleNext = useCallback(() => {
    if (currentLevel < emotionMapLevels.length - 1) {
      setCurrentLevel(prev => prev + 1);
      setSelectedChoice(null);
      setGameState('playing');
    } else {
      setGameState('result');
    }
  }, [currentLevel]);

  // 重新开始
  const handleRestart = useCallback(() => {
    setGameStarted(false);
    setGameState('start');
    setCurrentLevel(0);
    setTotalPoints(0);
    setChoices([]);
    setSelectedChoice(null);
  }, []);

  // 开始页面
  if (!gameStarted || gameState === 'start') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a1625] via-[#2d2640] to-[#1a1625] text-white flex flex-col items-center justify-center p-6">
        {/* 返回按钮 */}
        {onBack && (
          <button
            onClick={onBack}
            className="absolute top-4 left-4 flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回
          </button>
        )}
        
        <div className="max-w-md w-full text-center space-y-6">
          <div className="text-4xl mb-2">🗺️</div>
          <h1 className="text-2xl font-bold text-[#e8b4b8]">父母的情绪</h1>
          <h2 className="text-xl text-[#c9b8d4]">是理解孩子的地图</h2>
          
          <p className="text-white/80 text-sm leading-relaxed">
            孩子的行为，是他们内心的语言<br/>
            父母的情绪，是理解他们的线索
          </p>

          {/* 理解的四步法 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 space-y-3 mt-6">
            <h3 className="text-[#e8b4b8] font-medium">💡 理解的四步法</h3>
            {fourSteps.map((step) => (
              <div key={step.step} className="flex items-start gap-3 text-left">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#e8b4b8]/20 flex items-center justify-center text-xs text-[#e8b4b8]">
                  {step.step}
                </span>
                <div>
                  <p className="text-white/90 text-sm font-medium">{step.title}</p>
                  <p className="text-white/60 text-xs">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-white/60 text-xs mt-4">
            读懂情绪背后的信号，才能看见孩子真正的需要
          </p>

          <button
            onClick={handleStart}
            className="w-full py-3 bg-gradient-to-r from-[#e8b4b8] to-[#c9b8d4] text-[#1a1625] font-medium rounded-full hover:opacity-90 transition-opacity mt-6"
          >
            开始觉察之旅
          </button>
        </div>
      </div>
    );
  }

  // 结果页面
  if (gameState === 'result') {
    const totalLevels = emotionMapLevels.length;
    const percentage = Math.round((totalPoints / totalLevels) * 100);
    
    let stage = '';
    let stageColor = '';
    let advice = '';
    
    if (percentage >= 80) {
      stage = '深度觉察者';
      stageColor = 'text-[#e8b4b8]';
      advice = '你已经能够敏锐地捕捉情绪背后的信号，继续用这份觉察力滋养亲子关系。';
    } else if (percentage >= 60) {
      stage = '成长中的父母';
      stageColor = 'text-[#c9b8d4]';
      advice = '你正在学会读懂情绪这张地图，多练习会越来越熟练。';
    } else if (percentage >= 40) {
      stage = '探索者';
      stageColor = 'text-amber-300';
      advice = '觉察的大门已经打开，继续学习看见孩子行为背后的需求。';
    } else {
      stage = '初学者';
      stageColor = 'text-white/70';
      advice = '每个父母都是从这里开始的，慢慢来，觉察力是可以培养的。';
    }

    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a1625] via-[#2d2640] to-[#1a1625] text-white flex flex-col items-center justify-center p-6">
        {onBack && (
          <button
            onClick={onBack}
            className="absolute top-4 left-4 flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回
          </button>
        )}

        <div className="max-w-md w-full text-center space-y-6">
          <h1 className="text-2xl font-bold text-[#e8b4b8]">觉察报告</h1>
          
          {/* 分数展示 */}
          <div className="relative flex items-center justify-center">
            <ProgressRing progress={percentage} size={140} strokeWidth={10} />
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-bold text-white">{totalPoints}</span>
              <span className="text-white/60 text-sm">/ {totalLevels}</span>
              <span className="text-[#e8b4b8] text-xs mt-1">{percentage}%</span>
            </div>
          </div>

          <p className={`text-lg font-medium ${stageColor}`}>{stage}</p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 space-y-3">
            <p className="text-white/80 text-sm leading-relaxed">{advice}</p>
          </div>

          {/* 核心信念 */}
          <div className="bg-white/5 rounded-xl p-4 mt-4">
            <p className="text-white/70 text-sm italic">
              "{coreBelief}"
            </p>
          </div>

          {/* 结尾语 */}
          <p className="text-white/60 text-xs mt-4">
            {closingMessage}
          </p>

          {/* 落款 */}
          <p className="text-white/40 text-xs mt-6">
            此刻花开 · 筱涵
          </p>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleRestart}
              className="flex-1 py-3 border border-white/30 text-white rounded-full hover:bg-white/10 transition-colors"
            >
              重新开始
            </button>
            {onBack && (
              <button
                onClick={onBack}
                className="flex-1 py-3 bg-gradient-to-r from-[#e8b4b8] to-[#c9b8d4] text-[#1a1625] font-medium rounded-full hover:opacity-90 transition-opacity"
              >
                返回首页
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 反馈页面
  if (gameState === 'feedback') {
    const choice = level.choices[selectedChoice!];
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a1625] via-[#2d2640] to-[#1a1625] text-white flex flex-col p-6">
        {onBack && (
          <button
            onClick={onBack}
            className="absolute top-4 left-4 flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回
          </button>
        )}

        <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full space-y-6">
          {/* 进度 */}
          <div className="text-white/50 text-sm">
            {currentLevel + 1} / {emotionMapLevels.length}
          </div>

          {/* 结果图标 */}
          <div className={`text-6xl ${choice.isCorrect ? '' : 'opacity-70'}`}>
            {choice.isCorrect ? '✨' : '💭'}
          </div>

          {/* 反馈文字 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 w-full">
            <p className="text-white/90 text-center leading-relaxed">
              {displayedText}
              {isTyping && <span className="animate-pulse">|</span>}
            </p>
          </div>

          {/* 正确答案展示 */}
          {choice.isCorrect && (
            <div className="w-full space-y-3">
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[#e8b4b8] text-xs mb-1">孩子内心在说</p>
                <p className="text-white/80 text-sm">"{level.childInnerVoice}"</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-[#c9b8d4] text-xs mb-1">孩子的真正需求</p>
                <p className="text-white/80 text-sm">{level.childNeedIcon} {level.childNeed}</p>
              </div>
            </div>
          )}

          {/* 下一关按钮 */}
          <button
            onClick={handleNext}
            className="w-full py-3 bg-gradient-to-r from-[#e8b4b8] to-[#c9b8d4] text-[#1a1625] font-medium rounded-full hover:opacity-90 transition-opacity mt-4"
          >
            {currentLevel < emotionMapLevels.length - 1 ? '继续觉察' : '查看报告'}
          </button>
        </div>
      </div>
    );
  }

  // 游戏页面
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1625] via-[#2d2640] to-[#1a1625] text-white flex flex-col p-6">
      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-4 left-4 flex items-center gap-2 text-white/70 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回
        </button>
      )}

      {/* 进度条 */}
      <div className="mt-12 mb-4">
        <div className="flex justify-between text-white/50 text-xs mb-2">
          <span>第 {currentLevel + 1} 关</span>
          <span>{emotionMapLevels.length} 关</span>
        </div>
        <div className="h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#e8b4b8] to-[#c9b8d4] transition-all duration-300"
            style={{ width: `${((currentLevel + 1) / emotionMapLevels.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col max-w-md mx-auto w-full">
        {/* 情绪标签 */}
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
            <span className="text-2xl">{level.emotionIcon}</span>
            <span className="text-white font-medium">当你感到{level.emotion}</span>
          </span>
        </div>

        {/* 场景描述 */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 mb-4">
          <p className="text-white/90 text-sm leading-relaxed">{level.scenario}</p>
        </div>

        {/* 孩子行为提示 */}
        <div className="bg-white/5 rounded-lg p-3 mb-4">
          <p className="text-[#e8b4b8] text-xs mb-2">孩子可能的行为表现：</p>
          <div className="flex flex-wrap gap-2">
            {level.childBehaviors.map((behavior, idx) => (
              <span key={idx} className="text-xs text-white/70 bg-white/10 px-2 py-1 rounded">
                {behavior}
              </span>
            ))}
          </div>
        </div>

        {/* 选择题 */}
        <div className="space-y-3 mt-2">
          <p className="text-white/70 text-sm text-center">孩子的行为在告诉你什么？</p>
          {level.choices.map((choice, idx) => (
            <button
              key={idx}
              onClick={() => handleChoice(idx)}
              disabled={selectedChoice !== null}
              className={`w-full p-3 text-left rounded-xl transition-all ${
                selectedChoice === null
                  ? 'bg-white/10 hover:bg-white/20 border border-white/20'
                  : selectedChoice === idx
                  ? choice.isCorrect
                    ? 'bg-[#e8b4b8]/20 border-2 border-[#e8b4b8]'
                    : 'bg-red-500/20 border-2 border-red-400'
                  : 'bg-white/5 opacity-50'
              }`}
            >
              <p className="text-white/90 text-sm">{choice.text}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
