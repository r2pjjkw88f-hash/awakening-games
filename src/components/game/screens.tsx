"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import Image from "next/image";
import { gameLevels, type Level } from "@/lib/game-data";
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
export function StartScreen({ onStart }: { onStart: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* 背景渐变动画 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#faf8f5] via-[#f5f0f8] to-[#faf0ee] animate-gradient-shift" />
      
      {/* 装饰性光晕 */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#e8b4b8]/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#c9b8d4]/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />

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

        <h1 className="text-4xl font-serif text-[#4a3f3f] mb-3 tracking-wide">此刻花开</h1>
        <p className="text-xl text-[#6b5b5b] mb-2 font-light">觉醒之旅</p>

        <div className="my-10 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/60 shadow-lg">
          <p className="text-[#6b5b5b] text-sm leading-loose">
            这是一场关于亲密关系的觉察之旅。
            <br />
            <br />
            你将经历期待、失望、冲突、觉察，
            <br />
            最终找到通往觉醒的门。
            <br />
            <br />
            <span className="text-[#e8b4b8] font-medium">准备好了吗？</span>
          </p>
        </div>

        <Button
          onClick={onStart}
          className="px-10 py-7 bg-gradient-to-r from-[#e8b4b8] to-[#c9b8d4] hover:from-[#dea0a4] hover:to-[#b9a5c5] text-white rounded-full text-lg font-medium shadow-xl shadow-[#e8b4b8]/30 hover:shadow-2xl hover:shadow-[#e8b4b8]/40 transition-all duration-500 hover:scale-105"
        >
          开始旅程
        </Button>

        <p className="mt-10 text-xs text-[#9b8b8b]">
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

  // 计算觉醒选择比例
  const awakeningCount = state.choices.filter((choiceId, index) => {
    const level = gameLevels[index];
    const choice = level?.choices.find((c) => c.id === choiceId);
    return choice?.isAwakening;
  }).length;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 背景渐变 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#faf8f5] via-[#f5f0f8] to-[#faf0ee]" />
      
      {/* 装饰性光晕 */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-[#e8b4b8]/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-40 left-10 w-48 h-48 bg-[#c9b8d4]/20 rounded-full blur-3xl animate-pulse-slow animation-delay-1000" />

      <div className={cn(
        "max-w-md mx-auto p-6 relative z-10 transition-all duration-1000",
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}>
        {/* 标题 */}
        <div className="text-center mb-8 pt-8">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#e8b4b8] to-[#c9b8d4] flex items-center justify-center shadow-xl shadow-[#e8b4b8]/30 mb-4 animate-float-slow">
            <span className="text-4xl">🌸</span>
          </div>
          <h1 className="text-2xl font-serif text-[#4a3f3f] mb-2">觉醒报告</h1>
          <p className="text-[#6b5b5b] text-sm">你的亲密关系觉察之旅</p>
        </div>

        {/* 核心数据 */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { value: state.totalPoints, label: "成长值", color: "text-[#e8b4b8]" },
            { value: awakeningCount, label: "觉醒时刻", color: "text-[#c9b8d4]" },
            { value: duration, label: "分钟", color: "text-[#e07a5f]" },
          ].map((item, index) => (
            <div
              key={item.label}
              className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center border border-white/50 shadow-lg animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100 + 200}ms` }}
            >
              <p className={cn("text-2xl font-bold", item.color)}>{item.value}</p>
              <p className="text-xs text-[#9b8b8b] mt-1">{item.label}</p>
            </div>
          ))}
        </div>

        {/* 成长阶段 */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 mb-6 border border-white/50 shadow-lg animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: "500ms" }}>
          <p className="text-xs text-[#9b8b8b] mb-2">你的成长阶段</p>
          <p className="text-lg font-serif text-[#4a3f3f] mb-1">
            {growthStage.title}
          </p>
          <p className="text-sm text-[#6b5b5b]">{growthStage.description}</p>
        </div>

        {/* 觉醒寄语 */}
        <div className="bg-gradient-to-br from-[#faf0ee] to-[#f5f0f8] rounded-2xl p-5 mb-6 border border-[#e8b4b8]/30 shadow-lg animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: "600ms" }}>
          <p className="text-xs text-[#9b8b8b] mb-2">🌸 觉醒寄语</p>
          <p className="text-[#4a3f3f] text-sm leading-loose">
            {state.totalPoints >= 60
              ? "你已经开始真正看见自己。这份觉察，将成为你人生最珍贵的礼物。关系不再是填补，而是分享。爱自己会流动，成长自己会发生，生命自己会回应。"
              : state.totalPoints >= 30
              ? "觉察的种子已经在心中发芽。每一次向内看，都是一次成长。继续这份探索，你会发现更多的自己。"
              : "这是一场漫长的旅程。每一次痛苦，都是包装丑陋的礼物。当你准备好了，继续打开它。"}
          </p>
        </div>

        {/* 核心洞见 */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 mb-8 border border-white/50 shadow-lg animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: "700ms" }}>
          <p className="text-xs text-[#9b8b8b] mb-2">💡 请记住</p>
          <p className="text-[#4a3f3f] text-sm leading-relaxed font-medium">
            关系不是来满足你的，
            <br />
            关系是来唤醒你的。
          </p>
        </div>

        {/* 重新开始按钮 */}
        <Button
          onClick={handleRestart}
          variant="outline"
          className="w-full py-6 border-2 border-[#e8b4b8] text-[#e8b4b8] hover:bg-[#faf0ee] rounded-xl text-base font-medium animate-in fade-in slide-in-from-bottom-4"
          style={{ animationDelay: "800ms" }}
        >
          重新开始旅程
        </Button>

        <p className="text-center text-xs text-[#9b8b8b] mt-6">
          欢迎来到《此刻花开》
        </p>
      </div>
    </div>
  );
}
