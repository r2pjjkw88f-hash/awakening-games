// 归属感与特殊性游戏数据

export interface BelongingLevel {
  id: number;
  levelName: string;
  coreTheme: string;
  tasks: string[];
  item: {
    icon: string;
    name: string;
    description: string;
  };
  health: number;
  baseXP: number;
  hiddenTask: {
    description: string;
    reward: {
      from: string;
      to: string;
      description: string;
    };
    bonusXP: number;
  };
  quote: string;
  sceneImage?: string;
}

export const belongingLevels: BelongingLevel[] = [
  {
    id: 1,
    levelName: "童年的回音",
    sceneImage: "https://coze-coding-project.tos.coze.site/coze_storage_7647773831091879942/image/generate_image_b68e04b8-c30b-4e74-8615-df528ca54413.jpeg?sign=1812290919-3f04db835f-0-1898eea9b1267dbb5aaf1b1a31239b1bab1bab7d238b29e01d66000e14f4b14a",
    coreTheme: "关系中当下的痛苦，往往触碰到小时候'害怕不被爱'的记忆。",
    tasks: [
      "回想一次你因为伴侣冷淡而特别痛苦的经历。",
      "写下那种'我不重要了'的感觉，然后问自己：小时候第一次有类似感觉是什么时候？",
      "写下当时的年龄和发生的事。"
    ],
    item: {
      icon: "🕯️",
      name: "旧蜡烛",
      description: "点亮后能看到过去"
    },
    health: 3,
    baseXP: 300,
    hiddenTask: {
      description: "找一张你那个年龄的照片，对着它说'我看见你了'，然后折起来放进口袋带一天。",
      reward: {
        from: "🕯️",
        to: "✨",
        description: "不灭烛芯 - 永远照亮童年"
      },
      bonusXP: 150
    },
    quote: "那些痛，是小时候的你还在呼唤。"
  },
  {
    id: 2,
    levelName: "接纳之岛",
    sceneImage: "https://coze-coding-project.tos.coze.site/coze_storage_7647773831091879942/image/generate_image_19866eda-fea3-4643-9e23-ff4c1f1e83a8.jpeg?sign=1812290919-7736a28a8d-0-19ef59c54ef3be2464bd3ba06f0ee47b8de37626d4f34103aa4419af29544228",
    coreTheme: "归属感不是被所有人喜欢，而是'即使有缺点，依然被接纳'的安心。",
    tasks: [
      "写下你最害怕被别人发现的三个缺点。",
      "逐一对自己说：'即使我有这个缺点，我依然属于这里。'",
      "选其中一个缺点，今天允许它在别人面前自然流露。"
    ],
    item: {
      icon: "🏝️",
      name: "小岛徽章",
      description: "我可以安心存在"
    },
    health: 2,
    baseXP: 350,
    hiddenTask: {
      description: "在一段平时会让你紧张的关系中，主动说出一句真实感受，不解释、不求回应。",
      reward: {
        from: "🏝️",
        to: "🌊",
        description: "有浪花环绕的岛 - 真实让你更自由"
      },
      bonusXP: 175
    },
    quote: "不完美的人，才需要归属。"
  },
  {
    id: 3,
    levelName: "懂事的面具",
    sceneImage: "https://coze-coding-project.tos.coze.site/coze_storage_7647773831091879942/image/generate_image_6761be7b-7a94-4636-9e90-4ad942766481.jpeg?sign=1812290920-5ff1f4ca5a-0-4b117bad7540904457944fb9c075dc78da2fa77d8128bcffbfef1de33313d8d9",
    coreTheme: "为了不被丢下，我们发展出讨好、完美、不麻烦别人的生存策略。",
    tasks: [
      "列出你小时候为了获得爱而做的三件事。",
      "写下你现在还在延续的类似行为。",
      "今天故意做一件'不乖但无害'的事，不向任何人解释。"
    ],
    item: {
      icon: "🎭",
      name: "半张面具",
      description: "你一直戴着的'懂事'面具"
    },
    health: 3,
    baseXP: 400,
    hiddenTask: {
      description: "完成那件'不乖'的事后，对自己说'我不需要完美才值得存在'。",
      reward: {
        from: "🎭",
        to: "💔",
        description: "裂开的面具 - 真实的你更可爱"
      },
      bonusXP: 200
    },
    quote: "懂事的孩子没有糖，只有更重的期待。"
  },
  {
    id: 4,
    levelName: "唯一宝座",
    sceneImage: "https://coze-coding-project.tos.coze.site/coze_storage_7647773831091879942/image/generate_image_39ffdfdf-3f7a-4023-a81f-e6a7c435432e.jpeg?sign=1812290919-21360447d0-0-7bd4c44055c519ba5bc371c810ea92fed912365f0df4a4b2705c7fafb8d01d74",
    coreTheme: "渴望成为'不可替代的人'，背后是害怕'如果我不特别，就不会被爱'。",
    tasks: [
      "写下你在关系中最想听到的一句话。",
      "然后对着镜子，自己说出这句话。",
      "问自己：如果没有这句话，我还知道自己有价值吗？把答案写下来。"
    ],
    item: {
      icon: "👑",
      name: "纸王冠",
      description: "你追求的'特殊性'"
    },
    health: 2,
    baseXP: 450,
    hiddenTask: {
      description: "当你感到酸涩时，不发作、不质问，只对自己说'我不需要排第一'。",
      reward: {
        from: "👑",
        to: "🌿",
        description: "草编王冠 - 平凡中的真实力量"
      },
      bonusXP: 225
    },
    quote: "你不需要特别，才值得被爱。"
  },
  {
    id: 5,
    levelName: "摇摆的天平",
    sceneImage: "https://coze-coding-project.tos.coze.site/coze_storage_7647773831091879942/image/generate_image_0645e6e0-a540-42e0-ba69-36b6a5f0728d.jpeg?sign=1812290920-a5b2350801-0-f14f12c1015e539cad74058420c95d60f73aa0461eb5f2a6b8b13482087d0faa",
    coreTheme: "对方冷淡或关注别人时，恐慌的不是失去关系，而是'我不再特别了'。",
    tasks: [
      "回忆一次你因为对方'注意力转移'而爆发的争吵。",
      "写下当时你真正想问的问题。",
      "对自己说：'我的价值不取决于排第几。' 并把这句话写在手背上保留一天。"
    ],
    item: {
      icon: "⚖️",
      name: "小天平",
      description: "你不断比较'谁更重要'"
    },
    health: 1,
    baseXP: 500,
    hiddenTask: {
      description: "下一次感到'被比下去'时，在心里默念：'我允许自己此刻不重要。' 停留30秒，什么都不做。",
      reward: {
        from: "⚖️",
        to: "🌿",
        description: "平衡之草 - 内心的平静不再摇晃"
      },
      bonusXP: 250
    },
    quote: "比较是偷走快乐的小偷。"
  },
  {
    id: 6,
    levelName: "回家的门",
    sceneImage: "https://coze-coding-project.tos.coze.site/coze_storage_7647773831091879942/image/generate_image_01c8b229-6888-4d9f-b1b0-ef3b1e526091.jpeg?sign=1812290919-804e9d3053-0-e75911e917a1ded148ab74c8679dd80ccbed5e2490670d16921d1f51f0b2b490",
    coreTheme: "你可以休息了。不需要证明才值得被爱。普通存在也值得被爱。",
    tasks: [
      "找一个安静的地方坐下，闭上眼睛，想象小时候那个很努力的孩子。",
      "轻轻对他说：'你可以休息了。即使什么都不做，我也爱你。'",
      "写下一句你真正需要的承诺。"
    ],
    item: {
      icon: "🛏️",
      name: "小枕头",
      description: "允许自己休息"
    },
    health: 3,
    baseXP: 600,
    hiddenTask: {
      description: "今天给自己半天时间'不产出'——可以发呆、散步、睡觉，但不做任何有目的的事，且不准自责。",
      reward: {
        from: "🛏️",
        to: "🌙",
        description: "安睡之枕 - 真正的休息无需愧疚"
      },
      bonusXP: 300
    },
    quote: "你值得被爱，仅仅因为你存在。"
  },
  {
    id: 7,
    levelName: "无条件的花园",
    sceneImage: "https://coze-coding-project.tos.coze.site/coze_storage_7647773831091879942/image/generate_image_29d37922-a01c-4504-a206-59a4a4b30cb8.jpeg?sign=1812290921-dca6292b33-0-5d8093511110ea298cd5f103f65ab2e0b6726b234bed4bdf70884c0637dd9297",
    coreTheme: "即使没有人时刻证明我的价值，我依然完整。真正的归属感是不再丢下自己。",
    tasks: [
      "完成这个句子：'以前，我以为被爱需要______。现在，我开始相信______。'",
      "把这句话写在一张纸上，贴在每天能看到的地方，持续一周。",
      "第七天结束时，对自己说：'欢迎回家。'"
    ],
    item: {
      icon: "🏠",
      name: "小房子",
      description: "我永远属于自己的归属"
    },
    health: 4,
    baseXP: 800,
    hiddenTask: {
      description: "连续三天，每天早上对自己说：'我选择今天不丢下自己。'",
      reward: {
        from: "🏠",
        to: "🌸",
        description: "花开之家 - 你终于回到了自己"
      },
      bonusXP: 400
    },
    quote: "归属感不是找到的，是创造出来的。"
  }
];

// 经验值计算
export const TOTAL_BASE_XP = belongingLevels.reduce((sum, level) => sum + level.baseXP, 0); // 3400
export const TOTAL_HIDDEN_XP = belongingLevels.reduce((sum, level) => sum + level.hiddenTask.bonusXP, 0); // 1700
export const GRAND_TOTAL_XP = TOTAL_BASE_XP + TOTAL_HIDDEN_XP; // 5100

// 成长阶段
export const growthStages = [
  { minXP: 0, name: "迷失中", icon: "🌙" },
  { minXP: 500, name: "开始寻找", icon: "🌅" },
  { minXP: 1200, name: "慢慢靠近", icon: "🌱" },
  { minXP: 2000, name: "正在觉醒", icon: "🌿" },
  { minXP: 2800, name: "深度觉察", icon: "🌳" },
  { minXP: 3400, name: "找到归属", icon: "🏠" }
];

// 最终奖励
export const finalRewards = {
  title: "归属觉醒者",
  skill: "《归属之路：从寻找到了解的21天练习》",
  mantra: "我不再丢下自己，因为我就是我归属的地方。"
};
