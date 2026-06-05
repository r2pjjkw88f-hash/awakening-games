// 倾听孩子游戏数据

export interface ListenChoice {
  text: string;
  isAwakening: boolean;
  feedback: string;
}

export interface ListenLevel {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  scene: string;
  scenario: string;
  choices: ListenChoice[];
  insight: string;
}

export const listenLevels: ListenLevel[] = [
  {
    id: 1,
    title: "放下手机，专注陪伴",
    subtitle: "给孩子全部的注意力",
    icon: "📱",
    scene: "傍晚，孩子放学回家，想和你分享今天发生的事情。你正在看手机...",
    scenario: "孩子走过来：\"妈妈/爸爸，今天学校发生了...\" 你会怎么做？",
    choices: [
      {
        text: "继续看手机，一边点头一边说\"嗯，你说\"",
        isAwakening: false,
        feedback: "孩子感受到你心不在焉，可能会渐渐不想分享了。真正的倾听，需要放下手机，给孩子全部的注意力。"
      },
      {
        text: "放下手机，转过身看着孩子：\"来，坐下来跟我说说\"",
        isAwakening: true,
        feedback: "孩子感受到被重视。放下手机的那一刻，你在告诉孩子：\"你比手机重要。\""
      },
      {
        text: "\"等一下，让我回完这个消息\"，然后继续看手机",
        isAwakening: false,
        feedback: "孩子学会了等待，但也学会了\"我的话不重要\"。倾听的最好时机，是孩子想说的那一刻。"
      }
    ],
    insight: "当你放下手机的那一刻，孩子在心中收到了一个信号：\"我很重要。\""
  },
  {
    id: 2,
    title: "保持眼神，温柔看见",
    subtitle: "用眼神传递：我在听你",
    icon: "👁️",
    scene: "孩子低着头，似乎有心事，想和你说什么却又不太敢开口...",
    scenario: "你注意到孩子的表情，你会怎么做？",
    choices: [
      {
        text: "蹲下来，和孩子平视，温柔地看着TA的眼睛",
        isAwakening: true,
        feedback: "眼神是最深的连接。当你温柔地看着孩子，TA感受到：\"有人看见我了。\""
      },
      {
        text: "\"怎么了？快说呀\"，一边做家务一边等TA说",
        isAwakening: false,
        feedback: "孩子可能更不敢说了。眼神的相遇，是信任的开始。"
      },
      {
        text: "盯着孩子，严肃地问：\"是不是又闯祸了？\"",
        isAwakening: false,
        feedback: "这样的眼神让孩子紧张、防御。温柔的眼神，才能打开孩子的心。"
      }
    ],
    insight: "你的眼神，是孩子感受到安全感的第一个信号。"
  },
  {
    id: 3,
    title: "接纳情绪，不急评判",
    subtitle: "情绪没有对错，允许表达",
    icon: "💜",
    scene: "孩子哭着跑过来：\"我的玩具被同学弄坏了！我好难过！\"",
    scenario: "面对孩子的情绪，你会怎么回应？",
    choices: [
      {
        text: "\"这有什么好哭的，不就是个玩具吗？\"",
        isAwakening: false,
        feedback: "孩子的情绪被否定，TA学会了压抑。情绪没有对错，每一份感受都值得被看见。"
      },
      {
        text: "\"我看到了，你很难过，来，让我抱抱你\"",
        isAwakening: true,
        feedback: "孩子感受到被理解。接纳情绪，是倾听最温柔的部分。"
      },
      {
        text: "\"谁弄的？我去找TA算账！\"",
        isAwakening: false,
        feedback: "虽然你想保护孩子，但TA更需要的，是有人先看见TA的情绪。"
      }
    ],
    insight: "先看见情绪，再解决问题。被接纳的孩子，会更有力量面对困难。"
  },
  {
    id: 4,
    title: "保持耐心，不打断",
    subtitle: "让孩子说完，表达才完整",
    icon: "⏳",
    scenario: "孩子正在慢慢讲述一件事，说得有点慢，还有些结巴...",
    scene: "孩子：\"今天...我们班...有个同学...他...\"",
    choices: [
      {
        text: "耐心等待，用眼神鼓励TA继续说",
        isAwakening: true,
        feedback: "你给了孩子最珍贵的礼物——时间。不打断，是信任的表现。"
      },
      {
        text: "\"快说呀，他怎么了？\"帮TA把话说完",
        isAwakening: false,
        feedback: "孩子可能会觉得自己说得不好。让TA按自己的节奏说，TA会越来越自信。"
      },
      {
        text: "\"行了行了，我知道你想说什么了\"",
        isAwakening: false,
        feedback: "孩子学会了闭嘴。被打断的孩子，会渐渐不再想分享。"
      }
    ],
    insight: "倾听的耐心，是给孩子最深的尊重。让TA说完，TA会感受到自己被认真对待。"
  },
  {
    id: 5,
    title: "共情回应，连接内心",
    subtitle: "用心回应，而不是用嘴解决",
    icon: "👥",
    scenario: "孩子说：\"我不想去上学了，同学都不喜欢我...\"",
    scene: "孩子说出了自己的困扰，你会怎么回应？",
    choices: [
      {
        text: "\"你要主动交朋友啊，不要老是一个人\"",
        isAwakening: false,
        feedback: "孩子需要的不是建议，而是被理解。先回应感受，再一起想办法。"
      },
      {
        text: "\"听起来你很难过，能多跟我说说发生了什么吗？\"",
        isAwakening: true,
        feedback: "孩子感受到被倾听。共情回应，让孩子知道：有人在乎我的感受。"
      },
      {
        text: "\"这有什么，我小时候也是这样，你多...\"",
        isAwakening: false,
        feedback: "孩子需要的不是你的故事，而是你的倾听。先连接，再分享。"
      }
    ],
    insight: "真正的倾听，是用心回应感受，而不是急着给出答案。"
  },
  {
    id: 6,
    title: "给予连接，传递爱与接纳",
    subtitle: "用拥抱、眼神或语言表达爱",
    icon: "💌",
    scene: "孩子说完了一整件事，抬头看着你...",
    scenario: "孩子说完了，安静地等着你的回应。你会怎么做？",
    choices: [
      {
        text: "\"嗯，我知道了。去写作业吧。\"",
        isAwakening: false,
        feedback: "孩子可能觉得白说了。倾听的最后一步，是传递爱与接纳。"
      },
      {
        text: "抱抱孩子，说：\"谢谢你愿意跟我说这些，我很在乎你\"",
        isAwakening: true,
        feedback: "孩子感受到被爱、被接纳。这个拥抱，会成为TA内心的安全基地。"
      },
      {
        text: "\"所以你要记住，下次要...\"开始讲道理",
        isAwakening: false,
        feedback: "孩子学会的是\"妈妈/爸爸又在教育我了\"，而不是\"我被理解了\"。"
      }
    ],
    insight: "倾听的终点，不是解决问题，而是让孩子感受到爱与接纳。"
  }
];

// 倾听洞察金句
export const listenInsights = [
  "90%的时间，只是倾听。真正的倾听，不是解决问题，而是让孩子感觉：\"我被听见了。\"",
  "每个孩子，都需要一个安全的地方，说出心里真正的感受。",
  "你的倾听，会成为孩子内心的安全基地。",
  "每一次被倾听，都是孩子内心长出力量的时刻。",
  "倾听，是给孩子最好的礼物。",
  "当你真正倾听孩子，你就在给TA力量去面对这个世界。"
];

// 生成倾听报告
export function generateListenReport(
  totalPoints: number,
  choices: { levelId: number; choiceIndex: number; isAwakening: boolean }[]
) {
  const maxPoints = listenLevels.length;
  const awakeningCount = choices.filter(c => c.isAwakening).length;
  const percentage = Math.round((awakeningCount / maxPoints) * 100);
  
  // 根据分数给出倾听阶段
  let stage = {
    title: "倾听新手",
    description: "你已经开始觉察到倾听的重要性，继续练习，你会越来越擅长。",
    color: "#a78bfa",
    icon: "🌱"
  };
  
  if (percentage >= 80) {
    stage = {
      title: "倾听高手",
      description: "你已经掌握了倾听的核心，孩子很幸运有你这样的倾听者。",
      color: "#34d399",
      icon: "🌸"
    };
  } else if (percentage >= 50) {
    stage = {
      title: "倾听成长中",
      description: "你正在学习倾听的艺术，持续练习，孩子会越来越愿意和你分享。",
      color: "#fbbf24",
      icon: "🌿"
    };
  }
  
  // 生成建议
  const suggestions = [];
  if (awakeningCount < maxPoints) {
    suggestions.push("每天给孩子10-20分钟的专属倾听时间");
    suggestions.push("放下手机，用眼神和孩子连接");
    suggestions.push("先接纳情绪，再解决问题");
  }
  if (awakeningCount >= 3) {
    suggestions.push("尝试在孩子说完后，用拥抱传递爱与接纳");
    suggestions.push("记住：倾听的终点不是给建议，而是让孩子感受被理解");
  }
  if (awakeningCount === maxPoints) {
    suggestions.push("你已经做得很好了！继续保持这份倾听的力量");
    suggestions.push("用你的倾听，为孩子创造一个安全的情感港湾");
  }
  
  return {
    score: awakeningCount,
    maxScore: maxPoints,
    percentage,
    stage,
    suggestions,
    insight: listenInsights[Math.floor(Math.random() * listenInsights.length)]
  };
}
