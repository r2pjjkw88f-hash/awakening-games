'use client';

import { useState, useCallback } from 'react';
import { sosLevels, SOSLevel, SOSChoice, generateSOSReport, severityConfig } from '@/lib/sos-data';

type GameState = 'start' | 'playing' | 'feedback' | 'result';

export function SOSGame({ onBack }: { onBack: () => void }) {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [gameState, setGameState] = useState<GameState>('start');
  const [selectedChoice, setSelectedChoice] = useState<SOSChoice | null>(null);
  const [choices, setChoices] = useState<{ levelId: number; choiceIndex: number; isCorrect: boolean }[]>([]);

  const level = sosLevels[currentLevel];
  const isLastLevel = currentLevel === sosLevels.length - 1;

  const handleStart = useCallback(() => {
    setGameStarted(true);
    setGameState('playing');
    setCurrentLevel(0);
    setTotalPoints(0);
    setChoices([]);
    setSelectedChoice(null);
  }, []);

  const handleChoice = useCallback((choice: SOSChoice, index: number) => {
    setSelectedChoice(choice);
    setChoices(prev => [...prev, { levelId: level.id, choiceIndex: index, isCorrect: choice.isCorrect }]);
    if (choice.isCorrect) {
      setTotalPoints(prev => prev + 1);
    }
    setGameState('feedback');
  }, [level.id]);

  const handleNext = useCallback(() => {
    if (isLastLevel) {
      setGameState('result');
    } else {
      setCurrentLevel(prev => prev + 1);
      setSelectedChoice(null);
      setGameState('playing');
    }
  }, [isLastLevel]);

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
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🚨</div>
            <h1 className="text-2xl font-bold text-white mb-4">求救信号识别</h1>
            <p className="text-purple-200 text-sm mb-2">父母的感受 = 孩子的求救信号</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
            <p className="text-white/90 text-sm leading-relaxed mb-4">
              很多父母，只看见了孩子最后的爆发，却没有看见：孩子曾经无数次轻声求救。
            </p>
            <p className="text-purple-200 text-sm">
              💜 孩子的行为，其实正在传递信息。<br/>
              父母的情绪，是理解孩子的地图。
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-4 mb-6">
            <p className="text-white/70 text-xs text-center">
              共 {sosLevels.length} 个场景 · 识别孩子的求救信号
            </p>
          </div>

          <button
            onClick={handleStart}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium text-lg hover:from-purple-600 hover:to-pink-600 transition-all active:scale-95"
          >
            开始识别之旅
          </button>

          <button
            onClick={onBack}
            className="w-full mt-4 py-3 text-white/60 text-sm hover:text-white transition-colors"
          >
            返回游戏列表
          </button>
        </div>
      </div>
    );
  }

  // 结果页面
  if (gameState === 'result') {
    const report = generateSOSReport(totalPoints, sosLevels.length, choices);
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-slate-900 p-4">
        <div className="max-w-md mx-auto pt-8">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">💜</div>
            <h2 className="text-xl font-bold text-white mb-2">觉察报告</h2>
          </div>

          {/* 分数卡片 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 text-center">
            <p className="text-white/60 text-sm mb-2">你的觉察分数</p>
            <div className="text-5xl font-bold text-white mb-2">
              {report.score} <span className="text-2xl text-white/60">/ {report.maxScore}</span>
            </div>
            <p className="text-purple-300 text-lg">{report.awarenessLevel}</p>
          </div>

          {/* 觉察洞察 */}
          <div className="bg-white/5 rounded-xl p-5 mb-4">
            <h3 className="text-white font-medium mb-3">💡 觉察洞察</h3>
            <p className="text-white/80 text-sm leading-relaxed">{report.summary}</p>
          </div>

          {/* 核心理解 */}
          <div className="bg-white/5 rounded-xl p-5 mb-4">
            <h3 className="text-white font-medium mb-3">💜 请记住</h3>
            <ul className="space-y-2">
              {report.insights.map((insight, i) => (
                <li key={i} className="text-white/70 text-sm flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 建议 */}
          <div className="bg-white/5 rounded-xl p-5 mb-6">
            <h3 className="text-white font-medium mb-3">🌱 每日练习</h3>
            <ul className="space-y-2">
              {report.suggestions.map((s, i) => (
                <li key={i} className="text-white/70 text-sm flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleRestart}
              className="flex-1 py-3 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-colors"
            >
              重新开始
            </button>
            <button
              onClick={onBack}
              className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              返回列表
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 游戏进行中 / 反馈
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-slate-900 p-4">
      <div className="max-w-md mx-auto">
        {/* 进度条 */}
        <div className="mb-6 pt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/60 text-xs">第 {currentLevel + 1} / {sosLevels.length} 关</span>
            <span className="text-purple-300 text-xs">{level.title}</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
              style={{ width: `${((currentLevel + 1) / sosLevels.length) * 100}%` }}
            />
          </div>
        </div>

        {/* 受挫程度标签 */}
        <div className="flex justify-center mb-4">
          <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 ${severityConfig[level.severity].color}`}>
            <span>{level.severityEmoji}</span>
            <span className="text-sm">{level.severityLabel}</span>
          </div>
        </div>

        {/* 场景卡片 */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 mb-4">
          <h3 className="text-white font-medium mb-3">📖 场景</h3>
          <p className="text-white/90 text-sm leading-relaxed">{level.scenario}</p>
        </div>

        {/* 选择反馈 */}
        {gameState === 'feedback' && selectedChoice && (
          <div className={`rounded-xl p-4 mb-4 ${selectedChoice.isCorrect ? 'bg-green-500/20 border border-green-500/30' : 'bg-orange-500/20 border border-orange-500/30'}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{selectedChoice.isCorrect ? '✅' : '💡'}</span>
              <span className={`font-medium ${selectedChoice.isCorrect ? 'text-green-300' : 'text-orange-300'}`}>
                {selectedChoice.isCorrect ? '觉察正确！' : '可以有不同的选择'}
              </span>
            </div>
            <p className="text-white/80 text-sm">{selectedChoice.feedback}</p>
            
            {selectedChoice.isCorrect && (
              <div className="mt-3 pt-3 border-t border-white/10">
                <p className="text-purple-300 text-xs mb-1">孩子的心声：</p>
                <p className="text-white/90 text-sm italic">"{level.childMessage}"</p>
              </div>
            )}
          </div>
        )}

        {/* 选项 */}
        {gameState === 'playing' && (
          <div className="space-y-3 mb-4">
            {level.choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => handleChoice(choice, index)}
                className="w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/50 rounded-xl text-left transition-all active:scale-98"
              >
                <p className="text-white/90 text-sm">{choice.text}</p>
              </button>
            ))}
          </div>
        )}

        {/* 继续按钮 */}
        {gameState === 'feedback' && (
          <button
            onClick={handleNext}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all active:scale-95"
          >
            {isLastLevel ? '查看觉察报告' : '下一关'}
          </button>
        )}

        {/* 底部提示 */}
        <div className="mt-6 text-center">
          <p className="text-white/40 text-xs">
            💜 父母的目标，不是改变孩子的行为，而是理解行为背后的需求
          </p>
        </div>
      </div>
    </div>
  );
}
