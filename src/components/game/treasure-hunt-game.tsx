"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  treasureLevels,
  hiddenCardFragments,
  fearCards,
  mirrorCards,
  finalMeditation,
  gameQuote,
  TOTAL_GEMS,
} from "@/lib/treasure-hunt-data";

interface Props {
  onBack: () => void;
}

export default function TreasureHuntGame({ onBack }: Props) {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [showReveal, setShowReveal] = useState(false);
  const [showGem, setShowGem] = useState(false);
  const [collectedGems, setCollectedGems] = useState<string[]>([]);
  const [collectedCards, setCollectedCards] = useState<string[]>([]);

  // 输入相关状态
  const [userInput, setUserInput] = useState("");
  const [traitInputs, setTraitInputs] = useState<string[]>(["", "", ""]);
  const [currentTraitIndex, setCurrentTraitIndex] = useState(0);
  const [drawnCard, setDrawnCard] = useState<typeof fearCards[0] | null>(null);
  const [mirrorCard, setMirrorCard] = useState<typeof mirrorCards[0] | null>(null);
  const [showFinalMeditation, setShowFinalMeditation] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const currentLevel = treasureLevels[currentLevelIndex];

  // 随机抽取恐惧卡片
  const randomFearCard = useMemo(() => {
    return fearCards[Math.floor(Math.random() * fearCards.length)];
  }, []);

  // 随机抽取镜子卡片
  const randomMirrorCard = useMemo(() => {
    return mirrorCards[Math.floor(Math.random() * mirrorCards.length)];
  }, []);

  const handleStartGame = useCallback(() => {
    setGameStarted(true);
    setCurrentLevelIndex(0);
    setShowReveal(false);
    setShowGem(false);
    setCollectedGems([]);
    setCollectedCards([]);
    setUserInput("");
    setTraitInputs(["", "", ""]);
    setCurrentTraitIndex(0);
    setDrawnCard(null);
    setMirrorCard(null);
    setShowFinalMeditation(false);
    setShowResult(false);
  }, []);

  const handleNextFromIntro = useCallback(() => {
    setShowReveal(true);
  }, []);

  const handleCollectGem = useCallback(() => {
    setCollectedGems((prev) => [...prev, currentLevel.gemName]);
    setCollectedCards((prev) => [...prev, hiddenCardFragments[currentLevelIndex]?.fragment || ""]);
    setShowGem(false);
    setShowReveal(false);
    setUserInput("");
    setTraitInputs(["", "", ""]);
    setCurrentTraitIndex(0);
    setDrawnCard(null);
    setMirrorCard(null);

    if (currentLevelIndex < treasureLevels.length - 1) {
      setCurrentLevelIndex((prev) => prev + 1);
    } else {
      setShowFinalMeditation(true);
    }
  }, [currentLevel.gemName, currentLevelIndex]);

  const handleLevelAction = useCallback(() => {
    // 序章
    if (currentLevelIndex === 0) {
      handleCollectGem();
      return;
    }

    // 第一关：输入遗憾
    if (currentLevelIndex === 1) {
      if (userInput.trim()) {
        setShowReveal(true);
      }
      return;
    }

    // 第二关：输入三个特质
    if (currentLevelIndex === 2) {
      if (currentTraitIndex < 2 && traitInputs[currentTraitIndex].trim()) {
        setCurrentTraitIndex((prev) => prev + 1);
      } else if (traitInputs[2].trim()) {
        setShowReveal(true);
      }
      return;
    }

    // 第三关：抽卡
    if (currentLevelIndex === 3) {
      if (!drawnCard) {
        setDrawnCard(randomFearCard);
      } else {
        setShowGem(true);
      }
      return;
    }

    // 第四关：镜子
    if (currentLevelIndex === 4) {
      if (!mirrorCard) {
        setMirrorCard(randomMirrorCard);
      } else {
        setShowGem(true);
      }
      return;
    }

    // 第五关：最终
    if (currentLevelIndex === 5) {
      setShowGem(true);
    }
  }, [currentLevelIndex, userInput, traitInputs, currentTraitIndex, drawnCard, mirrorCard, randomFearCard, randomMirrorCard, handleCollectGem]);

  const handleShowGem = useCallback(() => {
    setShowGem(true);
  }, []);

  // 序章页面
  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-900/90 via-yellow-900/80 to-orange-900/90 flex flex-col items-center justify-center p-6 text-white">
        <div className="max-w-md w-full text-center space-y-8">
          {/* 标题 */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-amber-300">🗺️ 生命寻宝</h1>
            <p className="text-amber-200/60 italic">你以为在寻找宝藏，其实是在寻找自己</p>
          </div>

          {/* 故事背景 */}
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 space-y-4 border border-amber-500/20">
            <p className="text-amber-100/90">你是一名探险家。</p>
            <p className="text-amber-100/90">收到了一封来自生命的信。</p>
            <div className="border-t border-amber-500/20 pt-4">
              <p className="text-amber-200/80 italic text-lg leading-relaxed">
                「生命里藏着五个宝藏。
                <br />
                找到它们。
                <br />
                你会认出真正的自己。」
              </p>
            </div>
          </div>

          {/* 宝藏预览 */}
          <div className="flex justify-center gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-12 h-12 rounded-full bg-amber-500/20 border-2 border-amber-400/30 flex items-center justify-center text-2xl"
              >
                ?
              </div>
            ))}
          </div>

          {/* 开始按钮 */}
          <button
            onClick={handleStartGame}
            className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 rounded-xl text-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-amber-900/30"
          >
            开始寻宝之旅
          </button>

          {/* 返回按钮 */}
          <button onClick={onBack} className="text-amber-300/50 hover:text-amber-300 text-sm">
            ← 返回游戏列表
          </button>
        </div>
      </div>
    );
  }

  // 最终冥想页面
  if (showFinalMeditation) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-900/90 via-yellow-900/80 to-orange-900/90 flex flex-col items-center justify-center p-6 text-white">
        <div className="max-w-md w-full space-y-6">
          {/* 标题 */}
          <div className="text-center space-y-2">
            <p className="text-amber-300/60">冥想时刻</p>
            <h2 className="text-3xl font-bold text-amber-200">{finalMeditation.title}</h2>
          </div>

          {/* 冥想内容 */}
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/20">
            <p className="text-amber-100/80 whitespace-pre-line leading-relaxed text-sm">
              {finalMeditation.content}
            </p>
          </div>

          {/* 隐藏卡片拼图 */}
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-4 border border-amber-500/20">
            <p className="text-center text-amber-200/80 text-lg">
              {collectedCards.join(" ")}
            </p>
          </div>

          {/* 按钮组 */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowFinalMeditation(false);
                setShowResult(true);
              }}
              className="flex-1 py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 rounded-xl font-bold transition-all"
            >
              查看收集的宝藏
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 结果页面
  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-900/90 via-yellow-900/80 to-orange-900/90 flex flex-col items-center justify-center p-6 text-white">
        <div className="max-w-md w-full space-y-6">
          {/* 标题 */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-amber-200">你找到了所有宝藏</h2>
            <p className="text-amber-300/60">每一次寻找，都是在认出自己</p>
          </div>

          {/* 收集的宝石 */}
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/20">
            <p className="text-center text-amber-200/60 mb-4">收集的宝石</p>
            <div className="flex justify-center gap-3">
              {collectedGems.map((gem, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1"
                >
                  <div className="w-12 h-12 rounded-full bg-amber-500/30 border-2 border-amber-400/50 flex items-center justify-center text-2xl">
                    💎
                  </div>
                  <span className="text-xs text-amber-200/60">{gem}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 隐藏卡片完整拼图 */}
          <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl p-5 border border-amber-400/30">
            <p className="text-center text-amber-100 text-xl leading-relaxed">
              {collectedCards.join(" ")}
            </p>
          </div>

          {/* 金句 */}
          <div className="text-center text-amber-300/80 italic">{gameQuote}</div>

          {/* 落款 */}
          <div className="text-center text-amber-300/50 text-sm pt-4 border-t border-amber-500/20">
            此刻花开 · 筱涵
          </div>

          {/* 按钮 */}
          <div className="flex gap-3">
            <button
              onClick={handleStartGame}
              className="flex-1 py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 rounded-xl font-bold transition-all"
            >
              重新开始
            </button>
            <button
              onClick={onBack}
              className="flex-1 py-3 bg-black/30 hover:bg-black/40 rounded-xl font-bold border border-amber-500/30 transition-all"
            >
              返回列表
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 显示宝石页面
  if (showGem) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-900/90 via-yellow-900/80 to-orange-900/90 flex flex-col items-center justify-center p-6 text-white">
        <div className="max-w-md w-full space-y-6 text-center">
          {/* 宝石动画 */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-5xl animate-pulse shadow-lg shadow-amber-500/50">
              {currentLevel.gemIcon}
            </div>
          </div>

          {/* 宝石名称 */}
          <div className="space-y-2">
            <p className="text-amber-300/60">你找到了</p>
            <h2 className="text-3xl font-bold text-amber-200">{currentLevel.gemName}</h2>
          </div>

          {/* 觉察内容 */}
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-5 border border-amber-500/20">
            <p className="text-amber-100/80 leading-relaxed">{currentLevel.gemInsight}</p>
          </div>

          {/* 隐藏卡片碎片 */}
          <div className="bg-amber-500/10 rounded-xl px-4 py-2 border border-amber-400/20">
            <p className="text-amber-300/80 text-sm">
              📜 获得碎片：「{hiddenCardFragments[currentLevelIndex]?.fragment}」
            </p>
          </div>

          {/* 继续按钮 */}
          <button
            onClick={handleCollectGem}
            className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 rounded-xl font-bold transition-all"
          >
            {currentLevelIndex < treasureLevels.length - 1 ? "继续寻宝" : "查看最终宝藏"}
          </button>
        </div>
      </div>
    );
  }

  // 揭示页面（输入后的反馈）
  if (showReveal && currentLevel.revealStory) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-900/90 via-yellow-900/80 to-orange-900/90 flex flex-col items-center justify-center p-6 text-white">
        <div className="max-w-md w-full space-y-6">
          {/* 关卡标题 */}
          <div className="text-center space-y-1">
            <p className="text-amber-300/60 text-sm">{currentLevel.stage}</p>
            <h2 className="text-2xl font-bold text-amber-200">{currentLevel.title}</h2>
          </div>

          {/* 揭示故事 */}
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-5 border border-amber-500/20">
            <p className="text-amber-100/80 whitespace-pre-line leading-relaxed">
              {currentLevel.revealStory}
            </p>
          </div>

          {/* 问题提示 */}
          {currentLevelIndex === 1 && (
            <div className="bg-amber-500/20 rounded-xl p-4 border border-amber-400/30">
              <p className="text-amber-200 text-center">这个遗憾教会了你什么？</p>
            </div>
          )}

          {currentLevelIndex === 2 && (
            <div className="bg-amber-500/20 rounded-xl p-4 border border-amber-400/30">
              <p className="text-amber-200 text-center">为什么夸别人容易，夸自己困难？</p>
            </div>
          )}

          {/* 继续按钮 */}
          <button
            onClick={handleShowGem}
            className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 rounded-xl font-bold transition-all"
          >
            收集宝石 💎
          </button>
        </div>
      </div>
    );
  }

  // 游戏关卡页面
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-900/90 via-yellow-900/80 to-orange-900/90 flex flex-col items-center justify-center p-6 text-white">
      <div className="max-w-md w-full space-y-6">
        {/* 进度显示 */}
        <div className="flex justify-center gap-2">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                i < currentLevelIndex
                  ? "bg-amber-500/50 border-2 border-amber-400"
                  : i === currentLevelIndex
                  ? "bg-amber-500/30 border-2 border-amber-300"
                  : "bg-black/30 border border-amber-500/30"
              }`}
            >
              {i < currentLevelIndex ? "✓" : i + 1}
            </div>
          ))}
        </div>

        {/* 关卡标题 */}
        <div className="text-center space-y-1">
          <p className="text-amber-300/60 text-sm">{currentLevel.stage}</p>
          <h2 className="text-2xl font-bold text-amber-200">{currentLevel.title}</h2>
          {currentLevel.subtitle && (
            <p className="text-amber-300/60 text-sm">{currentLevel.subtitle}</p>
          )}
        </div>

        {/* 故事内容 */}
        <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-5 border border-amber-500/20">
          <p className="text-amber-100/80 whitespace-pre-line leading-relaxed">
            {currentLevel.story}
          </p>
        </div>

        {/* 指引/输入区域 */}
        <div className="space-y-4">
          <p className="text-amber-200 text-center">{currentLevel.instruction}</p>

          {/* 序章：直接开始 */}
          {currentLevelIndex === 0 && (
            <button
              onClick={handleLevelAction}
              className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 rounded-xl font-bold transition-all"
            >
              开始寻宝
            </button>
          )}

          {/* 第一关：输入遗憾 */}
          {currentLevelIndex === 1 && (
            <div className="space-y-3">
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={currentLevel.inputPlaceholder}
                className="w-full h-32 bg-black/30 border border-amber-500/30 rounded-xl p-4 text-amber-100 placeholder-amber-300/40 focus:outline-none focus:border-amber-400/60 resize-none"
              />
              <button
                onClick={handleLevelAction}
                disabled={!userInput.trim()}
                className={`w-full py-3 rounded-xl font-bold transition-all ${
                  userInput.trim()
                    ? "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500"
                    : "bg-gray-600/50 cursor-not-allowed"
                }`}
              >
                写好了，继续
              </button>
            </div>
          )}

          {/* 第二关：输入三个特质 */}
          {currentLevelIndex === 2 && (
            <div className="space-y-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`transition-all ${i <= currentTraitIndex ? "opacity-100" : "opacity-40"}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-amber-400 text-sm">特质 {i + 1}</span>
                    {i < currentTraitIndex && <span className="text-green-400 text-sm">✓</span>}
                  </div>
                  <input
                    type="text"
                    value={traitInputs[i]}
                    onChange={(e) => {
                      const newInputs = [...traitInputs];
                      newInputs[i] = e.target.value;
                      setTraitInputs(newInputs);
                    }}
                    placeholder={`第${i + 1}个特质...`}
                    disabled={i > currentTraitIndex}
                    className={`w-full bg-black/30 border border-amber-500/30 rounded-xl p-3 text-amber-100 placeholder-amber-300/40 focus:outline-none focus:border-amber-400/60 ${
                      i > currentTraitIndex ? "cursor-not-allowed" : ""
                    }`}
                  />
                </div>
              ))}
              <button
                onClick={handleLevelAction}
                disabled={!traitInputs[currentTraitIndex].trim()}
                className={`w-full py-3 rounded-xl font-bold transition-all ${
                  traitInputs[currentTraitIndex].trim()
                    ? "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500"
                    : "bg-gray-600/50 cursor-not-allowed"
                }`}
              >
                {currentTraitIndex < 2 ? "下一个特质" : "写好了，继续"}
              </button>
            </div>
          )}

          {/* 第三关：抽卡 */}
          {currentLevelIndex === 3 && (
            <div className="space-y-4">
              {!drawnCard ? (
                <button
                  onClick={handleLevelAction}
                  className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 rounded-xl font-bold transition-all"
                >
                  抽取卡片 🎴
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-amber-500/30 to-orange-500/30 rounded-2xl p-5 border border-amber-400/40 text-center">
                    <p className="text-amber-100 text-lg mb-3">{drawnCard.content}</p>
                    <p className="text-amber-300/80 text-sm italic">{drawnCard.insight}</p>
                  </div>
                  <button
                    onClick={handleLevelAction}
                    className="w-full py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 rounded-xl font-bold transition-all"
                  >
                    我看到了，继续 💎
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 第四关：镜子 */}
          {currentLevelIndex === 4 && (
            <div className="space-y-4">
              {!mirrorCard ? (
                <button
                  onClick={handleLevelAction}
                  className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 rounded-xl font-bold transition-all"
                >
                  听听别人眼中的你 🪞
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-amber-500/30 to-orange-500/30 rounded-2xl p-5 border border-amber-400/40 text-center">
                    <p className="text-amber-300/60 text-sm mb-2">有人对你说：</p>
                    <p className="text-amber-100 text-xl mb-3">"{mirrorCard.content}"</p>
                    <p className="text-amber-300/80 text-sm italic">{mirrorCard.insight}</p>
                  </div>
                  <button
                    onClick={handleLevelAction}
                    className="w-full py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 rounded-xl font-bold transition-all"
                  >
                    我被看见了 💎
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 第五关：最终揭示 */}
          {currentLevelIndex === 5 && (
            <button
              onClick={handleLevelAction}
              className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 rounded-xl font-bold transition-all"
            >
              打开最后一封信 📜
            </button>
          )}
        </div>

        {/* 返回按钮 */}
        <button
          onClick={onBack}
          className="w-full text-center text-amber-300/50 hover:text-amber-300 text-sm"
        >
          ← 返回游戏列表
        </button>
      </div>
    </div>
  );
}
