// 归属与特殊：找回自己 - 游戏数据

export interface BelongingChoice {
  text: string;
  isAwakened: boolean;
  feedback: string;
  xp: number;
}

export interface BelongingLevel {
  id: number;
  levelName: string;
  coreTheme: string;
  scenario: string;
  choices: BelongingChoice[];
  item: {
    icon: string;
    name: string;
  };
  health: number;
  hiddenTask: {
    description: string;
    bonusXP: number;
    reward: {
      from: string;
      to: string;
      description: string;
    };
  };
  quote: string;
  sceneImage: string;
}

export const belongingLevels: BelongingLevel[] = [
  {
    id: 1,
    levelName: "童年的回音",
    coreTheme: "关系中当下的痛苦，往往触碰到小时候【害怕不被爱】的记忆",
    scenario: "伴侣今晚没有回复你的消息，你感到一阵强烈的【我不重要了】的感觉涌上心头。这种痛，比【只是没回消息】应该有的程度更深...",
    choices: [
      {
        text: "不断发消息追问，直到对方回复",
        isAwakened: false,
        feedback: "这是本能的反应，但焦虑只会让关系更紧张。这种【不被爱】的感觉，可能来自更早的时候...",
        xp: 50
      },
      {
        text: "告诉自己【他可能只是在忙】，先做自己的事",
        isAwakened: false,
        feedback: "理智上理解了，但内心那个【我不重要】的感觉还在。它需要被看见，而不只是被压抑。",
        xp: 100
      },
      {
        text: "停下来，问自己：【这种感觉很熟悉，我小时候什么时候有过？】",
        isAwakened: true,
        feedback: "觉察之光亮起！你触碰到了童年那个【害怕不被爱】的孩子。当你看见TA，疗愈就开始了。",
        xp: 300
      }
    ],
    item: {
      icon: "🕯️",
      name: "旧蜡烛"
    },
    health: 3,
    hiddenTask: {
      description: "找一张你童年时期的照片，对着它说【我看见你了】，然后折起来放进口袋带一天。",
      bonusXP: 150,
      reward: {
        from: "🕯️",
        to: "✨",
        description: "不灭烛芯 - 能照亮更深的记忆"
      }
    },
    quote: "当你看见那个孩子，疗愈就开始了。",
    sceneImage: "https://coze-coding-project.tos.coze.site/coze_storage_7647773831091879942/image/generate_image_b68e04b8-c30b-4e74-8615-df528ca54413.jpeg"
  },
  {
    id: 2,
    levelName: "接纳之岛",
    coreTheme: "归属感不是被所有人喜欢，而是【即使有缺点，依然被接纳】的安心",
    scenario: "朋友聚会时，你不小心说错了话，感到脸上发烫。心里有个声音在说：【他们肯定觉得我很蠢，我不属于这里...】",
    choices: [
      {
        text: "赶紧找话题转移注意力，假装什么都没发生",
        isAwakened: false,
        feedback: "躲闪会让你更加不安。你真正需要的，是允许自己【不完美】。",
        xp: 50
      },
      {
        text: "一整晚都在想刚才说错的话，觉得自己很糟糕",
        isAwakened: false,
        feedback: "自我批评不会让你感到归属。真正的归属，是允许自己犯错还被接纳。",
        xp: 80
      },
      {
        text: "对自己说：【即使我说错话，我依然属于这里】，然后继续参与",
        isAwakened: true,
        feedback: "你找到了接纳之岛！真正的归属感，不是完美，而是被看见后依然被接纳。",
        xp: 350
      }
    ],
    item: {
      icon: "🏝️",
      name: "小岛徽章"
    },
    health: 2,
    hiddenTask: {
      description: "在一段平时会让你紧张的关系中，主动说出一句真实感受（如【其实我有点紧张】），不解释、不求回应。",
      bonusXP: 200,
      reward: {
        from: "🏝️",
        to: "🌊",
        description: "有浪花环绕的岛 - 更安心的存在"
      }
    },
    quote: "真正的归属，是允许自己不完美。",
    sceneImage: "https://coze-coding-project.tos.coze.site/coze_storage_7647773831091879942/image/generate_image_19866eda-fea3-4643-9e23-ff4c1f1e83a8.jpeg"
  },
  {
    id: 3,
    levelName: "懂事的面具",
    coreTheme: "为了不被丢下，我们发展出讨好、完美、不麻烦别人的生存策略",
    scenario: "同事让你帮忙加班做一份报告，你其实已经很累了，但【不懂事】的恐惧让你不敢拒绝...",
    choices: [
      {
        text: "答应帮忙，即使自己已经很累",
        isAwakened: false,
        feedback: "懂事的面具又戴上了。但每次牺牲自己，内心都会累积委屈。",
        xp: 50
      },
      {
        text: "勉强答应，但一整晚都在抱怨",
        isAwakened: false,
        feedback: "答应了又抱怨，既委屈了自己，也影响了关系。这是面具的代价。",
        xp: 80
      },
      {
        text: "温和地说：【今天我有点累，没办法帮忙】，不解释、不道歉",
        isAwakened: true,
        feedback: "面具裂开了！你发现：拒绝并不会被抛弃。真正的关系，经得起真实的你。",
        xp: 400
      }
    ],
    item: {
      icon: "🎭",
      name: "半张面具"
    },
    health: 3,
    hiddenTask: {
      description: "今天故意做一件【不乖但无害】的事（如多睡半小时、拒绝一个不必要的请求），不向任何人解释。",
      bonusXP: 200,
      reward: {
        from: "🎭",
        to: "🎭💔",
        description: "裂开的面具 - 真实开始透出来"
      }
    },
    quote: "我不需要完美才值得存在。",
    sceneImage: "https://coze-coding-project.tos.coze.site/coze_storage_7647773831091879942/image/generate_image_6761be7b-7a94-4636-9e90-4ad942766481.jpeg"
  },
  {
    id: 4,
    levelName: "唯一宝座",
    coreTheme: "渴望成为【不可替代的人】，背后是害怕【如果我不特别，就不会被爱】",
    scenario: "伴侣夸奖了另一个朋友【真厉害】，你感到一阵酸涩。心里有个声音：【那我是不是不够好了？】",
    choices: [
      {
        text: "马上提醒伴侣自己的优点和成就",
        isAwakened: false,
        feedback: "竞争只会让你更焦虑。你真正需要的，是确信自己的价值不需要比较。",
        xp: 50
      },
      {
        text: "沉默不语，但心里记下了这件事",
        isAwakened: false,
        feedback: "压抑的感受不会消失，它们会变成隐形的墙。价值不需要【排第一】来证明。",
        xp: 80
      },
      {
        text: "承认酸涩的感觉，然后告诉自己：【他的优秀不代表我不够好】",
        isAwakened: true,
        feedback: "你从唯一宝座上走下来了！每个人的价值都是独特的，不需要比较。",
        xp: 450
      }
    ],
    item: {
      icon: "👑",
      name: "纸王冠"
    },
    health: 2,
    hiddenTask: {
      description: "今天观察伴侣（或重要他人）对别人做了一件也会对你做的事，当你感到酸涩时，不发作、不质问，只对自己说【我不需要排第一】。",
      bonusXP: 250,
      reward: {
        from: "👑",
        to: "🌿",
        description: "草编王冠 - 真实价值不需要证明"
      }
    },
    quote: "我的价值不取决于排第几。",
    sceneImage: "https://coze-coding-project.tos.coze.site/coze_storage_7647773831091879942/image/generate_image_39ffdfdf-3f7a-4023-a81f-e6a7c435432e.jpeg"
  },
  {
    id: 5,
    levelName: "摇摆的天平",
    coreTheme: "对方冷淡或关注别人时，恐慌的不是失去关系，而是【我不再特别了】",
    scenario: "伴侣最近加班很多，回家后很少和你说话。你感到被忽略，开始怀疑：【是不是我们的感情出了问题？】",
    choices: [
      {
        text: "追问伴侣：【你是不是不爱我了？】",
        isAwakened: false,
        feedback: "恐惧在说话，但这样的追问只会让关系更紧张。",
        xp: 50
      },
      {
        text: "同样冷淡回应，等对方先开口",
        isAwakened: false,
        feedback: "防御姿态保护不了关系。真正的安全感，不需要用冷淡来证明。",
        xp: 80
      },
      {
        text: "先关心伴侣：【你最近好像很累】，同时告诉自己：【他的疲惫不等于我的不重要】",
        isAwakened: true,
        feedback: "天平不再摇摆了！你学会了把对方的情绪和自己的价值分开。",
        xp: 500
      }
    ],
    item: {
      icon: "⚖️",
      name: "小天平"
    },
    health: 1,
    hiddenTask: {
      description: "下一次感到【被比下去】时，在心里默念：【我允许自己此刻不重要】，停留30秒，什么都不做。",
      bonusXP: 300,
      reward: {
        from: "⚖️",
        to: "🌿",
        description: "平衡之草 - 内心的稳定"
      }
    },
    quote: "他的情绪不等于我的价值。",
    sceneImage: "https://coze-coding-project.tos.coze.site/coze_storage_7647773831091879942/image/generate_image_0645e6e0-a540-42e0-ba69-36b6a5f0728d.jpeg"
  },
  {
    id: 6,
    levelName: "回家的门",
    coreTheme: "你可以休息了。不需要证明才值得被爱。普通存在也值得被爱。",
    scenario: "你终于完成了一件很重要的事，期待得到认可。但似乎没有人注意到...心里那个声音又开始：【你做得还不够好...】",
    choices: [
      {
        text: "主动告诉别人自己完成的事，希望得到肯定",
        isAwakened: false,
        feedback: "你值得被看见，但真正的价值不需要不断证明。休息一下，你已经很努力了。",
        xp: 100
      },
      {
        text: "告诉自己【没什么大不了的】，压抑期待被认可的心情",
        isAwakened: false,
        feedback: "压抑不会让需要消失。你值得休息，也值得被认可——哪怕只是对自己说。",
        xp: 150
      },
      {
        text: "停下来，深呼吸，对自己说：【我做得很好，我可以休息了】，不需要任何人确认",
        isAwakened: true,
        feedback: "你找到了回家的门！真正的休息，不需要外界的许可。你的存在本身就是价值。",
        xp: 600
      }
    ],
    item: {
      icon: "🛏️",
      name: "小枕头"
    },
    health: 3,
    hiddenTask: {
      description: "给自己半天时间【不产出】——可以发呆、散步、睡觉，但不做任何有目的的事，且不准自责。",
      bonusXP: 350,
      reward: {
        from: "🛏️",
        to: "🛏️🌙",
        description: "安睡之枕 - 真正的休息"
      }
    },
    quote: "你可以休息了。你的存在本身就是价值。",
    sceneImage: "https://coze-coding-project.tos.coze.site/coze_storage_7647773831091879942/image/generate_image_01c8b229-6888-4d9f-b1b0-ef3b1e526091.jpeg"
  },
  {
    id: 7,
    levelName: "无条件的花园",
    coreTheme: "即使没有人时刻证明我的价值，我依然完整。真正的归属感是不再丢下自己。",
    scenario: "回顾这段觉察之旅，你开始明白：原来一直在寻找的归属，不在别人的认可里，而在自己内心深处...",
    choices: [
      {
        text: "【我觉得我还需要更多努力，才能真的被爱】",
        isAwakened: false,
        feedback: "这是旧的声音。觉察已经开始了，你正在回家的路上。",
        xp: 100
      },
      {
        text: "【我愿意开始尝试，不再用优秀交换爱】",
        isAwakened: false,
        feedback: "这是重要的一步！觉察带来改变，你正在打开那扇门。",
        xp: 400
      },
      {
        text: "【我欢迎所有曾让我痛苦的，因为它们是我觉醒的台阶。我回家了。】",
        isAwakened: true,
        feedback: "欢迎回家！你找到了真正的归属——那个永远不会丢下自己的自己。🌸",
        xp: 800
      }
    ],
    item: {
      icon: "🏠",
      name: "小房子"
    },
    health: 4,
    hiddenTask: {
      description: "连续三天，每天早上醒来对自己说：【欢迎回家，我永远属于自己】。",
      bonusXP: 400,
      reward: {
        from: "🏠",
        to: "🏡🌸",
        description: "花开之屋 - 永远的归属"
      }
    },
    quote: "真正的归属，是永远不丢下自己。",
    sceneImage: "https://coze-coding-project.tos.coze.site/coze_storage_7647773831091879942/image/generate_image_29d37922-a01c-4504-a206-59a4a4b30cb8.jpeg"
  }
];

// 计算最高可获得XP（所有觉醒选择）
export const TOTAL_BASE_XP = belongingLevels.reduce((sum, level) => {
  const maxXP = Math.max(...level.choices.map(c => c.xp));
  return sum + maxXP;
}, 0);
export const TOTAL_HIDDEN_XP = belongingLevels.reduce((sum, level) => sum + level.hiddenTask.bonusXP, 0);
export const GRAND_TOTAL_XP = TOTAL_BASE_XP + TOTAL_HIDDEN_XP;

export const growthStages = [
  { minXP: 0, name: "迷失中", icon: "🌙" },
  { minXP: 500, name: "开始觉察", icon: "🌅" },
  { minXP: 1200, name: "正在觉醒", icon: "🌱" },
  { minXP: 2000, name: "深度觉察", icon: "🦋" },
  { minXP: 2800, name: "归属觉醒者", icon: "🌸" },
  { minXP: 3400, name: "花开时刻", icon: "🌺" }
];

export const finalRewards = {
  skillBook: "《归属与特殊：找回自己的60天练习》",
  title: "归属觉醒者",
  mantra: "真正的归属，是永远不丢下自己。"
};
