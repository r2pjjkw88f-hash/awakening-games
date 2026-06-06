"use client";

import { useState, useEffect, useMemo } from "react";
import { awakeningJourneyLevels, TOTAL_BASE_XP, TOTAL_HIDDEN_XP, GRAND_TOTAL_XP, growthStages, finalRewards, type LevelData } from "@/lib/awakening-journey-data";

type GamePhase = "start" | "playing" | "feedback" | "result";

interface ChoiceRecord {
  levelId: number;
  choiceId: string;
  isAwakened: boolean;
  xp: number;
}

export default function AwakeningJourneyGame() {
  const [phase, setPhase] = useState<GamePhase>("start");
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [totalXP, setTotalXP] = useState(0);
  const [choices, setChoices] = useState<ChoiceRecord[]>([]);
  const [showHiddenTask, setShowHiddenTask] = useState(false);
  const [unlockedItems, setUnlockedItems] = useState<string[]>([]);

  const currentLevel = awakeningJourneyLevels[currentLevelIndex];
  const currentChoice = selectedChoice 
    ? currentLevel.choices.find(c => c.id === selectedChoice) 
    : null;

  // 获取成长阶段
  const getGrowthStage = (xp: number) => {
    let stage = growthStages[0];
    for (const s of growthStages) {
      if (xp >= s.minXP) stage = s;
    }
    return stage;
  };

  // 打字机效果
  const TypewriterText = ({ text, delay = 30 }: { text: string; delay?: number }) => {
    const [displayed, setDisplayed] = useState("");
    
    useEffect(() => {
      setDisplayed("");
      let i = 0;
      const timer = setInterval(() => {
        if (i < text.length) {
          setDisplayed(prev => prev + text[i]);
          i++;
        } else {
          clearInterval(timer);
        }
      }, delay);
      return () => clearInterval(timer);
    }, [text, delay]);
    
    return <span>{displayed}</span>;
  };

  // 健康条组件
  const HealthBar = ({ count }: { count: number }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={`text-xl ${i <= count ? "text-red-400" : "text-gray-600"}`}>
          ❤️
        </span>
      ))}
    </div>
  );

  // XP进度环
  const XPRing = ({ current, max, size = 120 }: { current: number; max: number; size?: number }) => {
    const percentage = Math.min((current / max) * 100, 100);
    const radius = (size - 12) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#xpGradient)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
          />
          <defs>
            <linearGradient id="xpGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e8b4b8" />
              <stop offset="100%" stopColor="#c9b8d4" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-2xl font-bold text-white">{current}</span>
          <span className="text-xs text-white/60">XP</span>
        </div>
      </div>
    );
  };

  // 处理选择
  const handleChoice = (choiceId: string) => {
    if (selectedChoice) return;
    setSelectedChoice(choiceId);
  };

  // 确认选择，进入反馈
  const handleConfirm = () => {
    if (!selectedChoice || !currentChoice) return;
    
    const xp = currentChoice.isAwakened ? currentLevel.baseXP : currentChoice.baseXP;
    setTotalXP(prev => prev + xp);
    setChoices(prev => [...prev, {
      levelId: currentLevel.id,
      choiceId: selectedChoice,
      isAwakened: currentChoice.isAwakened,
      xp
    }]);
    setPhase("feedback");
  };

  // 下一关
  const handleNext = () => {
    if (currentLevelIndex < awakeningJourneyLevels.length - 1) {
      setCurrentLevelIndex(prev => prev + 1);
      setSelectedChoice(null);
      setShowHiddenTask(false);
      setPhase("playing");
    } else {
      setPhase("result");
    }
  };

  // 重新开始
  const handleRestart = () => {
    setPhase("start");
    setCurrentLevelIndex(0);
    setSelectedChoice(null);
    setTotalXP(0);
    setChoices([]);
    setShowHiddenTask(false);
    setUnlockedItems([]);
  };

  // 计算觉醒率
  const awakenedCount = choices.filter(c => c.isAwakened).length;

  // 开始页面
  if (phase === "start") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a1625] via-[#2d2640] to-[#1a1625] flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* 游戏标题 */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              🌸 亲密关系
            </h1>
            <h2 className="text-xl text-pink-300 mb-4">觉醒之旅</h2>
            <p className="text-white/70 text-sm">
              一场从投射到觉醒的灵魂旅程
            </p>
          </div>

          {/* XP系统说明 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 mb-6 border border-white/20">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              ⭐ 经验值系统
            </h3>
            <div className="space-y-2 text-sm text-white/80">
              <p>• 每关选择<span className="text-pink-300">觉醒视角</span>获得满额XP</p>
              <p>• 完成隐藏任务获得<span className="text-yellow-300">额外奖励</span></p>
              <p>• 收集道具，升级你的觉察装备</p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex justify-between text-xs text-white/60">
                <span>基础XP上限: {TOTAL_BASE_XP}</span>
                <span>隐藏任务XP: +{TOTAL_HIDDEN_XP}</span>
              </div>
              <div className="text-center text-pink-300 text-sm mt-2">
                总计可达: {GRAND_TOTAL_XP} XP
              </div>
            </div>
          </div>

          {/* 关卡预览 */}
          <div className="bg-white/5 rounded-xl p-4 mb-6">
            <h4 className="text-white/80 text-sm mb-3">🗺️ 六大关卡</h4>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {awakeningJourneyLevels.slice(0, 6).map(level => (
                <div key={level.id} className="text-center p-2 bg-white/5 rounded-lg">
                  <div className="text-lg">{level.item.icon}</div>
                  <div className="text-white/70 mt-1">{level.levelName}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 开始按钮 */}
          <button
            onClick={() => setPhase("playing")}
            className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl hover:from-pink-400 hover:to-purple-400 transition-all transform hover:scale-[1.02] shadow-lg"
          >
            开始觉醒之旅 ✨
          </button>
        </div>
      </div>
    );
  }

  // 游戏页面
  if (phase === "playing") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a1625] via-[#2d2640] to-[#1a1625] flex flex-col p-4">
        {/* 顶部信息栏 */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleRestart}
            className="text-white/60 text-sm hover:text-white transition-colors"
          >
            ← 返回
          </button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">⭐</span>
              <span className="text-white font-semibold">{totalXP} XP</span>
            </div>
          </div>
        </div>

        {/* 关卡标题 */}
        <div className="text-center mb-4">
          <div className="text-white/60 text-sm mb-1">
            第 {currentLevel.id} 关
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {currentLevel.levelName}
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="text-3xl">{currentLevel.item.icon}</span>
            <div className="text-left">
              <div className="text-pink-300 text-sm">{currentLevel.emotion}</div>
              <div className="text-white/70 text-xs">{currentLevel.item.name}</div>
            </div>
          </div>
        </div>

        {/* 场景图片 */}
        {currentLevel.sceneImage && (
          <div className="relative w-full h-40 mb-4 rounded-2xl overflow-hidden">
            <img 
              src={currentLevel.sceneImage} 
              alt={currentLevel.levelName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1625] via-transparent to-transparent" />
          </div>
        )}

        {/* 血量条 */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-white/60 text-sm">能量:</span>
          <HealthBar count={currentLevel.healthBar} />
        </div>

        {/* 剧情场景 */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 mb-6 border border-white/20 flex-1 overflow-auto">
          <p className="text-white/90 whitespace-pre-line leading-relaxed text-sm">
            <TypewriterText text={currentLevel.scenario} delay={20} />
          </p>
        </div>

        {/* 选择区域 */}
        <div className="space-y-3">
          <div className="text-white/60 text-sm mb-2">你会怎么选择？</div>
          {currentLevel.choices.map(choice => (
            <button
              key={choice.id}
              onClick={() => handleChoice(choice.id)}
              disabled={!!selectedChoice}
              className={`w-full p-4 rounded-xl text-left transition-all border ${
                selectedChoice === choice.id
                  ? choice.isAwakened
                    ? "bg-gradient-to-r from-pink-500/30 to-purple-500/30 border-pink-400 text-white"
                    : "bg-white/10 border-white/30 text-white"
                  : selectedChoice
                  ? "bg-white/5 border-white/10 text-white/50"
                  : "bg-white/10 border-white/20 text-white hover:bg-white/15 hover:border-white/30"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5 ${
                  selectedChoice === choice.id 
                    ? "bg-pink-500 text-white" 
                    : "bg-white/20 text-white/60"
                }`}>
                  {selectedChoice === choice.id ? "✓" : choice.id.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{choice.text}</p>
                  {selectedChoice === choice.id && (
                    <div className={`mt-2 text-xs ${choice.isAwakened ? "text-pink-300" : "text-white/50"}`}>
                      {choice.isAwakened ? `+${choice.baseXP} XP` : `+${choice.baseXP} XP`}
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* 确认按钮 */}
        {selectedChoice && (
          <button
            onClick={handleConfirm}
            className="w-full mt-4 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl hover:from-pink-400 hover:to-purple-400 transition-all"
          >
            确认选择
          </button>
        )}
      </div>
    );
  }

  // 反馈页面
  if (phase === "feedback") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a1625] via-[#2d2640] to-[#1a1625] flex flex-col p-4">
        {/* 顶部信息 */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-white/60 text-sm">
            第 {currentLevel.id} 关 · {currentLevel.levelName}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-400">⭐</span>
            <span className="text-white font-semibold">{totalXP} XP</span>
          </div>
        </div>

        {/* 结果展示 */}
        <div className={`flex-1 rounded-2xl p-6 mb-4 ${
          currentChoice?.isAwakened 
            ? "bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-400/30" 
            : "bg-white/10 border border-white/20"
        }`}>
          {currentChoice?.isAwakened ? (
            <>
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">✨</div>
                <h3 className="text-xl font-bold text-pink-300">觉醒视角</h3>
                <div className="text-yellow-400 text-lg mt-2">+{currentChoice.baseXP} XP</div>
              </div>
              
              <div className="bg-white/10 rounded-xl p-4 mb-4">
                <p className="text-white/90 whitespace-pre-line text-sm leading-relaxed">
                  {currentChoice.feedback}
                </p>
              </div>

              {/* XP明细 */}
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-white/60 text-xs mb-2">经验值明细</div>
                {currentLevel.xpBreakdown.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm py-1">
                    <span className="text-white/80">{item.condition}</span>
                    <span className="text-yellow-400">+{item.xp}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">💭</div>
                <h3 className="text-xl text-white/80">继续觉察</h3>
                <div className="text-white/60 text-lg mt-2">+{currentChoice?.baseXP} XP</div>
              </div>
              
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-white/80 whitespace-pre-line text-sm leading-relaxed">
                  {currentChoice?.feedback}
                </p>
              </div>
            </>
          )}
        </div>

        {/* 隐藏任务（仅觉醒后显示） */}
        {currentChoice?.isAwakened && (
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl p-5 mb-4 border border-yellow-500/30">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🔮</span>
              <h4 className="text-yellow-300 font-semibold">隐藏任务</h4>
              <span className="text-yellow-400/60 text-xs">+{currentLevel.hiddenTask.rewardXP} XP</span>
            </div>
            <p className="text-white/80 text-sm whitespace-pre-line leading-relaxed mb-3">
              {currentLevel.hiddenTask.description}
            </p>
            {currentLevel.hiddenTask.rewardItem && (
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-xs text-white/60 mb-1">完成后道具升级</div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl">{currentLevel.hiddenTask.rewardItem.from}</span>
                  <span className="text-white/40">→</span>
                  <span className="text-2xl">{currentLevel.hiddenTask.rewardItem.to}</span>
                </div>
                <div className="text-xs text-yellow-300/80 mt-1">
                  {currentLevel.hiddenTask.rewardItem.description}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 关卡金句 */}
        <div className="bg-white/5 rounded-xl p-4 mb-4 text-center">
          <p className="text-white/60 italic text-sm">
            "{currentLevel.quote}"
          </p>
        </div>

        {/* 下一关按钮 */}
        <button
          onClick={handleNext}
          className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl hover:from-pink-400 hover:to-purple-400 transition-all"
        >
          {currentLevelIndex < awakeningJourneyLevels.length - 1 ? "下一关 →" : "查看觉醒报告 ✨"}
        </button>
      </div>
    );
  }

  // 结果页面
  if (phase === "result") {
    const stage = getGrowthStage(totalXP);
    const awakenedRate = Math.round((awakenedCount / awakeningJourneyLevels.length) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a1625] via-[#2d2640] to-[#1a1625] flex flex-col p-4">
        {/* 标题 */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">
            🌸 觉醒报告
          </h1>
          <p className="text-white/60 text-sm">亲密关系觉醒之旅</p>
        </div>

        {/* XP展示 */}
        <div className="flex flex-col items-center mb-6">
          <XPRing current={totalXP} max={TOTAL_BASE_XP} size={140} />
          <div className="mt-3 text-center">
            <div className="text-lg font-semibold text-white flex items-center justify-center gap-2">
              {stage.icon} {stage.stage}
            </div>
            <div className="text-white/60 text-sm mt-1">
              觉醒率: {awakenedRate}%
            </div>
          </div>
        </div>

        {/* 核心数据 */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-pink-300">{awakenedCount}/6</div>
            <div className="text-white/60 text-xs mt-1">觉醒选择</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{totalXP}</div>
            <div className="text-white/60 text-xs mt-1">总经验值</div>
          </div>
        </div>

        {/* 选择回顾 */}
        <div className="bg-white/10 rounded-2xl p-4 mb-6">
          <h3 className="text-white font-semibold mb-3">📋 关卡回顾</h3>
          <div className="space-y-2">
            {choices.map((choice, i) => {
              const level = awakeningJourneyLevels[i];
              return (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <span className="text-lg">{level.item.icon}</span>
                  <span className="text-white/80 flex-1">{level.levelName}</span>
                  <span className={choice.isAwakened ? "text-pink-300" : "text-white/50"}>
                    {choice.isAwakened ? "✨" : "💭"} +{choice.xp}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 最终奖励 */}
        {awakenedRate >= 50 && (
          <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl p-5 mb-6 border border-pink-400/30">
            <h3 className="text-pink-300 font-semibold mb-3 text-center">🏆 获得奖励</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <span>🎁</span>
                <span className="text-white/80">{finalRewards.skillBook}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✨</span>
                <span className="text-white/80">称号：{finalRewards.title}</span>
              </div>
            </div>
          </div>
        )}

        {/* 咒语 */}
        <div className="bg-white/5 rounded-xl p-4 mb-6 text-center">
          <p className="text-white/80 italic text-sm">
            "{finalRewards.mantra}"
          </p>
        </div>

        {/* 落款 */}
        <div className="text-center text-white/40 text-sm mb-6">
          此刻花开 · 筱涵
        </div>

        {/* 重新开始 */}
        <button
          onClick={handleRestart}
          className="w-full py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/15 transition-all border border-white/20"
        >
          再次启程 🔄
        </button>
      </div>
    );
  }

  return null;
}
