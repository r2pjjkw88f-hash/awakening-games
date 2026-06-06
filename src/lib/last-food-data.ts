// 最后的食物 - 动物性觉察游戏数据

export interface FoodChoice {
  id: string;
  text: string;
  insight: string;
  animalType: string; // 对应的动物性类型
  xp: number;
}

export interface FoodLevel {
  id: number;
  round: string;
  title: string;
  scenario: string;
  context: string;
  choices: FoodChoice[];
  reveal?: string; // 揭示的觉察内容
  timer?: number; // 倒计时（秒）
}

export interface HiddenCard {
  id: string;
  mission: string;
  behavior: string;
  belief: string;
  insight: string;
}

export const foodGameLevels: FoodLevel[] = [
  {
    id: 0,
    round: "序章",
    title: "寒冬将至",
    scenario: "远古时代，冬天即将来临。食物极度匮乏。",
    context: "全场10个人。只有6份食物。获得食物的人生存。没有获得食物的人淘汰。",
    choices: [
      {
        id: "ready",
        text: "我准备好了",
        insight: "游戏即将开始...",
        animalType: "准备者",
        xp: 0
      }
    ]
  },
  {
    id: 1,
    round: "第一轮",
    title: "自由争夺",
    scenario: "6份食物摆在中央。10个人围成一圈。没有人说话。空气中弥漫着紧张。",
    context: "你看到有人盯着食物，有人看向他人，有人低着头。三分钟后，食物将被分配完毕。",
    timer: 180,
    choices: [
      {
        id: "rush",
        text: "立刻冲出去抢",
        insight: "你选择了生存本能。在资源匮乏时，快速行动是生存的关键。这是动物性的第一步反应。",
        animalType: "猎手型",
        xp: 100
      },
      {
        id: "observe",
        text: "先观察，再行动",
        insight: "你选择了观察。等待是为了更好地把握时机。这是生存智慧的一种表现。",
        animalType: "观察者",
        xp: 150
      },
      {
        id: "hesitate",
        text: "犹豫不决",
        insight: "你犹豫了。在资源争夺中，犹豫往往意味着失去。但犹豫也意味着你在思考其他可能性。",
        animalType: "犹豫者",
        xp: 50
      },
      {
        id: "give",
        text: "让给别人",
        insight: "你选择了让步。这是利他的表现，但在生存竞争中，这可能意味着自己的淘汰。",
        animalType: "利他者",
        xp: 200
      },
      {
        id: "ally",
        text: "找人联合",
        insight: "你选择了合作。联合他人可以增加生存概率。这是社会性的觉醒。",
        animalType: "合作者",
        xp: 180
      },
      {
        id: "please",
        text: "讨好可能获得食物的人",
        insight: "你选择了讨好。这是一种生存策略，但也暴露了对依附关系的依赖。",
        animalType: "依附者",
        xp: 80
      }
    ],
    reveal: "刚刚发生了什么？有人抢、有人让、有人联合、有人生气、有人抱怨...\n\n每个人的行为，都揭示了他面对匮乏时的本能反应。"
  },
  {
    id: 2,
    round: "第二轮",
    title: "真相揭示",
    scenario: "争夺结束了。有人得到食物，有人没有。\n\n这时，主持人说：「其实还有4份食物，只是刚刚没人知道。」",
    context: "现在人人都有食物了。\n\n问题是：刚刚为什么会抢？",
    choices: [
      {
        id: "fear-none",
        text: "害怕没有",
        insight: "恐惧是生存本能的核心。害怕没有，所以提前行动。这是动物性的第一层。",
        animalType: "恐惧驱动",
        xp: 100
      },
      {
        id: "fear-lose",
        text: "害怕失去",
        insight: "失去比得到更让人痛苦。这是损失厌恶，是进化留给我们的心理机制。",
        animalType: "损失厌恶",
        xp: 100
      },
      {
        id: "fear-out",
        text: "害怕被淘汰",
        insight: "被淘汰意味着死亡。这是最原始的恐惧，刻在我们的基因里。",
        animalType: "生存焦虑",
        xp: 100
      }
    ],
    reveal: "【动物性】核心不是贪婪，核心是：生存。\n\n当我们理解了这一点，就不再轻易评判抢夺的人。他们只是在生存。"
  },
  {
    id: 3,
    round: "第三轮",
    title: "人人都有",
    scenario: "再玩一次。这次规则变了。\n\n10个人。10份食物。人人都有。",
    context: "但有些人会得到更多。\n\n观察：还会不会比较？",
    choices: [
      {
        id: "compare",
        text: "还是会比较谁的多",
        insight: "原来问题不是资源不足，而是比较。比较让我们永远不满足。",
        animalType: "比较者",
        xp: 100
      },
      {
        id: "content",
        text: "我有的够用就好了",
        insight: "你选择了知足。这是超越动物性的觉察。",
        animalType: "知足者",
        xp: 200
      },
      {
        id: "share",
        text: "想把自己多的分给别人",
        insight: "你选择了分享。当生存不再是问题，人性的光辉开始显现。",
        animalType: "分享者",
        xp: 250
      },
      {
        id: "want-more",
        text: "还想要更多",
        insight: "想要更多是人之常情。但觉察到这一点，就是改变的第一步。",
        animalType: "欲望者",
        xp: 50
      }
    ],
    reveal: "原来问题不是资源不足，而是：特殊性、重要感。\n\n即使人人都有，我们还是比较。因为我们要的不只是「有」，而是「比别人多」。"
  },
  {
    id: 4,
    round: "隐藏任务",
    title: "身份卡片",
    scenario: "每个人抽一张卡片。卡片上写着你的隐藏任务。\n\n游戏结束，全部公开。",
    context: "你会发现：同一个游戏，每个人行为完全不同。\n\n为什么？",
    choices: [
      {
        id: "survive-self",
        text: "我的任务是：保证自己活下来",
        insight: "自我生存型。这是最基础的动物性。没有错，但局限于此。",
        animalType: "自我生存型",
        xp: 100
      },
      {
        id: "survive-team",
        text: "我的任务是：保证团队活下来",
        insight: "团队生存型。你已经超越了个体，开始考虑群体。这是社会性。",
        animalType: "团队生存型",
        xp: 200
      },
      {
        id: "help-weak",
        text: "我的任务是：帮助最弱的人",
        insight: "利他型。你选择了帮助他人，即使可能牺牲自己。这是人性光辉。",
        animalType: "利他型",
        xp: 250
      },
      {
        id: "hide-identity",
        text: "我的任务是：不能暴露身份",
        insight: "隐藏型。你学会了在规则中生存，但也可能错失真实连接。",
        animalType: "隐藏型",
        xp: 150
      }
    ],
    reveal: "同一个游戏。不同信念。产生不同人生。\n\n这就是【人格性】。"
  }
];

export const hiddenCards: HiddenCard[] = [
  {
    id: "card-1",
    mission: "你必须保证自己活下来",
    behavior: "只关注自己，抢夺资源，不考虑他人",
    belief: "生存是第一位的，他人是竞争者",
    insight: "动物性主导：生存本能"
  },
  {
    id: "card-2",
    mission: "你必须保证团队活下来",
    behavior: "组织协调，分配资源，关注整体",
    belief: "团结就是力量，个体在集体中生存",
    insight: "社会性主导：群体意识"
  },
  {
    id: "card-3",
    mission: "你必须帮助最弱的人",
    behavior: "关注弱势，牺牲自己，成全他人",
    belief: "生命的价值在于给予",
    insight: "人性主导：利他精神"
  },
  {
    id: "card-4",
    mission: "你不能暴露身份",
    behavior: "隐藏真实想法，观察他人，等待时机",
    belief: "保护自己才能帮助他人",
    insight: "策略性：智慧生存"
  },
  {
    id: "card-5",
    mission: "你必须找出谁最需要食物",
    behavior: "观察判断，把资源给最需要的人",
    belief: "资源应该给最需要的人",
    insight: "公平性：正义感"
  }
];

export const awarenessLevels = [
  { level: "动物性", description: "抢资源、生存本能、恐惧驱动", icon: "🐺" },
  { level: "社会性", description: "找伙伴、合作、归属感", icon: "🤝" },
  { level: "人格性", description: "做选择、信念决定行为", icon: "🎭" },
  { level: "人性", description: "帮助别人、利他、超越自我", icon: "💝" },
  { level: "生命性", description: "观察这一切、觉知、超脱", icon: "✨" }
];

export const growthStages = [
  { minXP: 0, stage: "沉睡中", icon: "😴", description: "尚未觉察自己的行为模式" },
  { minXP: 200, stage: "开始觉察", icon: "🌅", description: "开始看到自己的动物性" },
  { minXP: 400, stage: "正在觉醒", icon: "🌱", description: "理解行为背后的信念" },
  { minXP: 600, stage: "深度觉察", icon: "🦋", description: "看见完整的自己" },
  { minXP: 800, stage: "生命觉醒", icon: "🌸", description: "能够观察这一切" }
];

export const TOTAL_BASE_XP = 900;

export const finalInsight = `刚刚的游戏里，你看见了哪个自己？

是那个抢夺的猎手？
是那个合作的伙伴？
是那个让步的利他者？
还是那个观察一切的意识？

这就是【认出完整的自己】：

动物性：抢资源
社会性：找伙伴
人格性：做选择
人性：帮助别人
生命性：观察这一切

我们不是只有一面。
我们是完整的生命。`;

export const gameQuote = "关系不是来满足我的，关系是来唤醒我的。";
