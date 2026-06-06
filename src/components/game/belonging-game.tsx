"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { belongingLevels, TOTAL_BASE_XP, growthStages, BelongingLevel } from "@/lib/belonging-game-data";

interface Props {
  onBack: () => void;
}

export default function BelongingGame({ onBack }: Props) {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [choices, setChoices] = useState<{ levelId: number; isAwakened: boolean; xp: number; completedHidden: boolean }[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showHiddenTask, setShowHiddenTask] = useState(false);
  const [completedHidden, setCompletedHidden] = useState(false);
  
  // 音乐控制
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const level = belongingLevels[currentLevelIndex];

  // 初始化音频
  useEffect(() => {
    // 使用免费的冥想音乐
    audioRef.current = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  // 关卡切换时重置状态
  useEffect(() => {
    setSelectedChoice(null);
    setShowFeedback(false);
    setShowHiddenTask(false);
    setCompletedHidden(false);
  }, [currentLevelIndex]);

  // 预计算粒子位置
  const particlePositions = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${2 + Math.random() * 2}s`
    }));
  }, []);

  const handleChoice = (index: number) => {
    if (showFeedback) return;
    setSelectedChoice(index);
  };

  const handleConfirm = () => {
    if (selectedChoice === null) return;
    setShowFeedback(true);
  };

  const handleCompleteHidden = () => {
    setCompletedHidden(true);
  };

  const handleNext = () => {
    const choice = level.choices[selectedChoice!];
    const xpEarned = choice.xp + (completedHidden ? level.hiddenTask.bonusXP : 0);
    
    setChoices([...choices, { 
      levelId: level.id, 
      isAwakened: choice.isAwakened, 
      xp: xpEarned,
      completedHidden 
    }]);
    setTotalXP(totalXP + xpEarned);

    if (currentLevelIndex < belongingLevels.length - 1) {
      setCurrentLevelIndex(currentLevelIndex + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentLevelIndex(0);
    setTotalXP(0);
    setChoices([]);
    setIsComplete(false);
    setGameStarted(false);
  };

  // 计算成长阶段
  const getGrowthStage = (xp: number) => {
    let stage = growthStages[0];
    for (const s of growthStages) {
      if (xp >= s.minXP) stage = s;
    }
    return stage;
  };

  // 开始页面
  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-rose-900 relative overflow-hidden">
        {/* 音乐控制按钮 */}
        <button
          onClick={toggleMusic}
          className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          {isMusicPlaying ? "🔊" : "🔇"}
        </button>

        {/* 背景粒子效果 */}
        <div className="absolute inset-0 overflow-hidden">
          {particlePositions.map((particle, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.animationDelay,
                animationDuration: particle.animationDuration
              }}
            />
          ))}
        </div>

        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md">
            <div className="text-6xl mb-4">🏠</div>
            <h1 className="text-3xl font-bold text-white mb-2">归属与特殊</h1>
            <p className="text-xl text-rose-200 mb-6">找回自己</p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6 text-left">
              <h2 className="text-rose-200 font-semibold mb-3">🌸 七关觉醒之旅</h2>
              <div className="grid grid-cols-1 gap-2 text-sm text-white/80">
                {belongingLevels.map((l, i) => (
                  <div key={l.id} className="flex items-center gap-2">
                    <span>{l.item.icon}</span>
                    <span>第{i + 1}关：{l.levelName}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 mb-6 text-left">
              <h3 className="text-purple-200 font-semibold mb-2">⭐ 经验值系统</h3>
              <p className="text-white/70 text-sm">
                基础 XP：最高 {TOTAL_BASE_XP} 分<br/>
                隐藏任务 XP：额外加分<br/>
                选择觉醒视角获得最高 XP！
              </p>
            </div>

            <button
              onClick={() => setGameStarted(true)}
              className="w-full py-4 bg-gradient-to-r from-rose-400 to-purple-500 text-white rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg"
            >
              开始觉醒之旅
            </button>

            <button
              onClick={onBack}
              className="mt-4 w-full py-2 text-white/50 hover:text-white/80 transition-colors text-sm"
            >
              ← 返回游戏列表
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 结果页面
  if (isComplete) {
    const stage = getGrowthStage(totalXP);
    const awakenedCount = choices.filter(c => c.isAwakened).length;
    const hiddenCount = choices.filter(c => c.completedHidden).length;
    const percentage = Math.round((totalXP / TOTAL_BASE_XP) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-rose-900 relative overflow-hidden">
        {/* 音乐控制按钮 */}
        <button
          onClick={toggleMusic}
          className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          {isMusicPlaying ? "🔊" : "🔇"}
        </button>

        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
          <div className="max-w-md w-full text-center">
            <div className="text-6xl mb-4">{stage.icon}</div>
            <h1 className="text-3xl font-bold text-white mb-2">🏠 归属与特殊</h1>
            <p className="text-rose-200 mb-6">觉醒报告</p>

            {/* 进度环 */}
            <div className="flex justify-center mb-6">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="url(#gradient)"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={440}
                    strokeDashoffset={440 - (440 * Math.min(percentage, 100)) / 100}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f472b6" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-white">{totalXP}</span>
                  <span className="text-white/60 text-sm">/ {TOTAL_BASE_XP} XP</span>
                  <span className="text-rose-300 text-sm mt-1">{percentage}%</span>
                </div>
              </div>
            </div>

            {/* 成长阶段 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-2xl">{stage.icon}</span>
                <span className="text-xl font-semibold text-white">{stage.name}</span>
              </div>
              <p className="text-white/70 text-sm">
                觉醒选择 {awakenedCount}/{belongingLevels.length} 次
              </p>
              <p className="text-white/70 text-sm">
                隐藏任务 {hiddenCount}/{belongingLevels.length} 个
              </p>
            </div>

            {/* 核心金句 */}
            <div className="bg-gradient-to-r from-rose-500/20 to-purple-500/20 rounded-xl p-4 mb-6 border border-rose-400/30">
              <p className="text-white/90 text-sm italic">
                "真正的归属，是永远不丢下自己。"
              </p>
            </div>

            <button
              onClick={handleRestart}
              className="w-full py-4 bg-gradient-to-r from-rose-400 to-purple-500 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity mb-4"
            >
              重新开始
            </button>

            <button
              onClick={onBack}
              className="w-full py-2 text-white/50 hover:text-white/80 transition-colors text-sm"
            >
              ← 返回游戏列表
            </button>

            <p className="text-white/40 text-xs mt-6">此刻花开 · 筱涵</p>
          </div>
        </div>
      </div>
    );
  }

  // 游戏页面
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-rose-900 relative overflow-hidden">
      {/* 音乐控制按钮 */}
      <button
        onClick={toggleMusic}
        className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        {isMusicPlaying ? "🔊" : "🔇"}
      </button>

      {/* 背景图 */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${level.sceneImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/80 via-purple-900/80 to-rose-900/80" />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* 顶部状态栏 */}
        <div className="p-4 flex items-center justify-between">
          <div className="text-white/60 text-sm">
            第 {currentLevelIndex + 1} / {belongingLevels.length} 关
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-300 text-sm">⭐ {totalXP} XP</span>
          </div>
        </div>

        {/* 进度条 */}
        <div className="px-4">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-rose-400 to-purple-500 transition-all duration-500"
              style={{ width: `${((currentLevelIndex + 1) / belongingLevels.length) * 100}%` }}
            />
          </div>
        </div>

        {/* 主内容区 */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-md mx-auto">
            {/* 关卡标题 */}
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">{level.item.icon}</div>
              <h2 className="text-xl font-bold text-white">{level.levelName}</h2>
              <p className="text-rose-200 text-sm mt-1">{level.coreTheme}</p>
            </div>

            {/* 场景描述 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4 border border-white/20">
              <p className="text-white/90 text-sm leading-relaxed">{level.scenario}</p>
            </div>

            {/* 选择区域 */}
            {!showFeedback ? (
              <div className="space-y-3 mb-4">
                <p className="text-white/60 text-sm text-center">选择你的回应：</p>
                {level.choices.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => handleChoice(index)}
                    className={`w-full p-4 rounded-xl text-left transition-all border ${
                      selectedChoice === index
                        ? "bg-white/20 border-rose-400 text-white"
                        : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
                    }`}
                  >
                    <p className="text-sm">{choice.text}</p>
                  </button>
                ))}
                
                {selectedChoice !== null && (
                  <button
                    onClick={handleConfirm}
                    className="w-full py-3 bg-gradient-to-r from-rose-400 to-purple-500 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
                  >
                    确认选择
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {/* 反馈 */}
                <div className={`rounded-xl p-4 border ${
                  level.choices[selectedChoice!].isAwakened
                    ? "bg-gradient-to-r from-rose-500/20 to-purple-500/20 border-rose-400/50"
                    : "bg-white/10 border-white/20"
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">
                      {level.choices[selectedChoice!].isAwakened ? "✨" : "💭"}
                    </span>
                    <span className={`font-semibold ${
                      level.choices[selectedChoice!].isAwakened ? "text-rose-300" : "text-white/80"
                    }`}>
                      {level.choices[selectedChoice!].isAwakened ? "觉醒视角！" : "觉察中..."}
                    </span>
                    <span className="text-yellow-300 text-sm ml-auto">
                      +{level.choices[selectedChoice!].xp} XP
                    </span>
                  </div>
                  <p className="text-white/80 text-sm">{level.choices[selectedChoice!].feedback}</p>
                </div>

                {/* 隐藏任务 */}
                {level.choices[selectedChoice!].isAwakened && !showHiddenTask && (
                  <button
                    onClick={() => setShowHiddenTask(true)}
                    className="w-full py-3 bg-white/5 rounded-xl text-white/60 hover:text-white/90 hover:bg-white/10 transition-all border border-dashed border-white/20"
                  >
                    🔮 查看隐藏任务
                  </button>
                )}

                {showHiddenTask && (
                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-400/30">
                    <h3 className="text-purple-300 font-semibold mb-2">🔮 隐藏任务</h3>
                    <p className="text-white/80 text-sm mb-3">{level.hiddenTask.description}</p>
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="text-purple-200">奖励：{level.hiddenTask.reward.to}</span>
                      <span className="text-yellow-300">+{level.hiddenTask.bonusXP} XP</span>
                    </div>
                    {!completedHidden ? (
                      <button
                        onClick={handleCompleteHidden}
                        className="w-full py-2 bg-purple-500/30 rounded-lg text-purple-200 text-sm hover:bg-purple-500/40 transition-colors"
                      >
                        我完成了隐藏任务
                      </button>
                    ) : (
                      <div className="text-center text-green-300 text-sm">
                        ✓ 隐藏任务完成！+{level.hiddenTask.bonusXP} XP
                      </div>
                    )}
                  </div>
                )}

                {/* 金句 */}
                <div className="text-center py-2">
                  <p className="text-white/60 text-sm italic">"{level.quote}"</p>
                </div>

                {/* 下一步按钮 */}
                <button
                  onClick={handleNext}
                  className="w-full py-4 bg-gradient-to-r from-rose-400 to-purple-500 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
                >
                  {currentLevelIndex < belongingLevels.length - 1 ? "下一关 →" : "查看觉醒报告"}
                </button>
              </div>
            )}

            {/* 返回按钮 */}
            <button
              onClick={onBack}
              className="mt-4 w-full py-2 text-white/50 hover:text-white/80 transition-colors text-sm text-center"
            >
              ← 返回游戏列表
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
