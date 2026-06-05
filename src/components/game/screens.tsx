"use client";

import { useEffect } from "react";
import { gameLevels } from "@/lib/game-data";
import { useGameState } from "@/hooks/use-game-state";
import {
  Progress,
  GrowthPoints,
  ChoiceCard,
  FeedbackBox,
  InsightBox,
} from "./ui";
import { Button } from "@/components/ui/button";

// 开始页面
export function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-[#faf8f5] to-[#f5f0f8]">
      <div className="max-w-md w-full text-center">
        {/* 装饰性花朵图案 */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#e8b4b8] to-[#c9b8d4] flex items-center justify-center shadow-lg">
            <svg
              viewBox="0 0 24 24"
              className="w-12 h-12 text-white"
              fill="currentColor"
            >
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM12 8C15.31 8 18 10.69 18 14C18 17.31 15.31 20 12 20C8.69 20 6 17.31 6 14C6 10.69 8.69 8 12 8ZM12 10C9.79 10 8 11.79 8 14C8 16.21 9.79 18 12 18C14.21 18 16 16.21 16 14C16 11.79 14.21 10 12 10Z" />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-serif text-[#4a3f3f] mb-4">此刻花开</h1>
        <p className="text-lg text-[#6b5b5b] mb-2">觉醒之旅</p>

        <div className="my-8 p-6 bg-white/60 rounded-2xl border border-[#e8e0dd]">
          <p className="text-[#6b5b5b] text-sm leading-relaxed">
            这是一场关于亲密关系的觉察之旅。
            <br />
            <br />
            你将经历期待、失望、冲突、觉察，
            <br />
            最终找到通往觉醒的门。
            <br />
            <br />
            准备好了吗？
          </p>
        </div>

        <Button
          onClick={onStart}
          className="px-8 py-6 bg-gradient-to-r from-[#e8b4b8] to-[#c9b8d4] hover:from-[#dea0a4] hover:to-[#b9a5c5] text-white rounded-full text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300"
        >
          开始旅程
        </Button>

        <p className="mt-8 text-xs text-[#9b8b8b]">
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
    growthStage,
    showFeedback,
    selectedChoice,
    maxPoints,
    makeChoice,
    nextLevel,
  } = useGameState();

  // 监听关卡变化
  useEffect(() => {
    if (onLevelChange) {
      onLevelChange(state.currentLevel);
    }
  }, [state.currentLevel, onLevelChange]);

  if (!currentLevelData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf8f5] to-[#f5f0f8]">
      {/* 顶部进度条 */}
      <div className="sticky top-0 z-10 p-4 bg-[#faf8f5]/90 backdrop-blur-sm border-b border-[#e8e0dd]">
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
      <div className="max-w-md mx-auto p-6 pb-24">
        {/* 关卡标题 */}
        <div className="mb-6">
          <p className="text-xs text-[#9b8b8b] mb-1">{currentLevelData.scene}</p>
          <h2 className="text-xl font-serif text-[#4a3f3f]">
            {currentLevelData.title}
          </h2>
        </div>

        {/* 剧情文字 */}
        <div className="mb-6 p-5 bg-white/80 rounded-2xl border border-[#e8e0dd]">
          <p className="text-[#4a3f3f] text-sm leading-relaxed whitespace-pre-line">
            {currentLevelData.narrative}
          </p>
        </div>

        {/* 选择区域 */}
        <div className="space-y-3">
          {!showFeedback &&
            currentLevelData.choices.map((choice) => (
              <ChoiceCard
                key={choice.id}
                text={choice.text}
                onClick={() => makeChoice(choice)}
              />
            ))}

          {/* 反馈 */}
          {showFeedback && selectedChoice && (
            <>
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

              <FeedbackBox
                text={selectedChoice.feedback}
                isAwakening={selectedChoice.isAwakening}
              />

              {selectedChoice.isAwakening && (
                <InsightBox text={currentLevelData.awakeningInsight} />
              )}

              <Button
                onClick={nextLevel}
                className="w-full mt-4 py-6 bg-gradient-to-r from-[#e8b4b8] to-[#c9b8d4] hover:from-[#dea0a4] hover:to-[#b9a5c5] text-white rounded-xl font-medium"
              >
                {state.currentLevel < gameLevels.length - 1
                  ? "继续旅程"
                  : "查看觉醒报告"}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// 觉醒报告页面
export function ResultScreen({ onRestart }: { onRestart: () => void }) {
  const { state, growthStage, maxPoints, resetGame } = useGameState();

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
    <div className="min-h-screen bg-gradient-to-b from-[#faf8f5] to-[#f5f0f8] p-6">
      <div className="max-w-md mx-auto">
        {/* 标题 */}
        <div className="text-center mb-8 pt-8">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#e8b4b8] to-[#c9b8d4] flex items-center justify-center shadow-lg mb-4">
            <span className="text-3xl">🌸</span>
          </div>
          <h1 className="text-2xl font-serif text-[#4a3f3f] mb-2">觉醒报告</h1>
          <p className="text-[#6b5b5b] text-sm">你的亲密关系觉察之旅</p>
        </div>

        {/* 核心数据 */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white/80 rounded-xl p-4 text-center border border-[#e8e0dd]">
            <p className="text-2xl font-bold text-[#e8b4b8]">{state.totalPoints}</p>
            <p className="text-xs text-[#9b8b8b] mt-1">成长值</p>
          </div>
          <div className="bg-white/80 rounded-xl p-4 text-center border border-[#e8e0dd]">
            <p className="text-2xl font-bold text-[#c9b8d4]">{awakeningCount}</p>
            <p className="text-xs text-[#9b8b8b] mt-1">觉醒时刻</p>
          </div>
          <div className="bg-white/80 rounded-xl p-4 text-center border border-[#e8e0dd]">
            <p className="text-2xl font-bold text-[#e07a5f]">{duration}</p>
            <p className="text-xs text-[#9b8b8b] mt-1">分钟</p>
          </div>
        </div>

        {/* 成长阶段 */}
        <div className="bg-white/80 rounded-2xl p-5 mb-6 border border-[#e8e0dd]">
          <p className="text-xs text-[#9b8b8b] mb-2">你的成长阶段</p>
          <p className="text-lg font-serif text-[#4a3f3f] mb-1">
            {growthStage.title}
          </p>
          <p className="text-sm text-[#6b5b5b]">{growthStage.description}</p>
        </div>

        {/* 觉醒寄语 */}
        <div className="bg-gradient-to-br from-[#faf0ee] to-[#f5f0f8] rounded-2xl p-5 mb-6 border border-[#e8b4b8]/30">
          <p className="text-xs text-[#9b8b8b] mb-2">🌸 觉醒寄语</p>
          <p className="text-[#4a3f3f] text-sm leading-relaxed">
            {state.totalPoints >= 60
              ? "你已经开始真正看见自己。这份觉察，将成为你人生最珍贵的礼物。关系不再是填补，而是分享。爱自己会流动，成长自己会发生，生命自己会回应。"
              : state.totalPoints >= 30
              ? "觉察的种子已经在心中发芽。每一次向内看，都是一次成长。继续这份探索，你会发现更多的自己。"
              : "这是一场漫长的旅程。每一次痛苦，都是包装丑陋的礼物。当你准备好了，继续打开它。"}
          </p>
        </div>

        {/* 核心洞见 */}
        <div className="bg-white/80 rounded-2xl p-5 mb-8 border border-[#e8e0dd]">
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
          className="w-full py-6 border-[#e8b4b8] text-[#e8b4b8] hover:bg-[#faf0ee] rounded-xl"
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
