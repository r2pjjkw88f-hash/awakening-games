'use client';

import { useState, useEffect, useMemo } from 'react';

// 关卡数据
const levels = [
  {
    id: 1,
    title: '情绪状态',
    emoji: '💗',
    scene: '孩子今天放学回来，把书包往沙发上一扔，一句话也不说就进了房间。吃饭时，你注意到TA眼眶微红。',
    question: '你观察到孩子的情绪状态是怎样的？',
    choices: [
      { text: 'TA看起来很难过，可能在学校发生了什么事', insight: '你敏锐地捕捉到了孩子的情绪变化。这是觉察的第一步——看见。', isAwakening: true },
      { text: '这孩子脾气越来越大了，问也不说话', insight: '有时候我们会急于下判断。试着放下评判，只是观察。', isAwakening: false },
      { text: 'TA可能只是累了，不用太在意', insight: '每个情绪都值得被看见。慢下来，多停留一会儿。', isAwakening: false }
    ]
  },
  {
    id: 2,
    title: '眼神与表情',
    emoji: '👁️',
    scene: '周末你带孩子去公园。孩子在玩滑梯时，看到其他小朋友在一起玩耍，TA停了下来，站在一旁看着他们。',
    question: '从孩子的眼神和表情中，你看到了什么？',
    choices: [
      { text: 'TA的眼神里有渴望，想加入但又不确定', insight: '你读懂了孩子没有说出口的话。眼神往往比语言更真实。', isAwakening: true },
      { text: 'TA就是胆小，不敢和别人玩', insight: '当我们给孩子贴标签时，就错过了真正理解TA的机会。', isAwakening: false },
      { text: 'TA可能只是累了，想休息一下', insight: '有时候我们用自己的理解填补孩子的沉默。试着问TA。', isAwakening: false }
    ]
  },
  {
    id: 3,
    title: '表达方式',
    emoji: '💬',
    scene: '孩子想要一个新玩具，你说"不行"。孩子开始大声哭闹，扔东西，还说了"我讨厌你"。',
    question: '孩子通过什么方式在表达自己？',
    choices: [
      { text: 'TA在用激烈的方式表达被拒绝的失望', insight: '行为背后总有原因。看见情绪，才能理解表达。', isAwakening: true },
      { text: '这孩子被惯坏了，需要好好教育', insight: '当我们急于纠正时，就错过了理解的机会。', isAwakening: false },
      { text: 'TA就是在无理取闹，不能纵容', insight: '每个"无理取闹"背后都有一个未被看见的需求。', isAwakening: false }
    ]
  },
  {
    id: 4,
    title: '寻找存在感的方式',
    emoji: '🌱',
    scene: '你在家工作，孩子在旁边走来走去。你让TA去自己房间玩，TA答应了。过了一会儿，TA又跑过来问"妈妈/爸爸，你看我画的画"。',
    question: '孩子是在用什么方式寻找存在感？',
    choices: [
      { text: 'TA想确认我在乎TA，想和我建立连接', insight: '孩子所有的"打扰"，其实都是在说"看看我"。', isAwakening: true },
      { text: 'TA就是不让我好好工作，太不懂事', insight: '当我们忙于自己的事时，容易把孩子的需求看成干扰。', isAwakening: false },
      { text: 'TA可能只是想展示画，没什么特别的', insight: '每一次靠近，都是孩子想要连接的尝试。', isAwakening: false }
    ]
  },
  {
    id: 5,
    title: '受伤的时刻',
    emoji: '☂️',
    scene: '孩子的画被同学嘲笑"画得好丑"。回家后TA把画撕了，说"我再也不想画画了"。',
    question: '在什么情境下，孩子容易受伤？',
    choices: [
      { text: '当TA的努力被否定时，TA的自信心受到伤害', insight: '你看见了孩子受伤的根源。这是帮助TA疗愈的开始。', isAwakening: true },
      { text: '这孩子太脆弱了，需要锻炼心理素质', insight: '在评判孩子脆弱之前，先问问TA的感受。', isAwakening: false },
      { text: '小孩子画画本来就是玩，不用太在意', insight: '对孩子来说，每一件小事都是大事。', isAwakening: false }
    ]
  },
  {
    id: 6,
    title: '连接的时刻',
    emoji: '☀️',
    scene: '晚上睡觉前，孩子跑来说"妈妈/爸爸，今天可以陪我多讲一个故事吗？"然后紧紧抱住你。',
    question: '孩子在什么时候最渴望与你连接？',
    choices: [
      { text: '在一天结束的时候，TA想确认自己是被爱的', insight: '你看见了孩子对连接的渴望。这些时刻，是最珍贵的。', isAwakening: true },
      { text: 'TA就是不想睡觉，在拖延时间', insight: '有时候我们会把孩子的需求看作麻烦。试着慢下来。', isAwakening: false },
      { text: 'TA今天可能做错事了，想讨好我', insight: '当我们带着怀疑看待孩子时，就错过了真诚的连接。', isAwakening: false }
    ]
  }
];

// 觉察金句
const insights = [
  '看见，就是最好的爱。',
  '每一个被看见的孩子，都会更有力量地长大。',
  '真正的成长，永远从觉察开始。',
  '不要急着改变，只是慢慢看见。',
  '当孩子被理解时，TA的内心就有了力量。',
  '观察孩子，也是在重新认识自己。'
];

export function ParentChildGame({ onBack }: { onBack: () => void }) {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [choices, setChoices] = useState<{ level: number; choice: number; isAwakening: boolean }[]>([]);
  const [typewriterText, setTypewriterText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const level = levels[currentLevel];

  // 打字机效果
  useEffect(() => {
    if (!level || isComplete) return;
    
    const text = level.scene;
    setTypewriterText('');
    setIsTyping(true);
    let index = 0;
    
    const timer = setInterval(() => {
      if (index < text.length) {
        setTypewriterText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 30);
    
    return () => clearInterval(timer);
  }, [currentLevel, isComplete, level]);

  const handleChoice = (choiceIndex: number) => {
    if (showFeedback) return;
    
    setSelectedChoice(choiceIndex);
    setShowFeedback(true);
    
    const choice = level.choices[choiceIndex];
    if (choice.isAwakening) {
      setTotalPoints(prev => prev + 1);
    }
    setChoices(prev => [...prev, { level: currentLevel, choice: choiceIndex, isAwakening: choice.isAwakening }]);
  };

  const handleNext = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(prev => prev + 1);
      setSelectedChoice(null);
      setShowFeedback(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleRestart = () => {
    setGameStarted(false);
    setCurrentLevel(0);
    setSelectedChoice(null);
    setShowFeedback(false);
    setTotalPoints(0);
    setIsComplete(false);
    setChoices([]);
  };

  // 生成报告数据
  const reportData = useMemo(() => {
    const awakeningCount = choices.filter(c => c.isAwakening).length;
    const percentage = Math.round((awakeningCount / levels.length) * 100);
    
    // 根据分数给出不同的建议
    let stage = '';
    let suggestion = '';
    
    if (awakeningCount >= 5) {
      stage = '觉察之光';
      suggestion = '你已经能够深入看见孩子的内心世界。继续用这份觉察去陪伴TA的成长。';
    } else if (awakeningCount >= 3) {
      stage = '觉察之旅';
      suggestion = '你正在学习如何真正看见孩子。每一次觉察都是成长，保持这份耐心。';
    } else {
      stage = '觉察之芽';
      suggestion = '觉察是一段旅程，不用着急。试着每天花10分钟，只是观察，不评判。';
    }
    
    return { awakeningCount, percentage, stage, suggestion };
  }, [choices]);

  // 开始页面
  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a1625] to-[#2d2640] flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <button 
            onClick={onBack}
            className="mb-6 text-white/60 hover:text-white transition-colors flex items-center gap-2"
          >
            ← 返回
          </button>
          
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🦋</div>
            <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'serif' }}>
              亲子观察
            </h1>
            <p className="text-white/80 text-lg">看见孩子，看见自己</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
            <p className="text-white/90 text-center leading-relaxed">
              每天10分钟，重新认识孩子
            </p>
            <p className="text-white/60 text-center mt-2 text-sm">
              不教育 · 不纠正 · 不讲道理<br/>只是观察
            </p>
          </div>
          
          <div className="space-y-3 mb-8">
            {['💗 情绪状态', '👁️ 眼神与表情', '💬 表达方式', '🌱 存在感的方式', '☂️ 受伤的时刻', '☀️ 连接的时刻'].map((item, i) => (
              <div key={i} className="bg-white/5 rounded-lg px-4 py-2 text-white/70 text-sm">
                {item}
              </div>
            ))}
          </div>
          
          <button
            onClick={() => setGameStarted(true)}
            className="w-full py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
          >
            开始观察之旅
          </button>
        </div>
      </div>
    );
  }

  // 完成页面 - 觉察报告
  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a1625] to-[#2d2640] flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🌸</div>
            <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'serif' }}>
              亲子觉察报告
            </h1>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
            {/* 核心数据 - 进度环 */}
            <div className="text-center mb-6">
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
                    className="text-pink-400"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray={`${reportData.percentage}, 100`}
                    strokeLinecap="round"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-3xl font-bold text-white">{reportData.percentage}%</div>
                  <div className="text-white/60 text-xs">觉察度</div>
                </div>
              </div>
              <div className="text-lg text-white font-medium">{reportData.stage}</div>
            </div>
            
            {/* 觉察时刻 */}
            <div className="mb-6">
              <h3 className="text-white/80 text-sm mb-3">✨ 觉察时刻</h3>
              <div className="flex flex-wrap gap-2">
                {choices.map((c, i) => (
                  <span 
                    key={i}
                    className={`px-3 py-1 rounded-full text-sm ${
                      c.isAwakening 
                        ? 'bg-pink-400/30 text-pink-200' 
                        : 'bg-white/10 text-white/50'
                    }`}
                  >
                    {levels[c.level].emoji} {c.isAwakening ? '✓' : ''}
                  </span>
                ))}
              </div>
            </div>
            
            {/* 成长建议 */}
            <div className="mb-6">
              <h3 className="text-white/80 text-sm mb-2">🌱 成长建议</h3>
              <p className="text-white/70 text-sm leading-relaxed">{reportData.suggestion}</p>
            </div>
            
            {/* 觉察金句 */}
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <p className="text-white/90 italic" style={{ fontFamily: 'serif' }}>
                "{insights[reportData.awakeningCount % insights.length]}"
              </p>
            </div>
          </div>
          
          {/* 每日练习提醒 */}
          <div className="bg-white/5 rounded-2xl p-4 mb-6">
            <h3 className="text-white/80 text-sm mb-3">💜 每日10分钟练习</h3>
            <ul className="text-white/60 text-sm space-y-1">
              <li>· 选择一个安静的时间</li>
              <li>· 保持好奇，不评判</li>
              <li>· 同时观察自己的情绪</li>
              <li>· 看见，就是最好的爱</li>
            </ul>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={onBack}
              className="flex-1 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
            >
              返回首页
            </button>
            <button
              onClick={handleRestart}
              className="flex-1 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-xl hover:opacity-90 transition-opacity"
            >
              再玩一次
            </button>
          </div>
          
          {/* 落款 */}
          <div className="text-center mt-6 text-white/40 text-xs">
            此刻花开 · 筱涵
          </div>
        </div>
      </div>
    );
  }

  // 游戏页面
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1625] to-[#2d2640] flex flex-col p-4">
      {/* 进度条 */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <button onClick={onBack} className="text-white/60 hover:text-white text-sm">← 返回</button>
          <span className="text-white/60 text-sm">第 {currentLevel + 1} / {levels.length} 关</span>
        </div>
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-pink-400 to-purple-400 transition-all duration-300"
            style={{ width: `${((currentLevel + 1) / levels.length) * 100}%` }}
          />
        </div>
      </div>
      
      {/* 关卡标题 */}
      <div className="text-center mb-6">
        <span className="text-4xl">{level.emoji}</span>
        <h2 className="text-xl text-white font-medium mt-2">{level.title}</h2>
      </div>
      
      {/* 场景描述 */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 mb-6 flex-1">
        <p className="text-white/90 leading-relaxed">
          {typewriterText}
          {isTyping && <span className="inline-block w-0.5 h-4 bg-white/60 ml-1 animate-pulse" />}
        </p>
        
        {!isTyping && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-white font-medium">{level.question}</p>
          </div>
        )}
      </div>
      
      {/* 选择按钮 */}
      {!isTyping && !showFeedback && (
        <div className="space-y-3">
          {level.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleChoice(index)}
              className="w-full py-4 px-5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-left transition-colors"
            >
              {choice.text}
            </button>
          ))}
        </div>
      )}
      
      {/* 反馈 */}
      {showFeedback && (
        <div className="space-y-4">
          <div className={`p-4 rounded-xl ${
            level.choices[selectedChoice!].isAwakening 
              ? 'bg-green-500/20 border border-green-400/30' 
              : 'bg-orange-500/20 border border-orange-400/30'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">
                {level.choices[selectedChoice!].isAwakening ? '✨' : '💡'}
              </span>
              <span className="text-white font-medium">
                {level.choices[selectedChoice!].isAwakening ? '觉察之光' : '成长提示'}
              </span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              {level.choices[selectedChoice!].insight}
            </p>
          </div>
          
          <button
            onClick={handleNext}
            className="w-full py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
          >
            {currentLevel < levels.length - 1 ? '下一关' : '生成觉察报告'}
          </button>
        </div>
      )}
    </div>
  );
}
