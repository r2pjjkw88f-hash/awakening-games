"use client";

import { useState, useEffect } from "react";
import { belongingLevels, TOTAL_BASE_XP, growthStages, finalRewards } from "@/lib/belonging-game-data";
import type { BelongingLevel } from "@/lib/belonging-game-data";

interface Props {
  onBack: () => void;
}

export default function BelongingGame({ onBack }: Props) {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [hiddenXP, setHiddenXP] = useState(0);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [hiddenCompleted, setHiddenCompleted] = useState<number[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [showHiddenTask, setShowHiddenTask] = useState(false);
  const [levelComplete, setLevelComplete] = useState(false);

  const level = belongingLevels[currentLevel];
  const progress = ((currentLevel) / belongingLevels.length) * 100;

  // 获取当前成长阶段
  const getGrowthStage = (xp: number) => {
    for (let i = growthStages.length - 1; i >= 0; i--) {
      if (xp >= growthStages[i].minXP) {
        return growthStages[i];
      }
    }
    return growthStages[0];
  };

  // 完成当前关卡
  const completeLevel = (didHidden: boolean) => {
    const newXP = totalXP + level.baseXP;
    setTotalXP(newXP);
    setCompletedLevels([...completedLevels, level.id]);

    if (didHidden) {
      setHiddenXP(hiddenXP + level.hiddenTask.bonusXP);
      setHiddenCompleted([...hiddenCompleted, level.id]);
    }

    setLevelComplete(true);
    setShowHiddenTask(false);
  };

  // 进入下一关
  const nextLevel = () => {
    if (currentLevel >= belongingLevels.length - 1) {
      setGameComplete(true);
    } else {
      setCurrentLevel(currentLevel + 1);
      setLevelComplete(false);
    }
  };

  // 开始页面
  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a1625] via-[#2d2640] to-[#1a1625] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          {/* 标题 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">归属与特殊</h1>
            <p className="text-lg text-rose-200">找回自己</p>
          </div>

          {/* 说明 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4">🏠 七关觉醒之旅</h2>
            <div className="text-left text-white/80 space-y-2 text-sm">
              <p>每一关都是一次自我探索：</p>
              <ul className="list-disc list-inside space-y-1">
                <li>完成通关任务获得基础XP</li>
                <li>完成隐藏任务获得额外XP</li>
                <li>收集道具，见证成长</li>
              </ul>
            </div>
          </div>

          {/* 关卡预览 */}
          <div className="bg-white/5 rounded-xl p-4 mb-6">
            <div className="grid grid-cols-7 gap-2">
              {belongingLevels.map((l, i) => (
                <div key={l.id} className="text-center">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-lg mx-auto">
                    {l.item.icon}
                  </div>
                  <div className="text-xs text-white/50 mt-1">{i + 1}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 开始按钮 */}
          <button
            onClick={() => setGameStarted(true)}
            className="w-full py-4 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            开始觉醒之旅
          </button>

          {/* 返回按钮 */}
          <button
            onClick={onBack}
            className="mt-4 text-white/50 hover:text-white/80 transition-colors"
          >
            ← 返回
          </button>
        </div>
      </div>
    );
  }

  // 结果页面
  if (gameComplete) {
    const stage = getGrowthStage(totalXP + hiddenXP);
    const percentage = Math.round(((totalXP) / TOTAL_BASE_XP) * 100);
    const circumference = 2 * Math.PI * 54;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a1625] via-[#2d2640] to-[#1a1625] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-white mb-2">🏠 归属与特殊</h1>
          <p className="text-rose-200 mb-6">觉醒报告</p>

          {/* 进度环 */}
          <div className="relative w-40 h-40 mx-auto mb-6">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="80" cy="80" r="54"
                fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8"
              />
              <circle
                cx="80" cy="80" r="54"
                fill="none" stroke="url(#gradient)"
                strokeWidth="8" strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f472b6" />
                  <stop offset="100%" stopColor="#fb7185" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-white">{totalXP}</span>
              <span className="text-white/60 text-sm">/ {TOTAL_BASE_XP} XP</span>
            </div>
          </div>

          {/* 成长阶段 */}
          <div className="bg-white/10 rounded-xl p-4 mb-4">
            <div className="text-3xl mb-2">{stage.icon}</div>
            <div className="text-xl font-semibold text-white">{stage.name}</div>
          </div>

          {/* 统计 */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-2xl font-bold text-rose-300">{completedLevels.length}</div>
              <div className="text-white/60 text-sm">关卡完成</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-2xl font-bold text-pink-300">{hiddenCompleted.length}</div>
              <div className="text-white/60 text-sm">隐藏任务</div>
            </div>
          </div>

          {/* 最终奖励 */}
          {percentage === 100 && (
            <div className="bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-xl p-4 mb-4 border border-rose-400/30">
              <div className="text-lg font-semibold text-white mb-2">🎉 通关奖励</div>
              <div className="text-white/80 text-sm space-y-1">
                <p>🏅 称号：{finalRewards.title}</p>
                <p>📚 技能书：{finalRewards.skill}</p>
                <p className="italic text-rose-200 mt-2">&ldquo;{finalRewards.mantra}&rdquo;</p>
              </div>
            </div>
          )}

          {/* 落款 */}
          <div className="text-white/40 text-sm mt-6">
            此刻花开 · 筱涵
          </div>

          {/* 重新开始 */}
          <button
            onClick={() => {
              setCurrentLevel(0);
              setTotalXP(0);
              setHiddenXP(0);
              setCompletedLevels([]);
              setHiddenCompleted([]);
              setGameStarted(false);
              setGameComplete(false);
              setLevelComplete(false);
            }}
            className="mt-4 px-8 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
          >
            重新开始
          </button>
        </div>
      </div>
    );
  }

  // 关卡完成反馈页面
  if (levelComplete) {
    const earnedXP = level.baseXP + (hiddenCompleted.includes(level.id) ? level.hiddenTask.bonusXP : 0);

    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a1625] via-[#2d2640] to-[#1a1625] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-4">
            {hiddenCompleted.includes(level.id) ? level.hiddenTask.reward.to : level.item.icon}
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">{level.levelName}</h2>
          <p className="text-rose-200 mb-6">关卡完成！</p>

          {/* 获得经验 */}
          <div className="bg-white/10 rounded-xl p-4 mb-4">
            <div className="text-3xl font-bold text-yellow-300 mb-2">+{earnedXP} XP</div>
            {hiddenCompleted.includes(level.id) && (
              <div className="text-pink-300 text-sm">含隐藏任务奖励 +{level.hiddenTask.bonusXP}</div>
            )}
          </div>

          {/* 道具升级 */}
          {hiddenCompleted.includes(level.id) && (
            <div className="bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-xl p-4 mb-4 border border-rose-400/30">
              <div className="text-white mb-2">道具升级！</div>
              <div className="flex items-center justify-center gap-4">
                <span className="text-3xl">{level.hiddenTask.reward.from}</span>
                <span className="text-white/60">→</span>
                <span className="text-3xl">{level.hiddenTask.reward.to}</span>
              </div>
              <div className="text-white/70 text-sm mt-2">{level.hiddenTask.reward.description}</div>
            </div>
          )}

          {/* 关卡金句 */}
          <div className="bg-white/5 rounded-xl p-4 mb-6">
            <p className="text-white/80 italic">&ldquo;{level.quote}&rdquo;</p>
          </div>

          {/* 下一关按钮 */}
          <button
            onClick={nextLevel}
            className="w-full py-4 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            {currentLevel >= belongingLevels.length - 1 ? "查看觉醒报告" : "下一关 →"}
          </button>
        </div>
      </div>
    );
  }

  // 游戏页面
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1625] via-[#2d2640] to-[#1a1625] p-4">
      {/* 顶部进度 */}
      <div className="max-w-md mx-auto mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white/60 text-sm">第 {currentLevel + 1} / {belongingLevels.length} 关</span>
          <span className="text-yellow-300 font-semibold">{totalXP} XP</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 关卡内容 */}
      <div className="max-w-md mx-auto">
        {/* 关卡标题 */}
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">{level.item.icon}</div>
          <h1 className="text-2xl font-bold text-white mb-2">{level.levelName}</h1>
          <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-rose-200 text-sm">
            {level.item.name}
          </div>
        </div>

        {/* 核心主题 */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4 border border-white/20">
          <h3 className="text-rose-300 font-semibold mb-2">💭 核心主题</h3>
          <p className="text-white/90">{level.coreTheme}</p>
        </div>

        {/* 血量提示 */}
        <div className="bg-white/5 rounded-xl p-3 mb-4 flex items-center justify-between">
          <span className="text-white/60 text-sm">能量</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i} className={i <= level.health ? "text-red-400" : "text-white/20"}>
                ❤️
              </span>
            ))}
          </div>
        </div>

        {/* 通关任务 */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4 border border-white/20">
          <h3 className="text-rose-300 font-semibold mb-3">📋 通关任务</h3>
          <div className="space-y-3">
            {level.tasks.map((task, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/70 text-sm flex-shrink-0">
                  {index + 1}
                </span>
                <p className="text-white/80 text-sm">{task}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 经验值奖励 */}
        <div className="bg-yellow-500/10 rounded-xl p-3 mb-4 flex items-center justify-between">
          <span className="text-yellow-200 text-sm">完成奖励</span>
          <span className="text-yellow-300 font-bold">+{level.baseXP} XP</span>
        </div>

        {/* 隐藏任务 */}
        {!showHiddenTask ? (
          <button
            onClick={() => setShowHiddenTask(true)}
            className="w-full py-3 bg-white/5 rounded-xl text-white/60 hover:text-white/90 hover:bg-white/10 transition-all mb-4 border border-dashed border-white/20"
          >
            🔮 查看隐藏任务
          </button>
        ) : (
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 mb-4 border border-purple-400/30">
            <h3 className="text-purple-300 font-semibold mb-2">🔮 隐藏任务</h3>
            <p className="text-white/80 text-sm mb-2">{level.hiddenTask.description}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-purple-200">奖励：{level.hiddenTask.reward.to} {level.hiddenTask.reward.description}</span>
              <span className="text-yellow-300">+{level.hiddenTask.bonusXP} XP</span>
            </div>
          </div>
        )}

        {/* 完成按钮 */}
        <div className="space-y-3">
          <button
            onClick={() => completeLevel(false)}
            className="w-full py-4 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            ✓ 完成任务
          </button>
          {showHiddenTask && (
            <button
              onClick={() => completeLevel(true)}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
            >
              ✨ 完成任务 + 隐藏任务
            </button>
          )}
        </div>

        {/* 返回按钮 */}
        <button
          onClick={onBack}
          className="mt-4 w-full py-2 text-white/50 hover:text-white/80 transition-colors text-sm"
        >
          ← 返回游戏列表
        </button>
      </div>
    </div>
  );
}
