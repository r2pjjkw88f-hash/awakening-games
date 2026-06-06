// 四种偏差行为严重程度游戏数据

export interface BehaviorScenario {
  id: number;
  title: string;
  scenario: string;
  behaviorType: 'attention' | 'power' | 'revenge' | 'giving_up';
  severity: 'mild' | 'moderate' | 'severe' | 'extreme';
  correctType: string;
  correctSeverity: string;
  coreFeeling: string;
  realNeed: string;
  explanation: string;
}

// 行为类型信息
export const behaviorTypes = [
  {
    id: 'attention',
    name: '引起注意型',
    subtitle: '看看我',
    icon: '👀',
    color: 'from-blue-400 to-cyan-400',
    coreFeeling: '我没有被看见',
    realNeed: '看看我，我想被看见。',
    description: '孩子通过各种方式吸引父母的注意力'
  },
  {
    id: 'power',
    name: '权力斗争型',
    subtitle: '你不能逼我',
    icon: '💪',
    color: 'from-orange-400 to-red-400',
    coreFeeling: '我没有力量',
    realNeed: '我想证明，我也是有力量的人。',
    description: '孩子通过对抗来证明自己的存在和力量'
  },
  {
    id: 'revenge',
    name: '报复心理型',
    subtitle: '你伤害我，我也伤害你',
    icon: '💔',
    color: 'from-purple-400 to-pink-400',
    coreFeeling: '我很痛',
    realNeed: '你终于能感觉到我的痛了吗？',
    description: '孩子用伤害来让父母感受自己的痛苦'
  },
  {
    id: 'giving_up',
    name: '自我放逐型',
    subtitle: '反正我也不重要',
    icon: '🌧️',
    color: 'from-gray-400 to-slate-500',
    coreFeeling: '我已经放弃希望了',
    realNeed: '其实我也想被爱，只是我不敢再期待了。',
    description: '孩子放弃努力，因为觉得无论如何都不会被爱'
  }
];

// 严重程度信息
export const severityLevels = [
  {
    id: 'mild',
    name: '轻度',
    subtitle: '偶尔出现',
    color: 'bg-green-500',
    textColor: 'text-green-400'
  },
  {
    id: 'moderate',
    name: '中度',
    subtitle: '经常出现',
    color: 'bg-yellow-500',
    textColor: 'text-yellow-400'
  },
  {
    id: 'severe',
    name: '重度',
    subtitle: '长期持续',
    color: 'bg-orange-500',
    textColor: 'text-orange-400'
  },
  {
    id: 'extreme',
    name: '极重度',
    subtitle: '严重影响生活',
    color: 'bg-red-500',
    textColor: 'text-red-400'
  }
];

// 游戏场景
export const behaviorScenarios: BehaviorScenario[] = [
  // 引起注意型场景
  {
    id: 1,
    title: '打断说话的孩子',
    scenario: '孩子在父母打电话时，时不时跑过来问"妈妈，你看我的画好吗？"，即使妈妈说"等一下"，孩子还是会继续问。',
    behaviorType: 'attention',
    severity: 'mild',
    correctType: '引起注意型',
    correctSeverity: '轻度',
    coreFeeling: '我没有被看见',
    realNeed: '看看我，我想被看见。',
    explanation: '孩子偶尔打断，想被关注。这是轻度引起注意行为，孩子在说"看看我"。'
  },
  {
    id: 2,
    title: '频繁求关注',
    scenario: '孩子在父母工作时，每隔几分钟就来问一个问题，或者在旁边走来走去，不断制造小声响，一定要父母看他在做什么。',
    behaviorType: 'attention',
    severity: 'moderate',
    correctType: '引起注意型',
    correctSeverity: '中度',
    coreFeeling: '我没有被看见',
    realNeed: '看看我，我想被看见。',
    explanation: '孩子频繁寻求关注，用各种小动作吸引注意。这是中度引起注意行为。'
  },
  {
    id: 3,
    title: '无时无刻都在闹',
    scenario: '孩子几乎每时每刻都在闹，大声哭闹、发脾气，不管父母怎么哄都不行，严重影响家庭的正常生活。',
    behaviorType: 'attention',
    severity: 'severe',
    correctType: '引起注意型',
    correctSeverity: '重度',
    coreFeeling: '我没有被看见',
    realNeed: '看看我，我想被看见。',
    explanation: '孩子无时无刻都在闹，情绪强烈，影响他人。这是重度引起注意行为，需要更多关注。'
  },
  {
    id: 4,
    title: '极端求关注',
    scenario: '孩子说"你不看我，我就伤害自己"，并且真的会有自伤行为，只要不被关注就完全崩溃。',
    behaviorType: 'attention',
    severity: 'extreme',
    correctType: '引起注意型',
    correctSeverity: '极重度',
    coreFeeling: '我没有被看见',
    realNeed: '看看我，我想被看见。',
    explanation: '这是极重度引起注意行为，孩子已经用极端方式表达需求。需要专业帮助和深度陪伴。'
  },
  
  // 权力斗争型场景
  {
    id: 5,
    title: '偶尔顶嘴',
    scenario: '孩子有时候会说"我不要"，或者偶尔顶嘴说"为什么一定要听你的？"，但大多数时候还是会配合。',
    behaviorType: 'power',
    severity: 'mild',
    correctType: '权力斗争型',
    correctSeverity: '轻度',
    coreFeeling: '我没有力量',
    realNeed: '我想证明，我也是有力量的人。',
    explanation: '孩子偶尔顶嘴，试探底线，这是轻度权力斗争行为。孩子在探索自己的力量。'
  },
  {
    id: 6,
    title: '故意拖延',
    scenario: '孩子经常故意拖延，写作业磨蹭，吃饭慢吞吞，父母说什么都反着来，就是不配合。',
    behaviorType: 'power',
    severity: 'moderate',
    correctType: '权力斗争型',
    correctSeverity: '中度',
    coreFeeling: '我没有力量',
    realNeed: '我想证明，我也是有力量的人。',
    explanation: '孩子经常对抗，故意不服从。这是中度权力斗争行为，孩子在用对抗证明自己的力量。'
  },
  {
    id: 7,
    title: '频繁冲突',
    scenario: '孩子几乎每天都和父母发生冲突，只做自己想做的事，完全不听父母的建议，对立情绪非常强烈。',
    behaviorType: 'power',
    severity: 'severe',
    correctType: '权力斗争型',
    correctSeverity: '重度',
    coreFeeling: '我没有力量',
    realNeed: '我想证明，我也是有力量的人。',
    explanation: '孩子频繁爆发冲突，与父母完全对立。这是重度权力斗争行为，需要给孩子更多的选择权和尊重。'
  },
  {
    id: 8,
    title: '抗拒一切',
    scenario: '孩子拒绝上学，威胁要离家出走，对任何权威都极度抗拒，甚至有暴力行为。',
    behaviorType: 'power',
    severity: 'extreme',
    correctType: '权力斗争型',
    correctSeverity: '极重度',
    coreFeeling: '我没有力量',
    realNeed: '我想证明，我也是有力量的人。',
    explanation: '这是极重度权力斗争行为，孩子严重对抗所有权威。需要专业介入，重建信任关系。'
  },
  
  // 报复心理型场景
  {
    id: 9,
    title: '偶尔冷漠',
    scenario: '孩子有时候会不理人，说"我不跟你玩了"，但过一会儿就好了。',
    behaviorType: 'revenge',
    severity: 'mild',
    correctType: '报复心理型',
    correctSeverity: '轻度',
    coreFeeling: '我很痛',
    realNeed: '你终于能感觉到我的痛了吗？',
    explanation: '孩子偶尔冷漠，偶尔说伤人的话。这是轻度报复行为，孩子在表达受伤的感觉。'
  },
  {
    id: 10,
    title: '冷战刺激',
    scenario: '孩子经常冷战，故意说"你最讨厌我了"这样的话来刺激父母，言语攻击明显增多。',
    behaviorType: 'revenge',
    severity: 'moderate',
    correctType: '报复心理型',
    correctSeverity: '中度',
    coreFeeling: '我很痛',
    realNeed: '你终于能感觉到我的痛了吗？',
    explanation: '孩子经常冷战，故意刺激父母。这是中度报复行为，孩子在让父母感受自己的痛。'
  },
  {
    id: 11,
    title: '持续冷战',
    scenario: '孩子持续冷战，故意做让父母难受的事，情绪爆发时会说出很伤人的话。',
    behaviorType: 'revenge',
    severity: 'severe',
    correctType: '报复心理型',
    correctSeverity: '重度',
    coreFeeling: '我很痛',
    realNeed: '你终于能感觉到我的痛了吗？',
    explanation: '孩子持续冷战，故意让父母难受。这是重度报复行为，孩子内心有很多痛苦需要被看见。'
  },
  {
    id: 12,
    title: '完全不信任',
    scenario: '孩子完全不信任任何人，有严重的情绪攻击，甚至有自残或伤害他人的行为。',
    behaviorType: 'revenge',
    severity: 'extreme',
    correctType: '报复心理型',
    correctSeverity: '极重度',
    coreFeeling: '我很痛',
    realNeed: '你终于能感觉到我的痛了吗？',
    explanation: '这是极重度报复行为，孩子已经完全不信任任何人。需要专业心理帮助和长期陪伴。'
  },
  
  // 自我放逐型场景
  {
    id: 13,
    title: '偶尔放弃',
    scenario: '孩子有时候会说"算了，反正我也不行"，偶尔放弃努力，但第二天又会有点兴趣。',
    behaviorType: 'giving_up',
    severity: 'mild',
    correctType: '自我放逐型',
    correctSeverity: '轻度',
    coreFeeling: '我已经放弃希望了',
    realNeed: '其实我也想被爱，只是我不敢再期待了。',
    explanation: '孩子偶尔说"无所谓"，兴趣减少。这是轻度自我放逐行为，需要更多鼓励和认可。'
  },
  {
    id: 14,
    title: '经常摆烂',
    scenario: '孩子经常说"无所谓"，不想努力，情绪低落，对很多事情都提不起兴趣。',
    behaviorType: 'giving_up',
    severity: 'moderate',
    correctType: '自我放逐型',
    correctSeverity: '中度',
    coreFeeling: '我已经放弃希望了',
    realNeed: '其实我也想被爱，只是我不敢再期待了。',
    explanation: '孩子经常摆烂，不想努力。这是中度自我放逐行为，孩子正在失去信心。'
  },
  {
    id: 15,
    title: '完全失去动力',
    scenario: '孩子完全失去动力，经常说"我不行"，自我否定，长期情绪低落，不愿意尝试任何新事物。',
    behaviorType: 'giving_up',
    severity: 'severe',
    correctType: '自我放逐型',
    correctSeverity: '重度',
    coreFeeling: '我已经放弃希望了',
    realNeed: '其实我也想被爱，只是我不敢再期待了。',
    explanation: '孩子完全失去动力，自我否定。这是重度自我放逐行为，孩子需要被重新看见和肯定。'
  },
  {
    id: 16,
    title: '丧失希望',
    scenario: '孩子完全逃避现实，说"活着没意思"，有自伤倾向，对任何事都没有期待。',
    behaviorType: 'giving_up',
    severity: 'extreme',
    correctType: '自我放逐型',
    correctSeverity: '极重度',
    coreFeeling: '我已经放弃希望了',
    realNeed: '其实我也想被爱，只是我不敢再期待了。',
    explanation: '这是极重度自我放逐行为，孩子已经丧失希望。需要立即寻求专业心理帮助。'
  }
];

// 生成报告
export function generateBehaviorReport(score: number, total: number, answers: { typeId: string; severityId: string; isCorrectType: boolean; isCorrectSeverity: boolean }[]) {
  const percentage = Math.round((score / total) * 100);
  
  // 统计每种类型的正确率
  const typeStats = {
    attention: { correct: 0, total: 0 },
    power: { correct: 0, total: 0 },
    revenge: { correct: 0, total: 0 },
    giving_up: { correct: 0, total: 0 }
  };
  
  answers.forEach((answer, index) => {
    const scenario = behaviorScenarios[index];
    if (scenario) {
      typeStats[scenario.behaviorType].total++;
      if (answer.isCorrectType) {
        typeStats[scenario.behaviorType].correct++;
      }
    }
  });
  
  // 确定成长阶段
  let stage = { title: '初学者', description: '开始学习识别偏差行为', icon: '🌱' };
  if (score >= 14) {
    stage = { title: '觉察高手', description: '能准确识别偏差行为类型和程度', icon: '🌟' };
  } else if (score >= 10) {
    stage = { title: '觉察进阶', description: '对偏差行为有较好的理解', icon: '🌿' };
  } else if (score >= 6) {
    stage = { title: '觉察学习中', description: '正在学习识别偏差行为', icon: '🍀' };
  }
  
  // 生成建议
  const suggestions: string[] = [];
  
  if (typeStats.attention.total > 0 && typeStats.attention.correct < typeStats.attention.total) {
    suggestions.push('引起注意型：孩子的行为在说"看看我"，需要更多高质量的陪伴');
  }
  if (typeStats.power.total > 0 && typeStats.power.correct < typeStats.power.total) {
    suggestions.push('权力斗争型：孩子在证明"我也有力量"，需要给予适当的选择权');
  }
  if (typeStats.revenge.total > 0 && typeStats.revenge.correct < typeStats.revenge.total) {
    suggestions.push('报复心理型：孩子在表达"我很痛"，需要看见和接纳他的伤痛');
  }
  if (typeStats.giving_up.total > 0 && typeStats.giving_up.correct < typeStats.giving_up.total) {
    suggestions.push('自我放逐型：孩子已经放弃希望，需要无条件的爱和耐心陪伴');
  }
  
  if (suggestions.length === 0) {
    suggestions.push('你对四种偏差行为都有很好的理解，继续保持觉察！');
  }
  
  return {
    score,
    total,
    percentage,
    stage,
    typeStats,
    suggestions
  };
}

// 金句
export const behaviorInsights = [
  '所有偏差行为，本质都不是攻击，而是没有被满足的需求。',
  '看见行为背后的感受，回应需求，而不是只纠正行为。',
  '每个孩子都渴望被看见、被理解、被爱。',
  '行为是冰山的一角，需求才是冰山的主体。',
  '当孩子"闹"的时候，其实是在说"请看见我"。',
  '理解孩子，从理解他行为背后的需求开始。'
];
