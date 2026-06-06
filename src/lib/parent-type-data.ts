// 父母类型游戏数据 - 情绪化父母 VS 智慧型父母

export interface ParentChoice {
  text: string;
  type: 'emotional' | 'wise';
  feedback: string;
}

export interface ParentLevel {
  id: number;
  title: string;
  scenario: string;
  emotionIcon: string;
  choices: ParentChoice[];
  wiseInsight: string;
}

export const parentLevels: ParentLevel[] = [
  {
    id: 1,
    title: "孩子哭闹时",
    emotionIcon: "😤",
    scenario: "孩子在商场里哭着要买玩具，已经哭了5分钟，路人都在看你们。你会怎么做？",
    choices: [
      {
        text: "别哭了！再哭我就走了！",
        type: "emotional",
        feedback: "这是情绪化反应。威胁会让孩子感到不安全，可能暂时停止哭泣，但内心积累恐惧。"
      },
      {
        text: "蹲下来，平静地说：我知道你很想要这个玩具，你很难过对吗？",
        type: "wise",
        feedback: "这是智慧型反应。先接纳孩子的情绪，让孩子感觉被理解，才能进一步沟通。"
      }
    ],
    wiseInsight: "智慧型父母知道：先处理情绪，再处理事情。"
  },
  {
    id: 2,
    title: "孩子成绩不好时",
    emotionIcon: "😔",
    scenario: "孩子考试只考了60分，你发现他最近一直在玩手机游戏。你会怎么做？",
    choices: [
      {
        text: "你看看你考的什么！手机没收了！以后不许玩了！",
        type: "emotional",
        feedback: "这是情绪化反应。惩罚和剥夺可能让孩子暂时顺从，但会破坏亲子关系，孩子可能更隐藏自己。"
      },
      {
        text: "我们一起来看看，是哪里出了问题？你觉得是什么原因呢？",
        type: "wise",
        feedback: "这是智慧型反应。和孩子一起分析问题，让孩子参与解决，培养责任感和思考能力。"
      }
    ],
    wiseInsight: "智慧型父母知道：帮助孩子面对问题，比惩罚更有力量。"
  },
  {
    id: 3,
    title: "孩子顶嘴时",
    emotionIcon: "😡",
    scenario: "你让孩子去写作业，孩子说：你总是管我！烦死了！你会怎么做？",
    choices: [
      {
        text: "你怎么跟我说话的！我是为你好！马上给我道歉！",
        type: "emotional",
        feedback: "这是情绪化反应。强压会让孩子更反抗，表面道歉但内心不服，伤害亲子关系。"
      },
      {
        text: "你现在很烦，我知道。我们先冷静一下，等会儿再聊。",
        type: "wise",
        feedback: "这是智慧型反应。给孩子空间和时间，避免冲突升级，等情绪平复后再沟通。"
      }
    ],
    wiseInsight: "智慧型父母知道：沟通比压制更有效。"
  },
  {
    id: 4,
    title: "孩子撒谎时",
    emotionIcon: "💔",
    scenario: "你发现孩子偷吃零食却说是弟弟吃的，其实弟弟不在家。你会怎么做？",
    choices: [
      {
        text: "你学会撒谎了是吧？给我站墙角反省！",
        type: "emotional",
        feedback: "这是情绪化反应。惩罚可能让孩子更会隐藏谎言，而不是学会诚实。"
      },
      {
        text: "我知道其实是你吃的。撒谎会让妈妈难过，但我更希望你能说实话。你能告诉我为什么吗？",
        type: "wise",
        feedback: "这是智慧型反应。创造安全的环境让孩子说真话，理解孩子撒谎背后的需求。"
      }
    ],
    wiseInsight: "智慧型父母知道：理解行为背后的需求，才能真正引导孩子。"
  },
  {
    id: 5,
    title: "孩子磨蹭时",
    emotionIcon: "⏰",
    scenario: "早上上学，孩子一直磨蹭，已经快迟到了，你很着急。你会怎么做？",
    choices: [
      {
        text: "快点快点！你怎么这么磨蹭！每天都要我催！",
        type: "emotional",
        feedback: "这是情绪化反应。催促和抱怨会增加孩子的紧张感，但不会培养时间管理能力。"
      },
      {
        text: "还有10分钟，你觉得能完成吗？需要我帮你做什么？",
        type: "wise",
        feedback: "这是智慧型反应。提醒时间，给予支持，让孩子学习为自己的时间负责。"
      }
    ],
    wiseInsight: "智慧型父母知道：培养孩子的能力，比替他着急更重要。"
  },
  {
    id: 6,
    title: "孩子说不想上学时",
    emotionIcon: "🌧️",
    scenario: "孩子说：我不想去上学，学校好无聊。你会怎么做？",
    choices: [
      {
        text: "不想上也得去！别人都能上你怎么不能？",
        type: "emotional",
        feedback: "这是情绪化反应。否定孩子的感受，会让孩子觉得不被理解，问题可能更严重。"
      },
      {
        text: "听起来学校让你不开心。能告诉我发生了什么吗？",
        type: "wise",
        feedback: "这是智慧型反应。倾听孩子的心声，了解不想上学的原因，才能真正帮助他。"
      }
    ],
    wiseInsight: "智慧型父母知道：倾听比说教更有力量。"
  }
];

// 智慧型父母的特征
export const wiseParentTraits = [
  "真诚善意",
  "练习保持耐心",
  "学习信任孩子",
  "倾听多于说教",
  "控制情绪、消弭愤怒",
  "认清孩子优秀的本质"
];

// 情绪化父母的特征
export const emotionalParentTraits = [
  "真诚善意",
  "容易失去耐心",
  "过度担心孩子",
  "习惯教训孩子",
  "容易生气、经常发火",
  "习惯批评孩子的缺点"
];

// 成长阶段
export const growthStages = [
  { min: 0, title: "情绪化模式", description: "觉察是改变的第一步，你已经开始成长", icon: "🌱", color: "#f87171" },
  { min: 3, title: "探索中", description: "你正在学习智慧型养育的方式", icon: "🌿", color: "#fbbf24" },
  { min: 5, title: "智慧型父母", description: "你已经能稳定地用智慧回应孩子", icon: "🌳", color: "#34d399" },
  { min: 6, title: "高阶智慧型", description: "你是孩子内心的安全基地", icon: "⭐", color: "#a78bfa" }
];

// 生成报告
export function generateParentReport(score: number, choices: { levelId: number; choiceType: 'emotional' | 'wise' }[]) {
  const total = parentLevels.length;
  const percentage = Math.round((score / total) * 100);
  
  // 确定成长阶段
  let stage = growthStages[0];
  for (let i = growthStages.length - 1; i >= 0; i--) {
    if (score >= growthStages[i].min) {
      stage = growthStages[i];
      break;
    }
  }

  // 分析选择模式
  const wiseCount = choices.filter(c => c.choiceType === 'wise').length;
  const emotionalCount = choices.filter(c => c.choiceType === 'emotional').length;

  // 生成洞察
  const insights: string[] = [];
  
  if (wiseCount >= 4) {
    insights.push("你已经能稳定地用智慧型方式回应孩子");
    insights.push("孩子在你身边能感受到安全和被理解");
  } else if (wiseCount >= 2) {
    insights.push("你正在从情绪化走向智慧型");
    insights.push("继续练习，你会越来越稳定");
  } else {
    insights.push("觉察是改变的开始");
    insights.push("每一次暂停，都是成长的机会");
  }

  // 生成建议
  const suggestions: string[] = [];
  
  if (emotionalCount > 0) {
    suggestions.push("当情绪来临时，先深呼吸，问自己：我希望孩子学到什么？");
    suggestions.push("记住：情绪没有对错，但表达方式会影响孩子");
  }
  
  if (wiseCount < total) {
    suggestions.push("每天给自己5分钟，练习在反应前暂停一下");
    suggestions.push("智慧型父母不是完美，而是越来越稳定");
  }

  return {
    score,
    total,
    percentage,
    stage,
    wiseCount,
    emotionalCount,
    insights,
    suggestions
  };
}

// 金句
export const parentInsights = [
  "真正成熟的父母，不是从不情绪化，而是开始越来越有能力，在情绪里，依然保持爱。",
  "父母的稳定，是孩子最大的安全感。",
  "教育不是纠正，而是陪伴成长。",
  "智慧型父母，是孩子内心的安全基地。",
  "每一次暂停，都是成长的机会。"
];
