'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { parentChildLevels, ParentChildChoice, ParentChildLevel, generateParentChildReport, parentChildInsights } from '@/lib/parent-child-data';

// 场景图片
const SCENE_IMAGES = {
  cover: '/assets/封面.png',
  littlePrince: '/assets/小王子版.png',
  innerPage: '/assets/内页.png',
  meditation: '/assets/冥想画面.png',
  starry: '/assets/星空版.png',
};

// 内联组件定义（避免 Turbopack 缓存问题）
function TypewriterText({ text, speed = 30, onComplete }: { text: string; speed?: number; onComplete?: () => void }) {
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
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed, onComplete]);

  return (
    <span>
      {displayedText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </span>
  );
}

function FloatingParticles({ emotion = 'calm' }: { emotion?: 'calm' | 'tense' | 'warm' | 'reflect' }) {
  const particleColors = {
    calm: 'bg-pink-200/30',
    tense: 'bg-orange-200/30',
    warm: 'bg-yellow-200/30',
    reflect: 'bg-purple-200/30',
  };

  const particles = useMemo(() => 
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${(i * 7) % 100}%`,
      top: `${(i * 11) % 100}%`,
      delay: `${i * 0.5}s`,
      duration: `${4 + (i % 4)}s`,
    })),
  []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute w-2 h-2 rounded-full animate-float ${particleColors[emotion]}`}
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}
    </div>
  );
}

function GlowEffect({ color = '#e8b4b8' }: { color?: string }) {
  return (
    <div
      className="absolute w-64 h-64 rounded-full blur-3xl opacity-20 animate-pulse"
      style={{ backgroundColor: color }}
    />
  );
}

// 游戏状态类型
interface GameState {
  currentLevel: number;
  currentScene: number;
  totalPoints: number;
  choices: Array<{
    levelId: number;
    sceneId: string;
    choiceId: string;
    choice: ParentChildChoice;
  }>;
  isComplete: boolean;
  showFeedback: boolean;
  currentChoice: ParentChildChoice | null;
}

// 开始界面
function StartScreen({ onStart, onBack }: { onStart: () => void; onBack?: () => void }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* 返回按钮 */}
      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-4 left-4 z-20 p-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
        >
          <span className="text-white/70 text-sm">← 返回</span>
        </button>
      )}
      {/* 背景 */}
      <div className="absolute inset-0">
        <Image
          src={SCENE_IMAGES.littlePrince}
          alt="背景"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1625]/70 via-[#2d2640]/60 to-[#1a1625]/80" />
      </div>

      <FloatingParticles emotion="calm" />

      {/* 内容 */}
      <div className={`relative z-10 flex flex-col items-center justify-center min-h-screen px-6 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center max-w-md">
          {/* 图标 */}
          <div className="text-6xl mb-6 animate-bounce">👁️</div>
          
          {/* 标题 */}
          <h1 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">
            看见孩子，看见自己
          </h1>
          
          <p className="text-xl text-white/80 mb-6 drop-shadow-md">
            亲子观察练习
          </p>

          {/* 副标题 */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 mb-8 border border-white/20">
            <p className="text-white/90 text-sm leading-relaxed">
              每天10分钟
            </p>
            <p className="text-white/70 text-sm mt-2">
              不教育 · 不纠正 · 不讲道理
            </p>
            <p className="text-[#e8b4b8] text-sm mt-2 font-medium">
              只是观察 💜
            </p>
          </div>

          {/* 观察维度 */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {['💗 情绪', '👁️ 眼神', '💬 表达'].map((item, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-white/80 text-xs border border-white/10"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                {item}
              </div>
            ))}
          </div>

          {/* 开始按钮 */}
          <button
            onClick={onStart}
            className="w-full py-4 bg-gradient-to-r from-[#e8b4b8] to-[#c9b8d4] text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-white/30"
          >
            开始观察之旅
          </button>

          <p className="text-white/50 text-xs mt-6">
            每一个被看见的孩子，都会更有力量地长大 💜
          </p>
        </div>
      </div>
    </div>
  );
}

// 游戏界面
function GameScreen({
  state,
  onChoice,
  onNext,
}: {
  state: GameState;
  onChoice: (choice: ParentChildChoice) => void;
  onNext: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [textComplete, setTextComplete] = useState(false);

  const currentLevel = parentChildLevels[state.currentLevel];
  const currentScene = currentLevel?.scenes[state.currentScene];

  useEffect(() => {
    setMounted(true);
    setTextComplete(false);
  }, [state.currentLevel, state.currentScene]);

  // useCallback 必须在条件返回之前调用
  const handleTextComplete = useCallback(() => {
    setTextComplete(true);
  }, []);

  if (!currentLevel || !currentScene) return null;

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* 背景 */}
      <div className="absolute inset-0">
        <Image
          src={currentScene.sceneImage || SCENE_IMAGES.innerPage}
          alt="场景"
          fill
          className="object-cover transition-all duration-700"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1625]/80 via-[#2d2640]/70 to-[#1a1625]/90" />
      </div>

      <FloatingParticles emotion={currentScene.emotion || 'calm'} />

      {/* 进度条 */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4">
        <div className="flex items-center gap-2 text-white/60 text-xs mb-2">
          <span>{currentLevel.themeIcon}</span>
          <span>{currentLevel.theme}</span>
        </div>
        <div className="h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#e8b4b8] to-[#c9b8d4] transition-all duration-500"
            style={{
              width: `${((state.currentLevel * 2 + state.currentScene) / 12) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* 内容 */}
      <div className={`relative z-10 flex flex-col justify-center min-h-screen px-5 pt-16 pb-8 transition-all duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-md mx-auto w-full">
          {/* 关卡标题 */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-white drop-shadow-lg mb-1">
              {currentLevel.title}
            </h2>
            <p className="text-white/60 text-sm">{currentScene.subtitle}</p>
          </div>

          {/* 场景卡片 */}
          {!state.showFeedback ? (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 mb-6">
              <p className="text-white/90 leading-relaxed text-sm mb-4">
                <TypewriterText text={currentScene.scenario} speed={30} onComplete={handleTextComplete} />
              </p>
              {textComplete && (
                <div className="bg-[#e8b4b8]/20 rounded-xl p-3 border border-[#e8b4b8]/30 animate-fadeIn">
                  <p className="text-[#e8b4b8] text-sm">
                    💡 {currentScene.observationPrompt}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4 mb-6">
              {/* 反馈 */}
              {state.currentChoice && (
                <>
                  <div className={`backdrop-blur-md rounded-2xl p-5 border ${
                    state.currentChoice.isAwakening
                      ? 'bg-[#e8b4b8]/20 border-[#e8b4b8]/40'
                      : 'bg-white/10 border-white/20'
                  } animate-fadeIn`}>
                    <div className="flex items-center gap-2 mb-3">
                      {state.currentChoice.isAwakening ? (
                        <span className="text-xl">✨</span>
                      ) : (
                        <span className="text-xl">💭</span>
                      )}
                      <span className={`text-sm font-medium ${
                        state.currentChoice.isAwakening ? 'text-[#e8b4b8]' : 'text-white/70'
                      }`}>
                        {state.currentChoice.isAwakening ? '觉察之光' : '常见的反应'}
                      </span>
                      {state.currentChoice.points > 0 && (
                        <span className="ml-auto text-white/60 text-xs">
                          +{state.currentChoice.points}
                        </span>
                      )}
                    </div>
                    <p className="text-white/90 text-sm leading-relaxed">
                      {state.currentChoice.feedback}
                    </p>
                    {state.currentChoice.insight && (
                      <p className="mt-3 text-[#c9b8d4] text-sm italic border-l-2 border-[#c9b8d4]/50 pl-3">
                        "{state.currentChoice.insight}"
                      </p>
                    )}
                  </div>
                </>
              )}

              {/* 下一步按钮 */}
              <button
                onClick={onNext}
                className="w-full py-4 bg-gradient-to-r from-[#e8b4b8] to-[#c9b8d4] text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                {state.currentScene < currentLevel.scenes.length - 1 || state.currentLevel < parentChildLevels.length - 1
                  ? '继续观察'
                  : '生成觉察报告'}
              </button>
            </div>
          )}

          {/* 选择卡片 */}
          {!state.showFeedback && textComplete && (
            <div className="space-y-3 animate-fadeIn">
              {currentScene.choices.map((choice, index) => (
                <button
                  key={choice.id}
                  onClick={() => onChoice(choice)}
                  className="w-full text-left p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 hover:border-[#e8b4b8]/50 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <p className="text-white/90 text-sm group-hover:text-white transition-colors">
                    {choice.text}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 结果界面
function ResultScreen({
  state,
  onRestart,
}: {
  state: GameState;
  onRestart: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'growth' | 'review' | 'practice'>('growth');

  useEffect(() => {
    setMounted(true);
  }, []);

  const report = generateParentChildReport(state.choices, state.totalPoints);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* 背景 */}
      <div className="absolute inset-0">
        <Image
          src={SCENE_IMAGES.starry}
          alt="背景"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1625]/80 via-[#2d2640]/70 to-[#1a1625]/90" />
      </div>

      <FloatingParticles emotion="warm" />

      {/* 内容 */}
      <div className={`relative z-10 flex flex-col items-center justify-center min-h-screen px-5 py-8 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-md w-full">
          {/* 标题 */}
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">🌟</div>
            <h1 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
              觉察报告
            </h1>
            <p className="text-white/60 text-sm">
              你对自己的观察有了新的发现
            </p>
          </div>

          {/* 成长环 */}
          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${report.percentage * 3.52} 352`}
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#e8b4b8" />
                    <stop offset="100%" stopColor="#c9b8d4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{report.percentage}%</div>
                  <div className="text-xs text-white/60">觉察指数</div>
                </div>
              </div>
            </div>
          </div>

          {/* 成长寄语 */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-6 border border-white/20">
            <p className="text-white/90 text-sm text-center leading-relaxed">
              {report.growthMessage}
            </p>
          </div>

          {/* Tab 切换 */}
          <div className="flex gap-2 mb-4">
            {[
              { key: 'growth', label: '觉察洞察', icon: '💜' },
              { key: 'review', label: '选择回顾', icon: '📝' },
              { key: 'practice', label: '练习建议', icon: '🌱' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-medium transition-all duration-300 ${
                  activeTab === tab.key
                    ? 'bg-[#e8b4b8]/30 text-white border border-[#e8b4b8]/50'
                    : 'bg-white/10 text-white/60 border border-white/10'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 内容 */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 mb-6 max-h-[280px] overflow-y-auto">
            {activeTab === 'growth' && (
              <div className="space-y-4">
                {/* 收集的洞察 */}
                {report.collectedInsights.length > 0 && (
                  <div>
                    <h3 className="text-white/80 text-sm font-medium mb-2">💎 觉察金句</h3>
                    <div className="space-y-2">
                      {report.collectedInsights.map((insight, i) => (
                        <p key={i} className="text-white/70 text-xs leading-relaxed pl-3 border-l-2 border-[#c9b8d4]/50 italic">
                          "{insight}"
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* 更多洞察 */}
                <div>
                  <h3 className="text-white/80 text-sm font-medium mb-2">💡 更多觉察</h3>
                  <div className="space-y-2">
                    {parentChildInsights.slice(0, 3).map((insight, i) => (
                      <p key={i} className="text-white/60 text-xs leading-relaxed">
                        · {insight}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'review' && (
              <div className="space-y-3">
                {state.choices.map((c, i) => {
                  const level = parentChildLevels[c.levelId];
                  return (
                    <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/10">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-white/50">{level?.themeIcon}</span>
                        <span className="text-xs text-white/50">{level?.theme}</span>
                        {c.choice.isAwakening && (
                          <span className="ml-auto text-[#e8b4b8] text-xs">✨ 觉察</span>
                        )}
                      </div>
                      <p className="text-white/80 text-xs leading-relaxed">
                        {c.choice.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === 'practice' && (
              <div className="space-y-3">
                {report.suggestions.map((s, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/10">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white/80 text-sm font-medium">{s.title}</span>
                      <span className="ml-auto text-[#c9b8d4] text-xs">{s.duration}</span>
                    </div>
                    <p className="text-white/60 text-xs leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 重新开始 */}
          <button
            onClick={onRestart}
            className="w-full py-4 bg-white/10 backdrop-blur-sm text-white font-medium rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            重新开始
          </button>

          <p className="text-center text-white/40 text-xs mt-4">
            每一个被看见的孩子，都会更有力量地长大 💜
          </p>
        </div>
      </div>
    </div>
  );
}

// 主容器组件
interface ParentChildGameProps {
  onBack?: () => void;
}

export function ParentChildGame({ onBack }: ParentChildGameProps) {
  const [state, setState] = useState<GameState>({
    currentLevel: 0,
    currentScene: 0,
    totalPoints: 0,
    choices: [],
    isComplete: false,
    showFeedback: false,
    currentChoice: null,
  });

  const handleStart = () => {
    setState({
      currentLevel: 0,
      currentScene: 0,
      totalPoints: 0,
      choices: [],
      isComplete: false,
      showFeedback: false,
      currentChoice: null,
    });
  };

  const handleChoice = (choice: ParentChildChoice) => {
    setState((prev) => ({
      ...prev,
      totalPoints: prev.totalPoints + choice.points,
      choices: [
        ...prev.choices,
        {
          levelId: prev.currentLevel,
          sceneId: parentChildLevels[prev.currentLevel].scenes[prev.currentScene].id,
          choiceId: choice.id,
          choice,
        },
      ],
      showFeedback: true,
      currentChoice: choice,
    }));
  };

  const handleNext = () => {
    const currentLevel = parentChildLevels[state.currentLevel];
    const isLastScene = state.currentScene >= currentLevel.scenes.length - 1;
    const isLastLevel = state.currentLevel >= parentChildLevels.length - 1;

    if (isLastScene && isLastLevel) {
      setState((prev) => ({
        ...prev,
        isComplete: true,
        showFeedback: false,
        currentChoice: null,
      }));
    } else if (isLastScene) {
      setState((prev) => ({
        ...prev,
        currentLevel: prev.currentLevel + 1,
        currentScene: 0,
        showFeedback: false,
        currentChoice: null,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        currentScene: prev.currentScene + 1,
        showFeedback: false,
        currentChoice: null,
      }));
    }
  };

  // 开始界面
  if (state.choices.length === 0 && !state.showFeedback) {
    return <StartScreen onStart={handleStart} onBack={onBack} />;
  }

  // 结果界面
  if (state.isComplete) {
    return <ResultScreen state={state} onRestart={handleStart} />;
  }

  // 游戏界面
  return <GameScreen state={state} onChoice={handleChoice} onNext={handleNext} />;
}
