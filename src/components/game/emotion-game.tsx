'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { emotionLevels, generateEmotionReport, emotionInsights, EmotionChoice } from '@/lib/emotion-data';

type GameState = 'start' | 'playing' | 'feedback' | 'result';

interface ChoiceRecord {
  levelId: number;
  choiceIndex: number;
  isCorrect: boolean;
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

  const level = emotionLevels[currentLevel];

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
    
    setGameState('feedback');
  }, [selectedChoice, level]);

  // 下一关
  const handleNext = useCallback(() => {
    if (currentLevel < emotionLevels.length - 1) {
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
  if (!gameStarted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #f5e6d3 0%, #e8d4c4 50%, #d4c4b0 100%)'
        }}>
        
        <div className="text-center mb-8 relative z-10">
          <p className="text-sm text-amber-700 mb-2">此刻·花开</p>
          <h1 className="text-2xl font-bold text-amber-900 mb-4">
            父母的情绪，<br/>是理解孩子的地图
          </h1>
          <p className="text-amber-800 text-sm mb-2">
            孩子的行为，是他们内心的语言
          </p>
          <p className="text-amber-800 text-sm">
            父母的情绪，是理解他们的线索
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-sm w-full relative z-10">
          <h3 className="font-semibold text-amber-900 mb-3 text-center">💗 游戏内容</h3>
          <div className="space-y-2 text-sm text-amber-800">
            <p>• 5个情绪关卡，学习读懂孩子</p>
            <p>• 从父母的情绪出发，理解孩子需求</p>
            <p>• 学会"理解四步法"</p>
            <p>• 游戏结束生成专属觉察报告</p>
          </div>
        </div>

        <button
          onClick={handleStart}
          className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg transition-all hover:scale-105 relative z-10"
        >
          开始理解之旅 💗
        </button>

        {onBack && (
          <button
            onClick={onBack}
            className="mt-4 text-amber-700 hover:text-amber-900 text-sm relative z-10"
          >
            ← 返回游戏列表
          </button>
        )}
      </div>
    );
  }

  // 结果页面
  if (gameState === 'result') {
    const report = generateEmotionReport(totalPoints, choices);
    // 使用分数取模，避免渲染中使用随机数
    const insightIndex = totalPoints % emotionInsights.length;
    const selectedInsight = emotionInsights[insightIndex];
    
    return (
      <div className="min-h-screen p-6 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #f5e6d3 0%, #e8d4c4 50%, #d4c4b0 100%)'
        }}>
        
        <div className="max-w-md mx-auto">
          {/* 标题 */}
          <div className="text-center mb-6">
            <p className="text-amber-700 text-sm mb-2">此刻·花开</p>
            <h2 className="text-xl font-bold text-amber-900">你的情绪觉察报告</h2>
          </div>

          {/* 分数卡片 - 进度环 */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-4 text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-amber-200"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-amber-500"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray={`${report.percentage}, 100`}
                  strokeLinecap="round"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-3xl font-bold text-amber-700">{report.score}/{report.total}</div>
                <div className="text-amber-600 text-xs">{report.percentage}%</div>
              </div>
            </div>
            <div className="text-3xl mb-2">{report.stage.icon}</div>
            <div className="text-lg font-semibold text-amber-900">
              {report.stage.title}
            </div>
            <div className="text-amber-700 text-sm mt-1">{report.stage.description}</div>
          </div>

          {/* 觉察时刻 */}
          {report.insights.length > 0 && (
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 mb-4">
              <h3 className="font-semibold text-amber-900 mb-3">✨ 你的觉察时刻</h3>
              <div className="space-y-2">
                {report.insights.map((insight, index) => (
                  <p key={index} className="text-sm text-amber-800">• {insight}</p>
                ))}
              </div>
            </div>
          )}

          {/* 核心洞察 */}
          <div className="bg-amber-100/80 rounded-xl p-4 mb-4">
            <p className="text-amber-900 text-sm leading-relaxed">
              情绪没有对错，每一种情绪背后，都是孩子在用自己的方式表达需求和感受。
            </p>
          </div>

          {/* 成长建议 */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 mb-4">
            <h3 className="font-semibold text-amber-900 mb-3">💡 成长建议</h3>
            <div className="space-y-2">
              {report.suggestions.map((suggestion, index) => (
                <p key={index} className="text-sm text-amber-800">{suggestion}</p>
              ))}
            </div>
          </div>

          {/* 觉察金句 */}
          <div className="bg-amber-50/80 rounded-xl p-4 mb-6 text-center">
            <p className="text-amber-700 text-sm italic">
              "{selectedInsight}"
            </p>
          </div>

          {/* 按钮 */}
          <div className="flex gap-3">
            <button
              onClick={handleRestart}
              className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-full font-semibold transition-all"
            >
              重新开始
            </button>
            {onBack && (
              <button
                onClick={onBack}
                className="flex-1 bg-white/60 hover:bg-white/80 text-amber-800 py-3 rounded-full font-semibold transition-all"
              >
                返回列表
              </button>
            )}
          </div>
          
          {/* 落款 */}
          <div className="text-center mt-6 text-amber-700/50 text-xs">
            此刻花开 · 筱涵
          </div>
        </div>
      </div>
    );
  }

  // 游戏页面
  return (
    <div className="min-h-screen p-4 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #f5e6d3 0%, #e8d4c4 50%, #d4c4b0 100%)'
      }}>
      
      <div className="max-w-md mx-auto">
        {/* 进度 */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-amber-700 text-sm">
            关卡 {currentLevel + 1}/{emotionLevels.length}
          </span>
          <span className="text-amber-700 text-sm">
            {level.level}
          </span>
        </div>
        
        {/* 进度条 */}
        <div className="h-2 bg-amber-200 rounded-full mb-6 overflow-hidden">
          <div 
            className="h-full bg-amber-500 rounded-full transition-all duration-500"
            style={{ width: `${((currentLevel + 1) / emotionLevels.length) * 100}%` }}
          />
        </div>

        {/* 情绪标识 */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{level.emotionIcon}</span>
            <h2 className="font-bold text-amber-900">{level.title}</h2>
          </div>
          <p className="text-amber-700 text-sm">你的感受：{level.parentFeeling}</p>
        </div>

        {/* 场景描述 */}
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 mb-4">
          <p className="text-amber-900 leading-relaxed">{level.scenario}</p>
        </div>

        {/* 选择或反馈 */}
        {gameState === 'playing' && (
          <div className="space-y-3">
            <p className="text-amber-800 text-sm font-medium text-center mb-2">
              你觉得孩子想要表达什么？
            </p>
            {level.choices.map((choice: EmotionChoice, index: number) => (
              <button
                key={index}
                onClick={() => handleChoice(index)}
                className="w-full bg-white/70 hover:bg-white/90 backdrop-blur-sm text-amber-900 p-4 rounded-xl text-left transition-all hover:shadow-md"
              >
                {choice.text}
              </button>
            ))}
          </div>
        )}

        {gameState === 'feedback' && selectedChoice !== null && (
          <div className="space-y-4">
            {/* 反馈 */}
            <div className={`rounded-xl p-4 ${
              level.choices[selectedChoice].isCorrect 
                ? 'bg-green-100/80' 
                : 'bg-orange-100/80'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">
                  {level.choices[selectedChoice].isCorrect ? '✅' : '💡'}
                </span>
                <span className="font-semibold text-amber-900">
                  {level.choices[selectedChoice].isCorrect ? '理解正确！' : '换个角度看看'}
                </span>
              </div>
              <p className="text-amber-800 text-sm">
                {level.choices[selectedChoice].feedback}
              </p>
            </div>

            {/* 正确理解 */}
            {level.choices[selectedChoice].isCorrect && (
              <div className="bg-amber-50/80 rounded-xl p-4">
                <h4 className="font-semibold text-amber-900 mb-2">孩子的真实需求：</h4>
                <p className="text-amber-800 text-sm mb-2">
                  {level.childNeedIcon} {level.childNeed}
                </p>
                <p className="text-amber-700 text-sm italic">
                  "{level.childInnerVoice}"
                </p>
              </div>
            )}

            {/* 应对方法 */}
            <div className="bg-white/60 rounded-xl p-4">
              <h4 className="font-semibold text-amber-900 mb-2">你可以这样做：</h4>
              <p className="text-amber-800 text-sm">{level.parentAction}</p>
            </div>

            {/* 觉察金句 */}
            <div className="text-center py-2">
              <p className="text-amber-600 text-xs italic">
                {level.insight}
              </p>
            </div>

            {/* 继续按钮 */}
            <button
              onClick={handleNext}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-full font-semibold transition-all"
            >
              {currentLevel < emotionLevels.length - 1 ? '继续理解之旅 →' : '查看觉察报告'}
            </button>
          </div>
        )}

        {/* 返回按钮 */}
        {onBack && gameState === 'playing' && (
          <button
            onClick={onBack}
            className="w-full mt-4 text-amber-600 hover:text-amber-800 text-sm"
          >
            ← 返回游戏列表
          </button>
        )}
      </div>
    </div>
  );
}

export default EmotionGame;
