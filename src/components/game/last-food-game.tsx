"use client";

import { useState, useEffect, useCallback } from "react";
import {
  foodGameLevels,
  hiddenCards,
  awarenessLevels,
  growthStages,
  TOTAL_BASE_XP,
  finalInsight,
  gameQuote,
  type FoodChoice,
} from "@/lib/last-food-data";

interface Props {
  onBack: () => void;
}

export default function LastFoodGame({ onBack }: Props) {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [choices, setChoices] = useState<{ levelId: number; choice: FoodChoice }[]>([]);
  const [showReveal, setShowReveal] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<FoodChoice | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const currentLevel = foodGameLevels[currentLevelIndex];

  // 倒计时效果
  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleStartGame = useCallback(() => {
    setGameStarted(true);
    setCurrentLevelIndex(0);
    setTotalXP(0);
    setChoices([]);
    setShowReveal(false);
    setShowFeedback(false);
    setSelectedChoice(null);
    setShowResult(false);
  }, []);

  const handleChoice = useCallback((choice: FoodChoice) => {
    setSelectedChoice(choice);
    setShowFeedback(true);
    setTotalXP((prev) => prev + choice.xp);
    setChoices((prev) => [...prev, { levelId: currentLevel.id, choice }]);
  }, [currentLevel.id]);

  const handleNextLevel = useCallback(() => {
    setShowFeedback(false);
    setShowReveal(true);
    setSelectedChoice(null);
  }, []);

  const handleContinue = useCallback(() => {
    setShowReveal(false);
    if (currentLevelIndex < foodGameLevels.length - 1) {
      setCurrentLevelIndex((prev) => prev + 1);
      // 第一轮开始倒计时
      if (currentLevelIndex === 0) {
        setCountdown(10); // 简化版10秒倒计时
      }
    } else {
      setShowResult(true);
    }
  }, [currentLevelIndex]);

  const getGrowthStage = useCallback(() => {
    for (let i = growthStages.length - 1; i >= 0; i--) {
      if (totalXP >= growthStages[i].minXP) {
        return growthStages[i];
      }
    }
    return growthStages[0];
  }, [totalXP]);

  // 序章页面
  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-6 text-white">
        <div className="max-w-md w-full text-center space-y-8">
          {/* 标题 */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-amber-400">🍖 最后的食物</h1>
            <p className="text-gray-400">动物性觉察游戏</p>
          </div>

          {/* 游戏背景 */}
          <div className="bg-gray-800/50 rounded-xl p-6 space-y-4 border border-gray-700">
            <p className="text-lg text-gray-300">远古时代，冬天即将来临...</p>
            <p className="text-amber-300">食物极度匮乏</p>
            <div className="border-t border-gray-700 pt-4 space-y-2">
              <p className="text-2xl font-bold">全场 <span className="text-red-400">10</span> 个人</p>
              <p className="text-2xl font-bold">只有 <span className="text-amber-400">6</span> 份食物</p>
            </div>
            <div className="bg-red-900/30 rounded-lg p-4 border border-red-700">
              <p className="text-red-300 text-sm">
                ⚠️ 规则：获得食物的人生存。没有获得食物的人淘汰。
              </p>
            </div>
          </div>

          {/* 觉察层次预览 */}
          <div className="bg-gray-800/30 rounded-xl p-4 space-y-2">
            <p className="text-gray-400 text-sm">你将觉察到：</p>
            <div className="flex flex-wrap justify-center gap-2">
              {awarenessLevels.map((level) => (
                <span
                  key={level.level}
                  className="px-3 py-1 bg-gray-700/50 rounded-full text-xs text-gray-300"
                >
                  {level.icon} {level.level}
                </span>
              ))}
            </div>
          </div>

          {/* 开始按钮 */}
          <button
            onClick={handleStartGame}
            className="w-full py-4 bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 rounded-xl text-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-amber-900/30"
          >
            开始生存挑战
          </button>

          {/* 返回按钮 */}
          <button
            onClick={onBack}
            className="text-gray-500 hover:text-gray-300 text-sm"
          >
            ← 返回游戏列表
          </button>
        </div>
      </div>
    );
  }

  // 结果页面
  if (showResult) {
    const stage = getGrowthStage();
    const animalTypes = choices.map((c) => c.choice.animalType);
    const uniqueTypes = [...new Set(animalTypes)];

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/30 to-black flex flex-col items-center justify-center p-6 text-white">
        <div className="max-w-md w-full space-y-6">
          {/* 标题 */}
          <div className="text-center space-y-2">
            <p className="text-gray-400">觉察报告</p>
            <h2 className="text-3xl font-bold text-amber-400">你看见了哪个自己？</h2>
          </div>

          {/* XP 进度环 */}
          <div className="flex justify-center">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="#374151"
                  strokeWidth="8"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 70}
                  strokeDashoffset={2 * Math.PI * 70 * (1 - totalXP / TOTAL_BASE_XP)}
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-amber-400">{totalXP}</span>
                <span className="text-sm text-gray-400">/ {TOTAL_BASE_XP} XP</span>
              </div>
            </div>
          </div>

          {/* 成长阶段 */}
          <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-700">
            <p className="text-4xl mb-2">{stage.icon}</p>
            <p className="text-xl font-bold text-amber-300">{stage.stage}</p>
            <p className="text-gray-400 text-sm mt-1">{stage.description}</p>
          </div>

          {/* 觉察类型 */}
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <p className="text-gray-400 text-sm mb-3">你展现的类型：</p>
            <div className="flex flex-wrap gap-2">
              {uniqueTypes.map((type) => (
                <span
                  key={type}
                  className="px-3 py-1 bg-amber-900/30 border border-amber-700/50 rounded-full text-amber-300 text-sm"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          {/* 最终觉察 */}
          <div className="bg-gradient-to-r from-amber-900/30 to-red-900/30 rounded-xl p-5 border border-amber-700/30">
            <p className="text-gray-300 whitespace-pre-line text-sm leading-relaxed">
              {finalInsight}
            </p>
          </div>

          {/* 金句 */}
          <div className="text-center text-gray-400 italic text-sm">
            「{gameQuote}」
          </div>

          {/* 落款 */}
          <div className="text-center text-gray-500 text-sm pt-4 border-t border-gray-800">
            此刻花开 · 筱涵
          </div>

          {/* 按钮 */}
          <div className="flex gap-3">
            <button
              onClick={handleStartGame}
              className="flex-1 py-3 bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 rounded-xl font-bold transition-all"
            >
              重新开始
            </button>
            <button
              onClick={onBack}
              className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold transition-all"
            >
              返回列表
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 揭示页面
  if (showReveal) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-6 text-white">
        <div className="max-w-md w-full space-y-6">
          {/* 关卡标题 */}
          <div className="text-center space-y-2">
            <p className="text-amber-400">{currentLevel.round}</p>
            <h2 className="text-2xl font-bold">{currentLevel.title}</h2>
          </div>

          {/* 揭示内容 */}
          <div className="bg-gradient-to-r from-purple-900/30 to-amber-900/30 rounded-xl p-6 border border-purple-700/30">
            <p className="text-gray-200 whitespace-pre-line leading-relaxed">
              {currentLevel.reveal}
            </p>
          </div>

          {/* 继续按钮 */}
          <button
            onClick={handleContinue}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-500 hover:to-amber-500 rounded-xl font-bold transition-all"
          >
            {currentLevelIndex < foodGameLevels.length - 1 ? "继续下一轮" : "查看觉察报告"}
          </button>
        </div>
      </div>
    );
  }

  // 反馈页面
  if (showFeedback && selectedChoice) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-6 text-white">
        <div className="max-w-md w-full space-y-6">
          {/* 你的选择 */}
          <div className="text-center space-y-2">
            <p className="text-gray-400">你选择了</p>
            <p className="text-2xl font-bold text-amber-400">{selectedChoice.text}</p>
          </div>

          {/* 类型标签 */}
          <div className="flex justify-center">
            <span className="px-4 py-2 bg-amber-900/30 border border-amber-700/50 rounded-full text-amber-300">
              {selectedChoice.animalType}
            </span>
          </div>

          {/* 觉察内容 */}
          <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
            <p className="text-gray-300 leading-relaxed">{selectedChoice.insight}</p>
          </div>

          {/* XP奖励 */}
          <div className="text-center">
            <span className="text-2xl font-bold text-green-400">+{selectedChoice.xp} XP</span>
          </div>

          {/* 继续按钮 */}
          <button
            onClick={handleNextLevel}
            className="w-full py-4 bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 rounded-xl font-bold transition-all"
          >
            继续
          </button>
        </div>
      </div>
    );
  }

  // 游戏页面
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-6 text-white">
      <div className="max-w-md w-full space-y-6">
        {/* 关卡标题 */}
        <div className="text-center space-y-1">
          <p className="text-amber-400 text-sm">{currentLevel.round}</p>
          <h2 className="text-2xl font-bold">{currentLevel.title}</h2>
        </div>

        {/* 倒计时 */}
        {countdown !== null && countdown > 0 && (
          <div className="flex justify-center">
            <div className="bg-red-900/50 border border-red-700 rounded-xl px-6 py-3">
              <p className="text-red-400 text-sm">剩余时间</p>
              <p className="text-3xl font-bold text-red-300">{countdown}s</p>
            </div>
          </div>
        )}

        {/* 场景描述 */}
        <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700 space-y-4">
          <p className="text-gray-200 text-lg leading-relaxed">{currentLevel.scenario}</p>
          <p className="text-gray-400 text-sm">{currentLevel.context}</p>
        </div>

        {/* 选择按钮 */}
        <div className="space-y-3">
          {currentLevel.choices.map((choice) => (
            <button
              key={choice.id}
              onClick={() => handleChoice(choice)}
              className="w-full py-4 bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-amber-500/50 rounded-xl text-left px-5 transition-all group"
            >
              <span className="text-gray-200 group-hover:text-amber-300">{choice.text}</span>
            </button>
          ))}
        </div>

        {/* 返回按钮 */}
        <button
          onClick={onBack}
          className="w-full text-center text-gray-500 hover:text-gray-300 text-sm"
        >
          ← 返回游戏列表
        </button>
      </div>
    </div>
  );
}
