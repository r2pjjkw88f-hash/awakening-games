"use client";

import { useState, useEffect } from "react";
import { StartScreen, GameScreen, ResultScreen } from "./screens";
import { gameLevels } from "@/lib/game-data";

type GamePhase = "start" | "playing" | "result";

export function GameContainer() {
  const [phase, setPhase] = useState<GamePhase>("start");

  return (
    <>
      {phase === "start" && (
        <StartScreen onStart={() => setPhase("playing")} />
      )}
      {phase === "playing" && <GameScreenWrapper onComplete={() => setPhase("result")} />}
      {phase === "result" && (
        <ResultScreen onRestart={() => setPhase("start")} />
      )}
    </>
  );
}

// 包装 GameScreen 以检测游戏完成
function GameScreenWrapper({ onComplete }: { onComplete: () => void }) {
  const [currentLevel, setCurrentLevel] = useState(0);

  // 监听关卡变化，当关卡数超过总关卡数时触发完成
  useEffect(() => {
    if (currentLevel >= gameLevels.length) {
      onComplete();
    }
  }, [currentLevel, onComplete]);

  return <GameScreen onLevelChange={setCurrentLevel} />;
}
