'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  behaviorScenarios,
  behaviorTypes,
  severityLevels,
  generateBehaviorReport,
  behaviorInsights,
  type BehaviorScenario
} from '@/lib/behavior-data';

// 开始页面
function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative bg-gradient-to-b from-[#1a1625] via-[#2d2640] to-[#1a1625]">
      {/* 标题 */}
      <div className="text-center mb-6">
        <span className="text-4xl mb-3 block">🔍</span>
        <h1 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
          四种偏差行为识别
        </h1>
        <p className="text-white/60 text-sm">
          理解行为背后的需求
        </p>
      </div>

      {/* 四种类型卡片 */}
      <div className="grid grid-cols-2 gap-3 mb-6 w-full max-w-md">
        {behaviorTypes.map((type) => (
          <div
            key={type.id}
            className={`bg-gradient-to-br ${type.color}/20 backdrop-blur-sm rounded-xl p-3 border border-white/20`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{type.icon}</span>
              <span className="text-white font-medium text-sm">{type.name}</span>
            </div>
            <p className="text-white/50 text-xs">{type.subtitle}</p>
          </div>
        ))}
      </div>

      {/* 说明 */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-6 max-w-md border border-white/20">
        <p className="text-white/80 text-sm text-center leading-relaxed">
          所有偏差行为，本质都不是攻击，<br/>
          而是没有被满足的需求。
        </p>
      </div>

      {/* 严重程度说明 */}
      <div className="flex gap-2 mb-8 max-w-md">
        {severityLevels.map((level) => (
          <div key={level.id} className="flex-1 text-center">
            <div className={`${level.color} w-3 h-3 rounded-full mx-auto mb-1`} />
            <span className="text-white/60 text-xs">{level.name}</span>
          </div>
        ))}
      </div>

      {/* 开始按钮 */}
      <button
        onClick={onStart}
        className="bg-gradient-to-r from-blue-400 to-purple-400 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
      >
        开始识别
      </button>
    </div>
  );
}

// 游戏页面
function GameScreen({
  scenario,
  onAnswer,
  progress
}: {
  scenario: BehaviorScenario;
  onAnswer: (typeId: string, severityId: string) => void;
  progress: number;
}) {
  const [step, setStep] = useState<'type' | 'severity'>('type');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null);

  // 当场景变化时重置状态
  useEffect(() => {
    setStep('type');
    setSelectedType(null);
    setSelectedSeverity(null);
  }, [scenario.id]);

  const handleTypeSelect = (typeId: string) => {
    if (selectedType) return;
    setSelectedType(typeId);
  };

  const handleNextStep = () => {
    if (selectedType) {
      setStep('severity');
    }
  };

  const handleSeveritySelect = (severityId: string) => {
    if (selectedSeverity) return;
    setSelectedSeverity(severityId);
  };

  const handleSubmit = () => {
    if (selectedType && selectedSeverity) {
      onAnswer(selectedType, selectedSeverity);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 relative bg-gradient-to-b from-[#1a1625] via-[#2d2640] to-[#1a1625]">
      {/* 进度条 */}
      <div className="w-full bg-white/10 rounded-full h-2 mb-6">
        <div
          className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 关卡标题 */}
      <div className="text-center mb-4">
        <h2 className="text-lg font-bold text-white drop-shadow-lg">
          第{scenario.id}关 · {scenario.title}
        </h2>
      </div>

      {/* 场景描述 */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 mb-6 border border-white/20">
        <p className="text-white leading-relaxed text-sm">
          {scenario.scenario}
        </p>
      </div>

      {/* 第一步：选择类型 */}
      {step === 'type' && (
        <>
          <p className="text-white/60 text-sm mb-3 text-center">这是哪种偏差行为？</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {behaviorTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => handleTypeSelect(type.id)}
                className={`p-4 rounded-xl text-left transition-all ${
                  selectedType === type.id
                    ? `bg-gradient-to-br ${type.color}/40 border-2 border-white/50`
                    : selectedType
                    ? 'bg-white/5 border border-white/10 opacity-50'
                    : 'bg-white/10 border border-white/20 hover:bg-white/20'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{type.icon}</span>
                  <span className="text-white font-medium text-sm">{type.name}</span>
                </div>
                <p className="text-white/50 text-xs">{type.subtitle}</p>
              </button>
            ))}
          </div>
          
          {selectedType && (
            <button
              onClick={handleNextStep}
              className="w-full bg-gradient-to-r from-blue-400 to-purple-400 text-white py-3 rounded-xl font-medium"
            >
              下一步 →
            </button>
          )}
        </>
      )}

      {/* 第二步：选择严重程度 */}
      {step === 'severity' && (
        <>
          <p className="text-white/60 text-sm mb-3 text-center">严重程度是？</p>
          <div className="space-y-3 mb-6">
            {severityLevels.map((level) => (
              <button
                key={level.id}
                onClick={() => handleSeveritySelect(level.id)}
                className={`w-full p-4 rounded-xl text-left transition-all ${
                  selectedSeverity === level.id
                    ? `${level.color}/30 border-2 ${level.textColor.replace('text-', 'border-')}`
                    : selectedSeverity
                    ? 'bg-white/5 border border-white/10 opacity-50'
                    : 'bg-white/10 border border-white/20 hover:bg-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`${level.color} w-3 h-3 rounded-full`} />
                  <div>
                    <span className="text-white font-medium">{level.name}</span>
                    <span className="text-white/50 text-sm ml-2">({level.subtitle})</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          {selectedSeverity && (
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-400 to-purple-400 text-white py-3 rounded-xl font-medium"
            >
              提交答案
            </button>
          )}
          
          <button
            onClick={() => setStep('type')}
            className="w-full mt-2 text-white/60 text-sm"
          >
            ← 返回上一步
          </button>
        </>
      )}
    </div>
  );
}

// 反馈页面
function FeedbackScreen({
  scenario,
  selectedType,
  selectedSeverity,
  onNext,
  isLast
}: {
  scenario: BehaviorScenario;
  selectedType: string;
  selectedSeverity: string;
  onNext: () => void;
  isLast: boolean;
}) {
  const isTypeCorrect = selectedType === scenario.behaviorType;
  const isSeverityCorrect = selectedSeverity === scenario.severity;
  const behaviorType = behaviorTypes.find(t => t.id === scenario.behaviorType);
  const severityLevel = severityLevels.find(s => s.id === scenario.severity);

  return (
    <div className="min-h-screen flex flex-col p-4 relative bg-gradient-to-b from-[#1a1625] via-[#2d2640] to-[#1a1625]">
      {/* 结果标题 */}
      <div className="text-center mb-6 pt-4">
        <div className="text-4xl mb-2">
          {isTypeCorrect && isSeverityCorrect ? '🎉' : isTypeCorrect ? '👍' : '💡'}
        </div>
        <h2 className="text-xl font-bold text-white">
          {isTypeCorrect && isSeverityCorrect ? '完全正确！' : isTypeCorrect ? '类型正确！' : '继续学习'}
        </h2>
      </div>

      {/* 你的答案 vs 正确答案 */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 mb-4 border border-white/20">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-white/50 text-xs mb-2">你的答案</p>
            <div className="flex items-center gap-2">
              <span className="text-lg">{behaviorTypes.find(t => t.id === selectedType)?.icon}</span>
              <span className="text-white text-sm">{behaviorTypes.find(t => t.id === selectedType)?.name}</span>
            </div>
            <p className="text-white/60 text-xs mt-1">
              {severityLevels.find(s => s.id === selectedSeverity)?.name}
            </p>
          </div>
          <div>
            <p className="text-white/50 text-xs mb-2">正确答案</p>
            <div className="flex items-center gap-2">
              <span className="text-lg">{behaviorType?.icon}</span>
              <span className="text-white text-sm">{behaviorType?.name}</span>
            </div>
            <p className={`${severityLevel?.textColor} text-xs mt-1`}>
              {severityLevel?.name}
            </p>
          </div>
        </div>
      </div>

      {/* 行为解释 */}
      <div className={`bg-gradient-to-br ${behaviorType?.color}/20 backdrop-blur-sm rounded-2xl p-5 mb-4 border border-white/20`}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">{behaviorType?.icon}</span>
          <div>
            <h3 className="text-white font-medium">{behaviorType?.name}</h3>
            <p className="text-white/50 text-xs">{behaviorType?.subtitle}</p>
          </div>
        </div>
        <p className="text-white/80 text-sm leading-relaxed">
          {scenario.explanation}
        </p>
      </div>

      {/* 核心感受和真正需求 */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 mb-6 border border-white/20">
        <div className="mb-3">
          <p className="text-white/50 text-xs mb-1">💔 核心感受</p>
          <p className="text-white text-sm">{scenario.coreFeeling}</p>
        </div>
        <div>
          <p className="text-white/50 text-xs mb-1">💗 真正需求</p>
          <p className="text-white text-sm italic">"{scenario.realNeed}"</p>
        </div>
      </div>

      {/* 下一步按钮 */}
      <button
        onClick={onNext}
        className="w-full bg-gradient-to-r from-blue-400 to-purple-400 text-white py-3 rounded-xl font-medium"
      >
        {isLast ? '查看报告' : '下一关 →'}
      </button>
    </div>
  );
}

// 结果页面
function ResultScreen({
  score,
  total,
  answers,
  onRestart,
  onBack
}: {
  score: number;
  total: number;
  answers: { typeId: string; severityId: string; isCorrectType: boolean; isCorrectSeverity: boolean }[];
  onRestart: () => void;
  onBack: () => void;
}) {
  const report = generateBehaviorReport(score, total, answers);
  const insightIndex = score % behaviorInsights.length;

  return (
    <div className="min-h-screen flex flex-col p-4 relative overflow-y-auto bg-gradient-to-b from-[#1a1625] via-[#2d2640] to-[#1a1625]">
      {/* 返回按钮 */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 text-white/60 hover:text-white text-sm z-10"
      >
        ← 返回首页
      </button>

      {/* 标题 */}
      <div className="text-center pt-12 pb-4">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center shadow-xl mb-4">
          <span className="text-3xl">{report.stage.icon}</span>
        </div>
        <h1 className="text-xl font-bold text-white mb-2 drop-shadow-lg">
          偏差行为识别报告
        </h1>
      </div>

      {/* 分数展示 */}
      <div className="bg-gradient-to-br from-blue-500/30 to-purple-500/30 backdrop-blur-md rounded-2xl p-6 mb-5 border border-white/30 shadow-xl text-center">
        <p className="text-white/80 text-sm mb-2">识别准确率</p>
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-white/20"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-blue-400"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeDasharray={`${report.percentage}, 100`}
              strokeLinecap="round"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-white">{report.score}/{report.total}</div>
            <div className="text-white/60 text-xs">{report.percentage}%</div>
          </div>
        </div>
        <p className="text-lg text-white font-medium">{report.stage.title}</p>
        <p className="text-white/60 text-sm">{report.stage.description}</p>
      </div>

      {/* 类型统计 */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {behaviorTypes.map((type) => {
          const stats = report.typeStats[type.id as keyof typeof report.typeStats];
          const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
          return (
            <div
              key={type.id}
              className={`bg-gradient-to-br ${type.color}/20 backdrop-blur-md rounded-xl p-3 border border-white/20`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{type.icon}</span>
                <span className="text-white text-sm font-medium">{type.name}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/60">{stats.correct}/{stats.total} 正确</span>
                <span className="text-white/80">{accuracy}%</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 建议 */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-4 border border-white/20">
        <h3 className="text-white font-medium text-sm mb-3">💡 成长建议</h3>
        <ul className="space-y-2">
          {report.suggestions.map((s, i) => (
            <li key={i} className="text-white/70 text-xs flex items-start gap-2">
              <span>•</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 金句 */}
      <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-white/10">
        <p className="text-white/90 text-sm text-center italic leading-relaxed">
          "{behaviorInsights[insightIndex]}"
        </p>
      </div>

      {/* 按钮 */}
      <button
        onClick={onRestart}
        className="w-full bg-gradient-to-r from-blue-400 to-purple-400 text-white py-3 rounded-xl font-medium shadow-lg mb-3"
      >
        再测一次
      </button>
      <button
        onClick={onBack}
        className="w-full bg-white/10 text-white/80 py-3 rounded-xl font-medium border border-white/20"
      >
        返回游戏列表
      </button>

      {/* 落款 */}
      <div className="text-center mt-6 text-white/40 text-xs">
        此刻花开 · 筱涵
      </div>
    </div>
  );
}

// 主游戏组件
export function BehaviorGame({ onBack }: { onBack: () => void }) {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'feedback' | 'result'>('start');
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{ typeId: string; severityId: string; isCorrectType: boolean; isCorrectSeverity: boolean }[]>([]);
  const [lastAnswer, setLastAnswer] = useState<{ typeId: string; severityId: string } | null>(null);

  // 选择8个场景用于游戏
  const selectedScenarios = useMemo(() => {
    // 从每种类型中各选2个场景
    const scenarios: BehaviorScenario[] = [];
    const types = ['attention', 'power', 'revenge', 'giving_up'] as const;
    types.forEach(type => {
      const typeScenarios = behaviorScenarios.filter(s => s.behaviorType === type);
      scenarios.push(typeScenarios[0]); // 轻度
      scenarios.push(typeScenarios[2]); // 重度
    });
    return scenarios;
  }, []);

  const handleStart = useCallback(() => {
    setGameState('playing');
    setCurrentLevel(0);
    setScore(0);
    setAnswers([]);
    setLastAnswer(null);
  }, []);

  const handleAnswer = useCallback((typeId: string, severityId: string) => {
    const scenario = selectedScenarios[currentLevel];
    const isCorrectType = typeId === scenario.behaviorType;
    const isCorrectSeverity = severityId === scenario.severity;
    
    setAnswers(prev => [...prev, { typeId, severityId, isCorrectType, isCorrectSeverity }]);
    setLastAnswer({ typeId, severityId });
    
    // 计分：类型正确得1分，严重程度正确得1分
    if (isCorrectType && isCorrectSeverity) {
      setScore(prev => prev + 2);
    } else if (isCorrectType) {
      setScore(prev => prev + 1);
    }
    
    setGameState('feedback');
  }, [currentLevel, selectedScenarios]);

  const handleNext = useCallback(() => {
    if (currentLevel < selectedScenarios.length - 1) {
      setCurrentLevel(prev => prev + 1);
      setGameState('playing');
      setLastAnswer(null);
    } else {
      setGameState('result');
    }
  }, [currentLevel, selectedScenarios.length]);

  if (gameState === 'start') {
    return <StartScreen onStart={handleStart} />;
  }

  if (gameState === 'playing') {
    const scenario = selectedScenarios[currentLevel];
    const progress = ((currentLevel + 1) / selectedScenarios.length) * 100;
    return (
      <GameScreen
        scenario={scenario}
        onAnswer={handleAnswer}
        progress={progress}
      />
    );
  }

  if (gameState === 'feedback' && lastAnswer) {
    const scenario = selectedScenarios[currentLevel];
    const isLast = currentLevel === selectedScenarios.length - 1;
    return (
      <FeedbackScreen
        scenario={scenario}
        selectedType={lastAnswer.typeId}
        selectedSeverity={lastAnswer.severityId}
        onNext={handleNext}
        isLast={isLast}
      />
    );
  }

  if (gameState === 'result') {
    return (
      <ResultScreen
        score={score}
        total={selectedScenarios.length * 2}
        answers={answers}
        onRestart={handleStart}
        onBack={onBack}
      />
    );
  }

  return null;
}
