'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { listenLevels, generateListenReport, ListenLevel, ListenChoice } from '@/lib/listen-data';

type GameState = 'start' | 'playing' | 'result';

// 打字机效果组件
function TypewriterText({ text, speed = 30 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState('');
  
  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  
  return (
    <span>
      {displayed}
      {displayed.length < text.length && <span className="animate-pulse">|</span>}
    </span>
  );
}

// 开始页面
function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative">
      {/* 背景图 */}
      <div className="absolute inset-0">
        <Image
          src="/assets/封面.png"
          alt="倾听孩子"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
      </div>
      
      {/* 内容 */}
      <div className="relative z-10 text-center max-w-md">
        <div className="text-6xl mb-4">👂</div>
        <h1 className="text-3xl font-bold text-white mb-3">倾听孩子</h1>
        <p className="text-lg text-white/90 mb-2">90%的时间，只是倾听</p>
        <p className="text-sm text-white/70 mb-8">
          真正的倾听，不是解决问题<br />
          而是让孩子感觉："我被听见了。"
        </p>
        
        <button
          onClick={onStart}
          className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white text-lg rounded-full hover:bg-white/30 transition-all hover:scale-105 border border-white/30"
        >
          开始倾听之旅
        </button>
        
        <p className="text-xs text-white/50 mt-8">
          💜 每一个被倾听的孩子，都会更有力量地长大
        </p>
      </div>
    </div>
  );
}

// 游戏页面
function GameScreen({
  level,
  onChoice,
  totalPoints,
  progress
}: {
  level: ListenLevel;
  onChoice: (choice: ListenChoice) => void;
  totalPoints: number;
  progress: number;
}) {
  const [selectedChoice, setSelectedChoice] = useState<ListenChoice | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  
  const handleSelect = (choice: ListenChoice) => {
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
    <div className="min-h-screen flex flex-col relative">
      {/* 背景 */}
      <div className="absolute inset-0">
        <Image
          src="/assets/内页.png"
          alt="场景"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
      </div>
      
      {/* 进度条 */}
      <div className="relative z-10 p-4">
        <div className="flex items-center gap-3 text-white/80 text-sm">
          <span>{progress} / {listenLevels.length}</span>
          <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-400 transition-all duration-500 rounded-full"
              style={{ width: `${(progress / listenLevels.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
      
      {/* 主内容 */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 py-4">
        <div className="max-w-md mx-auto w-full">
          {/* 关卡标题 */}
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">{level.icon}</div>
            <h2 className="text-xl font-bold text-white mb-1">{level.title}</h2>
            <p className="text-sm text-white/70">{level.subtitle}</p>
          </div>
          
          {/* 场景描述 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 mb-6 border border-white/20">
            <p className="text-white/90 text-sm leading-relaxed">
              <TypewriterText text={level.scene} />
            </p>
          </div>
          
          {/* 问题 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 mb-6 border border-white/20">
            <p className="text-white font-medium">{level.scenario}</p>
          </div>
          
          {/* 选择按钮或反馈 */}
          {!selectedChoice ? (
            <div className="space-y-3">
              {level.choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(choice)}
                  className="w-full text-left px-5 py-4 bg-white/15 backdrop-blur-sm rounded-xl text-white hover:bg-white/25 transition-all border border-white/20 hover:border-white/40"
                >
                  {choice.text}
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {/* 反馈 */}
              <div className={`p-5 rounded-xl ${selectedChoice.isAwakening ? 'bg-green-500/20 border border-green-400/40' : 'bg-orange-500/20 border border-orange-400/40'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{selectedChoice.isAwakening ? '✨' : '💫'}</span>
                  <span className={`font-medium ${selectedChoice.isAwakening ? 'text-green-300' : 'text-orange-300'}`}>
                    {selectedChoice.isAwakening ? '倾听时刻' : '觉察提示'}
                  </span>
                </div>
                <p className="text-white/90 text-sm leading-relaxed">
                  <TypewriterText text={selectedChoice.feedback} speed={25} />
                </p>
              </div>
              
              {/* 觉察洞察 */}
              {selectedChoice.isAwakening && (
                <div className="p-4 bg-purple-500/20 rounded-xl border border-purple-400/30">
                  <p className="text-purple-200 text-sm italic">
                    💜 {level.insight}
                  </p>
                </div>
              )}
              
              {/* 继续按钮 */}
              <button
                onClick={handleNext}
                className="w-full py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all border border-white/30"
              >
                {progress < listenLevels.length ? '继续倾听' : '查看倾听报告'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 结果页面
function ResultScreen({
  score,
  maxScore,
  report,
  onRestart
}: {
  score: number;
  maxScore: number;
  report: ReturnType<typeof generateListenReport>;
  onRestart: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* 背景 */}
      <div className="absolute inset-0">
        <Image
          src="/assets/星空版.png"
          alt="倾听报告"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
      </div>
      
      {/* 内容 */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="max-w-md w-full text-center">
          {/* 分数 */}
          <div className="mb-6">
            <div className="text-6xl mb-2">{report.stage.icon}</div>
            <h2 className="text-2xl font-bold text-white mb-2">倾听报告</h2>
            <div className="text-5xl font-bold text-white mb-2">
              {score} <span className="text-2xl text-white/60">/ {maxScore}</span>
            </div>
            <p className="text-lg text-white/80">{report.stage.title}</p>
          </div>
          
          {/* 阶段描述 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 mb-4 border border-white/20">
            <p className="text-white/90">{report.stage.description}</p>
          </div>
          
          {/* 倾听洞察 */}
          <div className="bg-purple-500/20 backdrop-blur-sm rounded-2xl p-5 mb-4 border border-purple-400/30">
            <p className="text-purple-200 italic">
              💜 {report.insight}
            </p>
          </div>
          
          {/* 倾听建议 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 mb-6 border border-white/20">
            <h3 className="text-white font-medium mb-3">倾听练习建议</h3>
            <ul className="text-left text-white/80 text-sm space-y-2">
              {report.suggestions.map((s, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-purple-300">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* 重新开始 */}
          <button
            onClick={onRestart}
            className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all border border-white/30"
          >
            重新开始
          </button>
          
          <p className="text-xs text-white/50 mt-6">
            每一次被倾听，都是孩子内心长出力量的时刻。💜
          </p>
        </div>
      </div>
    </div>
  );
}

// 主组件
export function ListenGame() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [choices, setChoices] = useState<{ levelId: number; choiceIndex: number; isAwakening: boolean }[]>([]);
  const [report, setReport] = useState<ReturnType<typeof generateListenReport> | null>(null);
  
  const handleStart = useCallback(() => {
    setGameState('playing');
  }, []);
  
  const handleChoice = useCallback((choice: ListenChoice) => {
    const level = listenLevels[currentLevelIndex];
    const choiceIndex = level.choices.indexOf(choice);
    
    setChoices(prev => [...prev, { levelId: level.id, choiceIndex, isAwakening: choice.isAwakening }]);
    
    if (choice.isAwakening) {
      setTotalPoints(prev => prev + 1);
    }
    
    // 延迟切换到下一关或结果
    setTimeout(() => {
      if (currentLevelIndex < listenLevels.length - 1) {
        setCurrentLevelIndex(prev => prev + 1);
      } else {
        const newReport = generateListenReport(
          totalPoints + (choice.isAwakening ? 1 : 0),
          [...choices, { levelId: level.id, choiceIndex, isAwakening: choice.isAwakening }]
        );
        setReport(newReport);
        setGameState('result');
      }
    }, 100);
  }, [currentLevelIndex, totalPoints, choices]);
  
  const handleRestart = useCallback(() => {
    setGameState('start');
    setCurrentLevelIndex(0);
    setTotalPoints(0);
    setChoices([]);
    setReport(null);
  }, []);
  
  if (gameState === 'start') {
    return <StartScreen onStart={handleStart} />;
  }
  
  if (gameState === 'result' && report) {
    return (
      <ResultScreen
        score={totalPoints}
        maxScore={listenLevels.length}
        report={report}
        onRestart={handleRestart}
      />
    );
  }
  
  const currentLevel = listenLevels[currentLevelIndex];
  if (!currentLevel) return null;
  
  return (
    <GameScreen
      level={currentLevel}
      onChoice={handleChoice}
      totalPoints={totalPoints}
      progress={currentLevelIndex + 1}
    />
  );
}
