"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect, useMemo } from "react";

interface ProgressProps {
  current: number;
  total: number;
}

export function Progress({ current, total }: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-[#6b5b5b]">觉醒之旅</span>
        <span className="text-xs text-[#6b5b5b]">
          {current} / {total}
        </span>
      </div>
      <div className="h-1.5 bg-[#f0e8e6] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#e8b4b8] to-[#c9b8d4] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

interface GrowthPointsProps {
  points: number;
  maxPoints: number;
}

export function GrowthPoints({ points, maxPoints }: GrowthPointsProps) {
  const percentage = Math.min(100, Math.max(0, (points / maxPoints) * 100));

  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#e8b4b8] to-[#c9b8d4] flex items-center justify-center">
        <span className="text-white text-xs font-medium">{points}</span>
      </div>
      <div className="flex-1">
        <div className="h-1 bg-[#f0e8e6] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#e07a5f] rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}

interface ChoiceCardProps {
  text: string;
  isSelected?: boolean;
  isAwakening?: boolean;
  showResult?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export function ChoiceCard({
  text,
  isSelected,
  isAwakening,
  showResult,
  onClick,
  disabled,
}: ChoiceCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full p-4 rounded-xl text-left transition-all duration-300 border-2",
        "hover:shadow-md hover:-translate-y-0.5",
        "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none",
        !showResult && !isSelected && "bg-white border-[#e8e0dd] hover:border-[#e8b4b8]",
        !showResult && isSelected && "bg-[#faf0ee] border-[#e8b4b8]",
        showResult && isAwakening && "bg-[#f0f7f4] border-[#7cb89c]",
        showResult && !isAwakening && isSelected && "bg-[#faf5f3] border-[#e07a5f]",
        showResult && !isAwakening && !isSelected && "bg-white border-[#e8e0dd] opacity-50"
      )}
    >
      <p className="text-[#4a3f3f] text-sm leading-relaxed">{text}</p>
      {showResult && isSelected && (
        <p
          className={cn(
            "mt-2 text-xs font-medium",
            isAwakening ? "text-[#7cb89c]" : "text-[#e07a5f]"
          )}
        >
          {isAwakening ? "✨ 觉醒视角" : "💫 可以更好"}
        </p>
      )}
    </button>
  );
}

interface FeedbackBoxProps {
  text: string;
  isAwakening: boolean;
}

export function FeedbackBox({ text, isAwakening }: FeedbackBoxProps) {
  return (
    <div
      className={cn(
        "p-4 rounded-xl border-2 animate-in fade-in slide-in-from-bottom-4 duration-500",
        isAwakening
          ? "bg-[#f0f7f4] border-[#7cb89c]"
          : "bg-[#faf5f3] border-[#e07a5f]/30"
      )}
    >
      <p className="text-[#4a3f3f] text-sm leading-relaxed">{text}</p>
    </div>
  );
}

interface InsightBoxProps {
  text: string;
}

export function InsightBox({ text }: InsightBoxProps) {
  return (
    <div className="p-5 rounded-xl bg-gradient-to-br from-[#faf0ee] to-[#f5f0f8] border border-[#e8b4b8]/30">
      <p className="text-[#6b5b5b] text-xs mb-2">💡 觉醒洞察</p>
      <p className="text-[#4a3f3f] text-sm leading-relaxed font-medium">{text}</p>
    </div>
  );
}

// 打字机效果组件
interface TypewriterTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

export function TypewriterText({ text, speed = 30, onComplete }: TypewriterTextProps) {
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

// 浮动粒子组件
interface FloatingParticlesProps {
  emotion?: 'calm' | 'tense' | 'warm' | 'reflect';
}

export function FloatingParticles({ emotion = 'calm' }: FloatingParticlesProps) {
  const particleColors = {
    calm: 'bg-pink-200/30',
    tense: 'bg-orange-200/30',
    warm: 'bg-yellow-200/30',
    reflect: 'bg-purple-200/30',
  };

  // 使用 useMemo 预先生成粒子位置，避免在渲染中使用随机数
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
          className={cn(
            "absolute w-2 h-2 rounded-full animate-float",
            particleColors[emotion]
          )}
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

// 光晕效果组件
interface GlowEffectProps {
  color?: string;
}

export function GlowEffect({ color = '#e8b4b8' }: GlowEffectProps) {
  return (
    <div
      className="absolute w-64 h-64 rounded-full blur-3xl opacity-20 animate-pulse"
      style={{ backgroundColor: color }}
    />
  );
}
