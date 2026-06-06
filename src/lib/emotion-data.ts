// 父母的情绪是理解孩子的地图 - 游戏数据

export interface EmotionChoice {
  text: string;
  isCorrect: boolean;
  feedback: string;
}

export interface EmotionLevel {
  id: number;
  title: string;
  emotion: string;
  emotionIcon: string;
  parentFeeling: string;
  childBehavior: string[];
  childInnerVoice: string;
  childNeed: string;
  childNeedIcon: string;
  parentAction: string;
  scenario: string;
  choices: EmotionChoice[];
  insight: string;
  level: string;
}

export const emotionLevels: EmotionLevel[] = [
  {
    id: 1,
    title: "烦躁/恼火",
    emotion: "烦躁、恼火",
    emotionIcon: "🧡",
    parentFeeling: "想要摆脱，不想再忍了",
    childBehavior: [
      "吵闹、哭闹",
      "故意捣乱",
      "不停地吸引注意"
    ],
    childInnerVoice: "我希望被看到，我不想被忽略。",
    childNeed: "被关注、被看见",
    childNeedIcon: "💗",
    parentAction: "放下手中的事，给予关注和回应。用眼神、拥抱、倾听传递爱。",
    scenario: "周末下午，你正在处理紧急工作。孩子一直在旁边跑来跑去，不停地喊妈妈看我，还故意把玩具弄出很大声音。你心里越来越烦躁...",
    choices: [
      {
        text: "孩子太不懂事了，故意跟我作对",
        isCorrect: false,
        feedback: "这种想法会让我们更烦躁。试着看看孩子行为背后的需求..."
      },
      {
        text: "孩子想被关注，需要我的陪伴",
        isCorrect: true,
        feedback: "是的！孩子吵闹的背后，是在说看看我，我希望你在乎我。他被看见的需求没有得到满足。"
      },
      {
        text: "孩子就是想惹我生气",
        isCorrect: false,
        feedback: "孩子不是故意要惹你生气的。他只是用自己的方式表达需求..."
      }
    ],
    insight: "当我们感到烦躁时，孩子正在说：我值得被看见，我希望你在乎我。",
    level: "🌱轻度"
  },
  {
    id: 2,
    title: "愤怒/被挑衅",
    emotion: "愤怒、被挑衅",
    emotionIcon: "😡",
    parentFeeling: "感觉被冒犯，被挑战了权威",
    childBehavior: [
      "顶嘴、反驳",
      "不服从、对抗",
      "故意拖延、挑战规则"
    ],
    childInnerVoice: "我想要力量，我不想被控制。",
    childNeed: "被尊重、有力量",
    childNeedIcon: "🛡️",
    parentAction: "先处理情绪，给孩子选择的空间。用尊重代替控制，用沟通代替命令。",
    scenario: "你让孩子收拾房间，孩子说凭什么我要听你的，你总是命令我，然后摔门而去。你感到很愤怒...",
    choices: [
      {
        text: "孩子不尊重我，必须好好教育",
        isCorrect: false,
        feedback: "强硬的态度会让对抗升级。孩子在用对抗寻找边界和尊重..."
      },
      {
        text: "孩子在挑战我的底线",
        isCorrect: false,
        feedback: "孩子的对抗不是针对你个人，而是在表达他的需求..."
      },
      {
        text: "孩子渴望被尊重，需要自主权",
        isCorrect: true,
        feedback: "正确！孩子的对抗背后，是在说我需要被尊重，我希望有选择权。他正在寻找自己的力量。"
      }
    ],
    insight: "当我们感到愤怒时，孩子正在说：我需要被尊重，我希望有选择权。",
    level: "⚠️中度"
  },
  {
    id: 3,
    title: "震惊/伤心",
    emotion: "震惊、伤心",
    emotionIcon: "💜",
    parentFeeling: "心里很痛，难以接受",
    childBehavior: [
      "冷漠、回避",
      "说伤人的话",
      "故意破坏、报复"
    ],
    childInnerVoice: "我很受伤，我希望你能感受到我的痛。",
    childNeed: "被理解、被接纳",
    childNeedIcon: "🤝",
    parentAction: "接住孩子的情绪，表达理解和心疼。告诉他：我在，理解你。",
    scenario: "孩子突然对你说：你根本不爱我，你只爱弟弟/妹妹！还说了一些很伤人的话。你感到震惊又伤心...",
    choices: [
      {
        text: "孩子太不懂感恩了",
        isCorrect: false,
        feedback: "孩子说出伤人的话，不是因为他不爱你，而是因为他自己很受伤..."
      },
      {
        text: "孩子在报复我",
        isCorrect: false,
        feedback: "报复行为的背后，是孩子深深受伤的心。他希望你看见他的痛..."
      },
      {
        text: "孩子受伤了，需要被理解",
        isCorrect: true,
        feedback: "是的！当孩子说伤人的话时，他其实在说：你终于感受到我的痛了吗？他需要被理解。"
      }
    ],
    insight: "当我们感到震惊/伤心时，孩子正在说：我希望你理解我，我希望被接纳。",
    level: "😟重度"
  },
  {
    id: 4,
    title: "无助/迷茫",
    emotion: "无助、迷茫",
    emotionIcon: "😟",
    parentFeeling: "不知道怎么办，感觉无能为力",
    childBehavior: [
      "沉默、不说话",
      "逃避、躲起来",
      "什么都不想做"
    ],
    childInnerVoice: "我已经很累了，我觉得自己不重要了。",
    childNeed: "被支持、被陪伴",
    childNeedIcon: "🧍",
    parentAction: "给孩子时间和空间，陪伴而不打扰。让他感受到：我不会离开你。",
    scenario: "孩子最近总是把自己关在房间里，问他什么也不说。你说什么他都无所谓，感觉整个人都封闭了。你感到很无助...",
    choices: [
      {
        text: "孩子已经没救了",
        isCorrect: false,
        feedback: "每个孩子都值得被相信。他的沉默是在保护自己，不是放弃..."
      },
      {
        text: "不管他了，让他自己调整",
        isCorrect: false,
        feedback: "这时候孩子最需要的是陪伴，而不是被放弃..."
      },
      {
        text: "孩子需要我的支持和陪伴",
        isCorrect: true,
        feedback: "正确！孩子的沉默背后，是说我需要你的支持，我希望你陪陪我。他需要感受到你不会离开。"
      }
    ],
    insight: "当我们感到无助/迷茫时，孩子正在说：我需要你的支持，我希望你陪陪我。",
    level: "🚨红色警报"
  },
  {
    id: 5,
    title: "失望/心寒",
    emotion: "失望、心寒",
    emotionIcon: "🤢",
    parentFeeling: "不抱希望了，觉得没意义了",
    childBehavior: [
      "放弃、摆烂",
      "无所谓、没兴趣",
      "自我否定、消极"
    ],
    childInnerVoice: "我不再期待了，反正也不会有人懂我。",
    childNeed: "被肯定、有价值",
    childNeedIcon: "🌱",
    parentAction: "发现并肯定他的努力，用具体的赞美帮他重建自信，看见他的闪光点。",
    scenario: "孩子成绩下滑，你帮他请了补习老师，但他完全不配合，说反正我就是笨，学不学的都一样。你感到很失望...",
    choices: [
      {
        text: "孩子自暴自弃，我也没办法了",
        isCorrect: false,
        feedback: "孩子说放弃，是因为他需要被看见价值，而不是真的想放弃..."
      },
      {
        text: "需要给孩子更多压力",
        isCorrect: false,
        feedback: "压力只会让他更绝望。他现在需要的是被肯定和鼓励..."
      },
      {
        text: "孩子需要被肯定，重建自信",
        isCorrect: true,
        feedback: "正确！孩子的摆烂背后，是在说我希望你肯定我，我希望我有价值。他需要你看见他的闪光点。"
      }
    ],
    insight: "当我们感到失望/心寒时，孩子正在说：我希望你肯定我，我希望我有价值。",
    level: "🌧️最深处的呼唤"
  }
];

// 觉察洞察
export const emotionInsights = [
  "情绪没有对错，每一种情绪背后，都是孩子在用自己的方式表达需求和感受。",
  "孩子的行为不是问题，而是在求助。理解，才是最好的教育。",
  "当我们读懂情绪这张地图，就能更靠近孩子的内心世界。",
  "有些孩子不是没有受伤，而是把受伤藏进了懂事里。",
  "理解的四步法：觉察情绪 → 解读信号 → 看见需求 → 回应需求"
];

// 成长阶段
export const emotionStages = [
  { min: 0, title: "情绪盲区", description: "开始觉察情绪的意义", icon: "🌫️", color: "text-gray-400" },
  { min: 2, title: "初识信号", description: "能识别部分情绪信号", icon: "🌱", color: "text-green-400" },
  { min: 3, title: "情绪解码", description: "开始理解行为背后的需求", icon: "🌿", color: "text-emerald-400" },
  { min: 4, title: "深度共情", description: "能准确解读孩子的内心", icon: "🌸", color: "text-pink-400" },
  { min: 5, title: "情绪导师", description: "成为孩子情绪的引路人", icon: "🌺", color: "text-rose-400" }
];

// 生成报告
export function generateEmotionReport(
  totalPoints: number, 
  choices: { levelId: number; choiceIndex: number; isCorrect: boolean }[]
) {
  const correctCount = choices.filter(c => c.isCorrect).length;
  const percentage = Math.round((correctCount / emotionLevels.length) * 100);
  const stage = emotionStages.slice().reverse().find(s => correctCount >= s.min) || emotionStages[0];
  
  // 收集觉察洞察
  const insights = choices
    .filter(c => c.isCorrect)
    .map(c => emotionLevels.find(l => l.id === c.levelId)?.insight)
    .filter(Boolean) as string[];
  
  // 生成建议
  const suggestions = [];
  if (correctCount < 3) {
    suggestions.push("建议：当孩子有情绪时，先停下来觉察自己的感受，它是理解孩子的钥匙");
    suggestions.push("练习：每天观察一次自己的情绪变化，记录下来");
  } else if (correctCount < 5) {
    suggestions.push("建议：继续练习情绪解码，尝试用四步法：觉察→解读→看见→回应");
    suggestions.push("练习：当孩子行为让你有情绪时，问自己：他真正的需求是什么？");
  } else {
    suggestions.push("你已经能很好地读懂孩子的情绪地图！");
    suggestions.push("建议：成为孩子情绪的引路人，帮助他认识和表达情绪");
    suggestions.push("练习：教孩子用语言表达感受，而不是用行为表达");
  }
  
  return {
    score: correctCount,
    total: emotionLevels.length,
    percentage,
    stage,
    insights,
    suggestions
  };
}
