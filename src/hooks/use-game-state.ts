"use client";

import { useState, useCallback } from "react";
import { gameLevels, getGrowthStage, type Choice } from "@/lib/game-data";

export interface GameState {
  currentLevel: number;
  totalPoints: number;
  choices: string[]; // 记录玩家的选择ID
  isComplete: boolean;
  startedAt: number | null;
  completedAt: number | null;
}

const initialState: GameState = {
  currentLevel: 0,
  totalPoints: 0,
  choices: [],
  isComplete: false,
  startedAt: null,
  completedAt: null,
};

export function useGameState() {
  const [state, setState] = useState<GameState>(initialState);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);

  // 开始游戏
  const startGame = useCallback(() => {
    setState({
      ...initialState,
      startedAt: Date.now(),
    });
  }, []);

  // 做出选择
  const makeChoice = useCallback((choice: Choice) => {
    setSelectedChoice(choice);
    setShowFeedback(true);
  }, []);

  // 继续下一关
  const nextLevel = useCallback(() => {
    if (!selectedChoice) return;

    setState((prev) => {
      const newLevel = prev.currentLevel + 1;
      const isComplete = newLevel >= gameLevels.length;
      
      return {
        ...prev,
        currentLevel: newLevel,
        totalPoints: prev.totalPoints + selectedChoice.growthPoint,
        choices: [...prev.choices, selectedChoice.id],
        isComplete,
        completedAt: isComplete ? Date.now() : prev.completedAt,
      };
    });
    
    setShowFeedback(false);
    setSelectedChoice(null);
  }, [selectedChoice]);

  // 重新开始
  const resetGame = useCallback(() => {
    setState(initialState);
    setShowFeedback(false);
    setSelectedChoice(null);
  }, []);

  // 获取当前关卡
  const currentLevelData = state.currentLevel < gameLevels.length 
    ? gameLevels[state.currentLevel] 
    : null;

  // 获取成长阶段
  const growthStage = getGrowthStage(state.totalPoints);

  // 计算最高可能分数
  const maxPoints = gameLevels.reduce((sum, level) => {
    const maxChoice = level.choices.reduce((max, c) => Math.max(max, c.growthPoint), 0);
    return sum + maxChoice;
  }, 0);

  return {
    state,
    currentLevelData,
    growthStage,
    showFeedback,
    selectedChoice,
    maxPoints,
    startGame,
    makeChoice,
    nextLevel,
    resetGame,
  };
}
