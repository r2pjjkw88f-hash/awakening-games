// 求救信号识别游戏数据

export type SeverityLevel = 'light' | 'medium' | 'heavy' | 'critical';

export interface SOSChoice {
  text: string;
  isCorrect: boolean;
  feedback: string;
}

export interface SOSLevel {
  id: number;
  title: string;
  scenario: string;
  childBehavior: string;
  parentFeeling: string;
  childMessage: string;
  severity: SeverityLevel;
  severityLabel: string;
  severityEmoji: string;
  insight: string;
  choices: SOSChoice[];
  correctResponse: string[];
}

export const severityConfig = {
  light: { label: '轻度', emoji: '🌱', color: 'text-green-400' },
  medium: { label: '中度', emoji: '⚠️', color: 'text-yellow-400' },
  heavy: { label: '重度', emoji: '😟', color: 'text-orange-400' },
  critical: { label: '红色警报', emoji: '🚨', color: 'text-red-400' }
};

export const sosLevels: SOSLevel[] = [
  {
    id: 1,
    title: '最初的呼救',
    scenario: '周末下午，你在看手机，孩子走过来轻声说："妈妈，你看我画的画..."你头也没抬说："等一下，妈妈忙完。"孩子站了一会儿，默默走开了。',
    childBehavior: '安静试探、寻求陪伴、小声表达需求',
    parentFeeling: '忙碌、没时间',
    childMessage: '"看看我，我想要一点关注。"',
    severity: 'light',
    severityLabel: '轻度',
    severityEmoji: '🌱',
    insight: '这是孩子最初的呼救。只要重新建立连接，孩子通常恢复很快。',
    choices: [
      {
        text: '继续看手机，等有空了再说',
        isCorrect: false,
        feedback: '孩子的需求被忽略，可能会用更大的声音来求救。'
      },
      {
        text: '放下手机，认真看孩子的画并赞美',
        isCorrect: true,
        feedback: '你及时回应了孩子的需求！这种连接会让孩子感到被看见、被重视。'
      },
      {
        text: '敷衍地说"画得真好"，继续看手机',
        isCorrect: false,
        feedback: '孩子能感受到你的心不在焉，这会让他觉得"我不重要"。'
      }
    ],
    correctResponse: [
      '停下手中的事，关注孩子',
      '给孩子积极的注意力',
      '简短回应，满足被看见的需求'
    ]
  },
  {
    id: 2,
    title: '反复的提醒',
    scenario: '孩子第三次来叫你："妈妈，你来陪我玩嘛！"你有些不耐烦："等一下！我不是说了吗？"孩子开始故意把玩具扔到地上，发出声响。',
    childBehavior: '反复提醒、故意捣乱、吸引注意',
    parentFeeling: '烦躁、恼火',
    childMessage: '"我再试一次，你为什么还没看到我？"',
    severity: 'light',
    severityLabel: '轻度偏中',
    severityEmoji: '🌱',
    insight: '孩子已经开始失望了。他在用更大的声音说：求你看见我！',
    choices: [
      {
        text: '生气地训斥："你怎么这么不听话！"',
        isCorrect: false,
        feedback: '训斥只会让孩子觉得"即使我大声呼救，也没人理解我"。'
      },
      {
        text: '放下手机，蹲下来问："你是想妈妈陪你玩吗？"',
        isCorrect: true,
        feedback: '你看见孩子行为背后的需求了！这正是孩子需要的理解。'
      },
      {
        text: '无视扔玩具的行为，等他自己停下来',
        isCorrect: false,
        feedback: '孩子会觉得"即使是捣乱，你也看不到我"，会尝试更激烈的方式。'
      }
    ],
    correctResponse: [
      '识别孩子的真实需求',
      '温和地表达理解',
      '给孩子一个明确的陪伴时间'
    ]
  },
  {
    id: 3,
    title: '强烈的表达',
    scenario: '孩子突然大喊："我讨厌你！你从来不陪我！"然后把积木全部推倒。你感到很生气，也很震惊。',
    childBehavior: '情绪爆发、大吵大闹、故意挑战',
    parentFeeling: '愤怒、被挑衅',
    childMessage: '"我已经很难过了，求你在乎我！"',
    severity: 'medium',
    severityLabel: '中度',
    severityEmoji: '⚠️',
    insight: '孩子进入权力斗争阶段。他不是要对抗你，而是在说"我也想有力量"。',
    choices: [
      {
        text: '大声回击："你怎么能这样说话！去房间反省！"',
        isCorrect: false,
        feedback: '惩罚会加深孩子的受伤感，让他觉得"你只在乎我的行为，不在乎我的感受"。'
      },
      {
        text: '深呼吸，平静地说："你很生气，是不是觉得妈妈最近陪你的时间不够？"',
        isCorrect: true,
        feedback: '你看见了孩子的情绪！当孩子感觉被理解，对抗就会减少。'
      },
      {
        text: '冷处理，走开不理他',
        isCorrect: false,
        feedback: '冷漠会让孩子觉得被抛弃，可能会说出更伤人的话来引起你的反应。'
      }
    ],
    correctResponse: [
      '先处理情绪，再处理事情',
      '尊重孩子的感受和边界',
      '坚定但温和地设定规则'
    ]
  },
  {
    id: 4,
    title: '深层的对抗',
    scenario: '孩子说："反正你也不在乎我，我还不如不回家。"你感到震惊和伤心，觉得自己的付出被否定了。',
    childBehavior: '冷漠、对抗、说伤人的话、推开父母',
    parentFeeling: '震惊、伤心、被背叛',
    childMessage: '"你都不在乎我，那我也不需要你了！"',
    severity: 'heavy',
    severityLabel: '重度',
    severityEmoji: '😟',
    insight: '孩子已经感受到情感连接的断裂，开始用伤害来回应。这是报复心理的表现。',
    choices: [
      {
        text: '"我对你那么好，你却这样对我！"',
        isCorrect: false,
        feedback: '孩子会觉得"你只记得你对我的好，却不知道我有多痛"。'
      },
      {
        text: '"你说得对，我最近确实忽略了你。对不起，妈妈想听你说说心里的感受。"',
        isCorrect: true,
        feedback: '你承认了自己的不足，这会让孩子感受到被看见和理解，愿意重新打开心门。'
      },
      {
        text: '"行，那你别回来了。"',
        isCorrect: false,
        feedback: '这会让孩子彻底绝望，觉得"果然没人爱我"。'
      }
    ],
    correctResponse: [
      '表达理解，修复情感连接',
      '不惩罚，关注行为背后的痛',
      '帮助孩子重建安全感'
    ]
  },
  {
    id: 5,
    title: '最后的沉默',
    scenario: '孩子最近很少说话，放学回家就进房间关门。你问他"今天怎么样"，他说"还行"就没有下文了。你感到迷茫和无助。',
    childBehavior: '沉默、封闭、摆烂、不再表达',
    parentFeeling: '迷茫、无助、无力',
    childMessage: '"反正，也不会有人真正懂我。"',
    severity: 'critical',
    severityLabel: '红色警报',
    severityEmoji: '🚨',
    insight: '孩子已经开始放弃希望，内心充满绝望和无价值感。这是最需要关注的阶段。',
    choices: [
      {
        text: '不停追问："你怎么了？为什么不说话？"',
        isCorrect: false,
        feedback: '过多的追问会让孩子更加封闭，他觉得"说了也没人懂"。'
      },
      {
        text: '给他空间，同时在日常中持续表达关心，不期待他回应',
        isCorrect: true,
        feedback: '你给了孩子安全感。当孩子感受到无条件的爱，他会慢慢重新打开心门。'
      },
      {
        text: '"他可能就是这样的性格，没办法"',
        isCorrect: false,
        feedback: '放弃理解孩子，会让孩子彻底失去希望。'
      }
    ],
    correctResponse: [
      '给予无条件的爱和接纳',
      '帮助孩子重建自我价值',
      '寻求专业支持，不要放弃'
    ]
  }
];

// 生成求救信号报告
export function generateSOSReport(
  totalPoints: number,
  maxPoints: number,
  choices: { levelId: number; choiceIndex: number; isCorrect: boolean }[]
): {
  score: number;
  maxScore: number;
  awarenessLevel: string;
  summary: string;
  suggestions: string[];
  insights: string[];
} {
  const score = totalPoints;
  const maxScore = maxPoints;
  const percentage = Math.round((score / maxScore) * 100);
  
  let awarenessLevel = '';
  let summary = '';
  
  if (percentage >= 80) {
    awarenessLevel = '🌟 觉察敏锐';
    summary = '你对孩子的求救信号有很强的觉察力，能够及时看见孩子行为背后的需求。继续保持这份敏锐，孩子会感受到被理解和被爱。';
  } else if (percentage >= 60) {
    awarenessLevel = '💚 觉察成长中';
    summary = '你已经开始学习看见孩子的求救信号。继续练习，在每次孩子"闹情绪"时，停下来问问自己：他在表达什么？';
  } else if (percentage >= 40) {
    awarenessLevel = '🌱 觉察萌芽';
    summary = '觉察是改变的开始。你已经迈出了重要的一步。建议多练习在日常中观察孩子的微小信号。';
  } else {
    awarenessLevel = '💜 学习中';
    summary = '每个父母都是从零开始学习的。重要的是你愿意了解。建议多关注孩子的情绪表达，尝试理解行为背后的需求。';
  }
  
  const suggestions = [
    '每天给孩子10分钟专属的陪伴时间',
    '当孩子"闹情绪"时，先问自己：他在表达什么需求？',
    '学会识别自己的情绪，它是指向孩子内心世界的地图',
    '看见，就是最好的回应'
  ];
  
  const insights = [
    '孩子不会无缘无故出现问题行为，他只是不知道还能怎样表达痛苦',
    '父母的目标，不是改变孩子的行为，而是理解行为背后的需求',
    '很多问题孩子，只是因为：在一次次没有被看见之后，终于失去了继续呼救的力气'
  ];
  
  return {
    score,
    maxScore,
    awarenessLevel,
    summary,
    suggestions,
    insights
  };
}
