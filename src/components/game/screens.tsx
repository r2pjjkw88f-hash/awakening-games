"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import Image from "next/image";
import {
  gameLevels,
  growthStages,
  relationshipPatterns,
  analyzePatterns,
  collectInsights,
  getPracticeSuggestions,
  type Level,
} from "@/lib/game-data";
import { useGameState } from "@/hooks/use-game-state";
import {
  Progress,
  GrowthPoints,
  ChoiceCard,
  FeedbackBox,
  InsightBox,
} from "./ui";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// 打字机效果 Hook
function useTypewriter(text: string, speed: number = 30) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);
    
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayedText, isComplete };
}

// 浮动粒子组件
function FloatingParticles({ mood }: { mood: Level["sceneMood"] }) {
  // 使用 useMemo 确保粒子配置在组件生命周期内稳定
  const particles = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: (i * 3 + 2) % 6 + 2, // 伪随机大小
      left: (i * 7 + 13) % 100, // 伪随机位置
      delay: (i * 0.4) % 5,
      duration: (i * 2.5) % 10 + 10,
    })), []);

  const colors = {
    calm: "from-[#e8b4b8]/30 to-[#c9b8d4]/30",
    tense: "from-[#e07a5f]/20 to-[#c9b8d4]/20",
    hopeful: "from-[#f0e68c]/30 to-[#e8b4b8]/30",
    awakening: "from-[#c9b8d4]/40 to-[#e8b4b8]/40",
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className={cn(
            "absolute rounded-full bg-gradient-to-br opacity-60 animate-float",
            colors[mood]
          )}
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            bottom: "-10px",
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

// 场景背景组件
function SceneBackground({ level }: { level: Level }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [prevImage, setPrevImage] = useState(level.sceneImage);

  useEffect(() => {
    if (prevImage !== level.sceneImage) {
      setImageLoaded(false);
      setPrevImage(level.sceneImage);
    }
  }, [level.sceneImage, prevImage]);

  const overlayGradients = {
    calm: "from-[#faf8f5]/80 via-transparent to-[#faf8f5]/90",
    tense: "from-[#2a1f1f]/70 via-transparent to-[#faf8f5]/80",
    hopeful: "from-[#faf8f5]/70 via-transparent to-[#faf5f0]/80",
    awakening: "from-[#f5f0f8]/70 via-transparent to-[#faf8f5]/80",
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 场景图片 */}
      <div className={cn(
        "absolute inset-0 transition-opacity duration-1000",
        imageLoaded ? "opacity-100" : "opacity-0"
      )}>
        <Image
          src={level.sceneImage}
          alt={level.title}
          fill
          className="object-cover"
          priority
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      {/* 渐变遮罩 */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-b transition-colors duration-1000",
        overlayGradients[level.sceneMood]
      )} />

      {/* 浮动粒子 */}
      <FloatingParticles mood={level.sceneMood} />

      {/* 底部渐变 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#faf8f5] to-transparent" />
    </div>
  );
}

// 开始页面
export function StartScreen({ onStart, onBack }: { onStart: () => void; onBack?: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* 返回按钮 */}
      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-4 left-4 z-20 p-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
        >
          <span className="text-white/70 text-sm">← 返回</span>
        </button>
      )}
      {/* 背景图片 */}
      <div className="absolute inset-0">
        <Image
          src="https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2F%E5%B0%81%E9%9D%A2.png&nonce=88b6a0e9-30b5-44ef-985b-fffdecbb9816&project_id=7647770575405973567&sign=834f0de2fa8fb5bcc281d36811ddc57de2498460c5478ec8b1a4921b29c3face"
          alt="此刻花开"
          fill
          className="object-cover"
          priority
        />
        {/* 渐变遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1625]/40 via-[#2d2640]/30 to-[#1a1625]/60" />
      </div>
      
      {/* 装饰性光晕 */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#e8b4b8]/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#c9b8d4]/10 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />

      <div className={cn(
        "max-w-md w-full text-center relative z-10 transition-all duration-1000",
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}>
        {/* 装饰性花朵图案 */}
        <div className="mb-8">
          <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-[#e8b4b8] to-[#c9b8d4] flex items-center justify-center shadow-xl shadow-[#e8b4b8]/30 animate-float-slow">
            <svg
              viewBox="0 0 24 24"
              className="w-14 h-14 text-white"
              fill="currentColor"
            >
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM12 8C15.31 8 18 10.69 18 14C18 17.31 15.31 20 12 20C8.69 20 6 17.31 6 14C6 10.69 8.69 8 12 8ZM12 10C9.79 10 8 11.79 8 14C8 16.21 9.79 18 12 18C14.21 18 16 16.21 16 14C16 11.79 14.21 10 12 10Z" />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl font-serif text-white mb-3 tracking-wide drop-shadow-lg">此刻花开</h1>
        <p className="text-xl text-white/90 mb-2 font-light drop-shadow">觉醒之旅</p>

        <div className="my-10 p-6 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg">
          <p className="text-white/90 text-sm leading-loose">
            这是一场关于亲密关系的觉察之旅。
            <br />
            <br />
            你将经历期待、失望、冲突、觉察，
            <br />
            最终找到通往觉醒的门。
            <br />
            <br />
            <span className="text-[#f8d4d7] font-medium">准备好了吗？</span>
          </p>
        </div>

        <Button
          onClick={onStart}
          className="px-10 py-7 bg-gradient-to-r from-[#e8b4b8] to-[#c9b8d4] hover:from-[#dea0a4] hover:to-[#b9a5c5] text-white rounded-full text-lg font-medium shadow-xl shadow-[#e8b4b8]/30 hover:shadow-2xl hover:shadow-[#e8b4b8]/40 transition-all duration-500 hover:scale-105"
        >
          开始旅程
        </Button>

        <p className="mt-10 text-xs text-white/60">
          基于《亲密关系是通往觉醒的门》讲义
        </p>
      </div>
    </div>
  );
}

// 游戏关卡页面
export function GameScreen({ onLevelChange }: { onLevelChange?: (level: number) => void }) {
  const {
    state,
    currentLevelData,
    showFeedback,
    selectedChoice,
    maxPoints,
    makeChoice,
    nextLevel,
  } = useGameState();

  // 打字机效果
  const { displayedText, isComplete: typewriterComplete } = useTypewriter(
    currentLevelData?.narrative || "",
    25
  );

  // 监听关卡变化
  useEffect(() => {
    if (onLevelChange) {
      onLevelChange(state.currentLevel);
    }
  }, [state.currentLevel, onLevelChange]);

  if (!currentLevelData) return null;

  const canShowChoices = typewriterComplete || showFeedback;

  return (
    <div className="min-h-screen relative">
      {/* 场景背景 */}
      <SceneBackground level={currentLevelData} />

      {/* 顶部进度条 */}
      <div className="sticky top-0 z-20 p-4 bg-[#faf8f5]/80 backdrop-blur-md border-b border-[#e8e0dd]/50">
        <div className="max-w-md mx-auto">
          <Progress
            current={state.currentLevel + 1}
            total={gameLevels.length}
          />
          <div className="mt-3">
            <GrowthPoints points={state.totalPoints} maxPoints={maxPoints} />
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="max-w-md mx-auto p-6 pb-24 relative z-10">
        {/* 关卡标题 */}
        <div className={cn(
          "mb-6 transition-all duration-700",
          showFeedback ? "opacity-50" : "opacity-100"
        )}>
          <p className="text-xs text-[#9b8b8b] mb-1 tracking-wider">{currentLevelData.scene}</p>
          <h2 className="text-2xl font-serif text-[#4a3f3f]">
            {currentLevelData.title}
          </h2>
        </div>

        {/* 剧情文字 */}
        <div className={cn(
          "mb-6 p-5 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg transition-all duration-500",
          showFeedback && "opacity-60"
        )}>
          <p className="text-[#4a3f3f] text-sm leading-loose whitespace-pre-line">
            {showFeedback ? currentLevelData.narrative : displayedText}
            {!typewriterComplete && !showFeedback && (
              <span className="inline-block w-0.5 h-4 bg-[#e8b4b8] ml-0.5 animate-blink" />
            )}
          </p>
        </div>

        {/* 选择区域 */}
        <div className="space-y-3">
          {!showFeedback && canShowChoices && (
            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {currentLevelData.choices.map((choice, index) => (
                <div
                  key={choice.id}
                  className="animate-in fade-in slide-in-from-left-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ChoiceCard
                    text={choice.text}
                    onClick={() => makeChoice(choice)}
                  />
                </div>
              ))}
            </div>
          )}

          {/* 反馈 */}
          {showFeedback && selectedChoice && (
            <div className="space-y-3 animate-in fade-in duration-500">
              {currentLevelData.choices.map((choice) => (
                <ChoiceCard
                  key={choice.id}
                  text={choice.text}
                  isSelected={choice.id === selectedChoice.id}
                  isAwakening={choice.isAwakening}
                  showResult
                  disabled
                />
              ))}

              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                <FeedbackBox
                  text={selectedChoice.feedback}
                  isAwakening={selectedChoice.isAwakening}
                />
              </div>

              {selectedChoice.isAwakening && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
                  <InsightBox text={currentLevelData.awakeningInsight} />
                </div>
              )}

              <Button
                onClick={nextLevel}
                className="w-full mt-4 py-6 bg-gradient-to-r from-[#e8b4b8] to-[#c9b8d4] hover:from-[#dea0a4] hover:to-[#b9a5c5] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 animate-in fade-in duration-500 delay-500"
              >
                {state.currentLevel < gameLevels.length - 1
                  ? "继续旅程"
                  : "查看觉醒报告"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 觉醒报告页面
export function ResultScreen({ onRestart }: { onRestart: () => void }) {
  const { state, growthStage, maxPoints, resetGame } = useGameState();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "journey" | "practice">("overview");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRestart = () => {
    resetGame();
    onRestart();
  };

  // 计算游戏时长
  const duration = state.completedAt && state.startedAt
    ? Math.round((state.completedAt - state.startedAt) / 1000 / 60)
    : 0;

  // 计算觉醒选择
  const awakeningChoices = state.choices.map((choiceId, index) => {
    const level = gameLevels[index];
    const choice = level?.choices.find((c) => c.id === choiceId);
    return { level, choice, isAwakening: choice?.isAwakening || false };
  });

  const awakeningCount = awakeningChoices.filter((a) => a.isAwakening).length;

  // 分析关系模式
  const patterns = analyzePatterns(state.choices, gameLevels);

  // 收集觉醒洞察
  const insights = collectInsights(state.choices, gameLevels);

  // 获取练习建议
  const suggestions = getPracticeSuggestions(state.totalPoints);

  // 成长百分比
  const growthPercentage = Math.round((state.totalPoints / maxPoints) * 100);

  // 根据分数确定主要建议
  const getMainMessage = () => {
    if (state.totalPoints >= 60) {
      return {
        title: "觉醒之花已经绽放",
        subtitle: "你开始真正看见自己了",
        description: "这份觉察将成为你人生最珍贵的礼物。关系对你来说，不再是填补，而是分享。"
      };
    } else if (state.totalPoints >= 30) {
      return {
        title: "觉察的种子正在发芽",
        subtitle: "你正在看见更多",
        description: "每一次向内看，都是一次成长。继续这份探索，你会发现更多的自己。"
      };
    } else {
      return {
        title: "旅程刚刚开始",
        subtitle: "每一次痛苦都是礼物",
        description: "这是一场漫长的旅程。每一次痛苦，都是包装丑陋的礼物。当你准备好了，继续打开它。"
      };
    }
  };

  const mainMessage = getMainMessage();

  return (
    <div className="min-h-screen relative overflow-hidden pb-8">
      {/* 背景图片 */}
      <div className="absolute inset-0">
        <Image
          src="https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2F%E6%98%9F%E7%A9%BA%E7%89%88.png&nonce=4faec912-d062-4d10-88f7-32717aa8c6a8&project_id=7647770575405973567&sign=32281da22a10cceb55b0b3c581b90149d3c2ecb22906bddbf221abd4273b348f"
          alt="花开时刻"
          fill
          className="object-cover"
          priority
        />
        {/* 渐变遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1625]/50 via-[#2d2640]/40 to-[#1a1625]/70" />
      </div>
      
      {/* 装饰性光晕 */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-[#e8b4b8]/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-40 left-10 w-48 h-48 bg-[#c9b8d4]/10 rounded-full blur-3xl animate-pulse-slow animation-delay-1000" />

      <div className={cn(
        "max-w-md mx-auto px-6 relative z-10 transition-all duration-1000",
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}>
        {/* 头部 */}
        <div className="text-center pt-8 pb-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#e8b4b8] to-[#c9b8d4] flex items-center justify-center shadow-xl shadow-[#e8b4b8]/30 mb-4 animate-float-slow">
            <span className="text-3xl">{growthStage.icon}</span>
          </div>
          <h1 className="text-2xl font-serif text-white mb-1 drop-shadow-lg">{mainMessage.title}</h1>
          <p className="text-white/80 text-sm">{mainMessage.subtitle}</p>
        </div>

        {/* 分数展示 */}
        <div className="bg-gradient-to-br from-[#e8b4b8]/30 to-[#c9b8d4]/30 backdrop-blur-md rounded-2xl p-6 mb-5 border border-white/30 shadow-xl text-center">
          <p className="text-white/80 text-sm mb-2">你的觉醒分数</p>
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-5xl font-bold text-white drop-shadow-lg">{state.totalPoints}</span>
            <span className="text-2xl text-white/60">/ {maxPoints}</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <span className="text-3xl">{growthStage.icon}</span>
            <span className="text-lg text-white font-medium">{growthStage.title}</span>
          </div>
          <p className="text-white/70 text-xs mt-3">{growthStage.description}</p>
        </div>

        {/* 成长进度环 */}
        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 mb-5 border border-white/20 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-white/70">成长进度</p>
            <div className="relative w-14 h-14">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-[#f0e8e6]"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#e8b4b8]"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray={`${growthPercentage}, 100`}
                  strokeLinecap="round"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">{growthPercentage}%</span>
            </div>
          </div>
          
          {/* 成长阶段进度条 */}
          <div className="flex items-center gap-1">
            {growthStages.map((stage, index) => (
              <div
                key={stage.min}
                className={cn(
                  "flex-1 h-2 rounded-full transition-all duration-500",
                  state.totalPoints >= stage.min ? "bg-gradient-to-r from-[#e8b4b8] to-[#c9b8d4]" : "bg-white/20"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {growthStages.slice(0, 3).map((stage) => (
              <span key={stage.min} className="text-[10px] text-white/60">{stage.icon}</span>
            ))}
          </div>
        </div>

        {/* 核心数据卡片 */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { value: awakeningCount, label: "觉醒时刻", icon: "✨", color: "from-[#e8b4b8] to-[#c9b8d4]" },
            { value: `${state.choices.length}`, label: "选择历程", icon: "🛤️", color: "from-[#c9b8d4] to-[#9b8b8b]" },
            { value: `${duration}`, label: "分钟旅程", icon: "⏳", color: "from-[#7cb89c] to-[#e8b4b8]" },
          ].map((item, index) => (
            <div
              key={item.label}
              className="bg-white/15 backdrop-blur-md rounded-xl p-3 text-center border border-white/20 shadow-md"
            >
              <div className={cn("w-8 h-8 mx-auto rounded-full bg-gradient-to-br flex items-center justify-center mb-2", item.color)}>
                <span className="text-sm">{item.icon}</span>
              </div>
              <p className="text-xl font-bold text-white">{item.value}</p>
              <p className="text-[10px] text-white/60">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Tab 切换 */}
        <div className="flex gap-2 mb-5">
          {[
            { id: "overview", label: "成长洞察" },
            { id: "journey", label: "选择回顾" },
            { id: "practice", label: "60天建议" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                "flex-1 py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-300",
                activeTab === tab.id
                  ? "bg-gradient-to-r from-[#e8b4b8] to-[#c9b8d4] text-white shadow-md"
                  : "bg-white/15 text-white/80 hover:bg-white/25"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 内容 */}
        {activeTab === "overview" && (
          <div className="space-y-4">
            {/* 关系模式分析 */}
            {patterns.length > 0 && (
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-lg">
                <p className="text-xs text-white/70 mb-3">🔍 你的关系模式</p>
                <div className="space-y-3">
                  {patterns.slice(0, 3).map((p) => {
                    const patternInfo = relationshipPatterns[p.pattern as keyof typeof relationshipPatterns];
                    return (
                      <div key={p.pattern} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#e8b4b8]/30 to-[#c9b8d4]/30 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm">{p.count >= 2 ? "💡" : "🌱"}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">{p.pattern}</p>
                          <p className="text-xs text-white/70 mt-0.5">
                            {patternInfo?.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 觉醒洞察收藏 */}
            {insights.length > 0 && (
              <div className="bg-gradient-to-br from-[#e8b4b8]/20 to-[#c9b8d4]/20 rounded-2xl p-5 border border-white/20 shadow-lg">
                <p className="text-xs text-white/70 mb-3">💫 你收藏的觉醒洞察</p>
                <div className="space-y-3">
                  {insights.slice(0, 3).map((insight, index) => (
                    <p key={index} className="text-sm text-white leading-relaxed pl-3 border-l-2 border-[#e8b4b8]/50">
                      {insight}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* 核心寄语 */}
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-lg">
              <p className="text-xs text-white/70 mb-2">🌸 给你的话</p>
              <p className="text-white text-sm leading-loose">{mainMessage.description}</p>
            </div>
          </div>
        )}

        {activeTab === "journey" && (
          <div className="space-y-3">
            {/* 选择时间线 */}
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-lg">
              <p className="text-xs text-white/70 mb-4">📍 你的觉醒旅程</p>
              <div className="space-y-4">
                {awakeningChoices.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-xs",
                        item.isAwakening 
                          ? "bg-gradient-to-br from-[#e8b4b8] to-[#c9b8d4] text-white" 
                          : "bg-white/20 text-white/70"
                      )}>
                        {item.isAwakening ? "✓" : index + 1}
                      </div>
                      {index < awakeningChoices.length - 1 && (
                        <div className="w-0.5 h-8 bg-white/20 mt-1" />
                      )}
                    </div>
                    <div className="flex-1 pb-2">
                      <p className="text-xs text-white/60">{item.level?.scene}</p>
                      <p className="text-sm font-medium text-white mt-0.5">{item.level?.title}</p>
                      <p className="text-xs text-white/70 mt-1 line-clamp-2">
                        {item.choice?.text}
                      </p>
                      {item.isAwakening && (
                        <span className="inline-block mt-2 text-[10px] px-2 py-0.5 bg-[#e8b4b8]/30 text-[#f8d4d7] rounded-full">
                          ✨ 觉醒选择
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "practice" && (
          <div className="space-y-3">
            <div className="bg-gradient-to-br from-[#e8b4b8]/20 to-[#c9b8d4]/20 rounded-2xl p-5 border border-white/20 shadow-lg">
              <p className="text-xs text-white/70 mb-2">📅 未来60天的成长练习</p>
              <p className="text-sm text-white leading-relaxed">
                根据你的选择，我们为你定制了以下练习。持续实践，你会看见更多改变。
              </p>
            </div>
            
            {suggestions.map((suggestion, index) => (
              <div 
                key={suggestion.title}
                className="bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e8b4b8] to-[#c9b8d4] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-white">{suggestion.title}</p>
                      <span className="text-[10px] px-2 py-0.5 bg-white/20 text-white/80 rounded-full">
                        {suggestion.duration}
                      </span>
                    </div>
                    <p className="text-xs text-white/70 mt-2 leading-relaxed">
                      {suggestion.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* 个性化建议 */}
            {patterns.length > 0 && patterns[0].suggestions.length > 0 && (
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-lg">
                <p className="text-xs text-white/70 mb-3">🎯 针对你的一对一建议</p>
                <p className="text-sm text-white leading-relaxed">
                  {patterns[0].suggestions[0]}
                </p>
              </div>
            )}
          </div>
        )}

        {/* 核心洞见 */}
        <div className="mt-6 bg-gradient-to-r from-[#e8b4b8]/20 to-[#c9b8d4]/20 rounded-2xl p-5 border border-white/20">
          <p className="text-center text-xs text-white/70 mb-2">💡 请记住</p>
          <p className="text-center text-white text-sm leading-relaxed font-medium">
            关系不是来满足你的，
            <br />
            关系是来唤醒你的。
          </p>
        </div>

        {/* 重新开始按钮 */}
        <Button
          onClick={handleRestart}
          variant="outline"
          className="w-full mt-6 py-6 border-2 border-white/30 text-white hover:bg-white/10 rounded-xl text-base font-medium"
        >
          重新开始旅程
        </Button>

        {/* 落款 */}
        <p className="text-center text-xs text-white/40 mt-4">
          此刻花开 · 筱涵
        </p>

        <p className="text-center text-xs text-white/50 mt-4 pb-4">
          欢迎来到《此刻花开》 · 未来60天，一起慢慢花开
        </p>
      </div>
    </div>
  );
}
