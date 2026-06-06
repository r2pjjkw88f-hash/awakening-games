// 亲密关系觉醒之旅 - 增强版游戏数据

export interface HiddenTask {
  description: string;
  rewardXP: number;
  rewardItem?: {
    from: string;
    to: string;
    description: string;
  };
}

export interface LevelData {
  id: number;
  levelName: string; // 关卡名称（如"影子剧场"）
  theme: string; // 核心主题
  emotion: string; // 关卡情绪标签
  scenario: string; // 场景描述
  choices: Array<{
    id: string;
    text: string;
    isAwakened: boolean;
    feedback: string;
    baseXP: number;
  }>;
  item: {
    icon: string;
    name: string;
    description: string;
  };
  healthBar: number; // 1-5
  baseXP: number;
  xpBreakdown: Array<{ condition: string; xp: number }>;
  hiddenTask: HiddenTask;
  quote: string;
}

export const awakeningJourneyLevels: LevelData[] = [
  {
    id: 1,
    levelName: "影子剧场",
    theme: "看见自己把未完成的剧本投射到对方身上",
    emotion: "投射",
    scenario: `深夜，你看着伴侣刷手机的背影，心里涌起一阵烦躁。

"他从来不关心我，只顾着自己玩。"

这个声音在你脑海里回响。你想起小时候，爸爸也总是这样——回到家就坐在沙发上，对你不理不睬。

现在，你看着眼前这个人，愤怒和委屈交织在一起。

你准备好说出那些积压已久的话了……`,
    choices: [
      {
        id: "confront",
        text: "你从来不关心我！你就像我爸一样，只会无视我！",
        isAwakened: false,
        feedback: `你说出了那些话，但心里并没有轻松。

对方可能感到莫名其妙，甚至被冒犯。这场争吵，也许只是过去剧本的延续。

投射，让我们把过去的痛苦，安在了现在的人身上。`,
        baseXP: 50
      },
      {
        id: "withdraw",
        text: "算了，反正说了也没用，我自己待着吧。",
        isAwakened: false,
        feedback: `你选择了沉默，但心里的委屈没有消失。

这种模式很熟悉——小时候，你也学会了不表达，因为"说了也没用"。

但沉默不是觉察，只是另一种逃避。`,
        baseXP: 80
      },
      {
        id: "aware",
        text: "（内心觉察）这个烦躁是我过去的剧本，不是现在的他。",
        isAwakened: true,
        feedback: `你停住了。在情绪涌起的瞬间，你看见了那个小女孩——她曾被忽视，她渴望被看见。

"他不是我父亲。这是我的投射。"

手电筒照向了自己，影子渐渐清晰。

🌟 +100 XP 识别出一个投射
🌟 +200 XP 成功区分'事实'与'我认为'`,
        baseXP: 300
      }
    ],
    item: {
      icon: "🔦",
      name: "手电筒",
      description: "照向别人之前，先照向自己"
    },
    healthBar: 3,
    baseXP: 300,
    xpBreakdown: [
      { condition: "识别出一个投射", xp: 100 },
      { condition: "成功区分'事实'与'我认为'", xp: 200 }
    ],
    hiddenTask: {
      description: `找一个你很看不惯伴侣的小习惯（比如牙膏从中间挤）。

连续三天，每次看到时不说任何话，只对自己说："这是我的一部分，我讨厌它。"

完成后额外获得 +150 XP`,
      rewardXP: 150,
      rewardItem: {
        from: "🔦",
        to: "🌟",
        description: "手电筒升级为星光手电筒（可照亮更深的潜意识）"
      }
    },
    quote: "我们在别人身上看到的，往往是自己不愿面对的。"
  },
  {
    id: 2,
    levelName: "许愿井",
    theme: "识别并放下过度的期待",
    emotion: "期待",
    scenario: `今天是你们的纪念日。你在心里默默期待他会记得，会准备惊喜。

一整天过去了，他像往常一样工作、回家、看手机，没有任何特别的表示。

晚上，你忍不住了："你知道今天是什么日子吗？"

他愣住了。

你心里的失望像井水一样漫上来……`,
    choices: [
      {
        id: "demand",
        text: "你怎么可以这样？我对你那么好，你却连纪念日都不记得！",
        isAwakened: false,
        feedback: `你把期待变成了指责。

"你应该记得"——这是你的期待，不是他的义务。

期待落空时，我们常常用愤怒来掩盖受伤。但愤怒不会让期待被满足，只会让关系更远。`,
        baseXP: 50
      },
      {
        id: "pretend",
        text: "没事，其实我也不太在意这些……",
        isAwakened: false,
        feedback: `你假装不在意，但心里的失落是真的。

否定自己的需求，并不会让需求消失。它只是藏得更深，下次会以更强烈的方式爆发。

期待没有错，错的是假装没有期待。`,
        baseXP: 80
      },
      {
        id: "accept",
        text: "（觉察期待）我失望是因为我对他有期待，但期待是我自己的选择。",
        isAwakened: true,
        feedback: `你看见了那口许愿井。

"我期待他记得"——这是我的期待，不是他必须履行的契约。

你可以选择继续期待，也可以选择放下。放下不是放弃，是把幸福的钥匙拿回自己手里。

🌟 +100 XP 写下5个期待
🌟 +300 XP 放下其中4个（允许自己保留1个作为"温柔请求"）`,
        baseXP: 400
      }
    ],
    item: {
      icon: "📜",
      name: "契约书",
      description: "'我的幸福，不完全由对方履行。'"
    },
    healthBar: 2,
    baseXP: 400,
    xpBreakdown: [
      { condition: "写下5个期待", xp: 100 },
      { condition: "放下其中4个", xp: 300 }
    ],
    hiddenTask: {
      description: `选择一个你一直期待对方为你做的事（例如：主动道歉、记得纪念日）。

反过来由你主动先做一次，且不期待回报。

完成后额外获得 +200 XP`,
      rewardXP: 200,
      rewardItem: {
        from: "📜",
        to: "📜✨",
        description: "契约书变成金色契约书"
      }
    },
    quote: "期待是把幸福的钥匙交给了别人，放下是把钥匙拿回来。"
  },
  {
    id: 3,
    levelName: "废墟花园",
    theme: "接纳失望是关系的常客，不是末日",
    emotion: "失望",
    scenario: `你已经努力了很久——努力理解他，努力包容他，努力成为更好的自己。

但今天，他又说了那句让你最受伤的话。就那样轻飘飘地，把你所有的努力都否定了。

"你总是这样。"

那一刻，你觉得所有的付出都是笑话。心里那座精心照料的花园，好像突然塌了。

你站在废墟里，不知道该继续，还是放弃……`,
    choices: [
      {
        id: "revenge",
        text: "好啊，那我也来说说你总是怎样！",
        isAwakened: false,
        feedback: `你选择了反击。失望变成了武器，伤害彼此。

也许你说赢了，但关系输了。

失望没有被看见，只是被发泄。伤口还在，只是用愤怒盖住了。`,
        baseXP: 30
      },
      {
        id: "escape",
        text: "算了，我早就习惯了。反正没人真正理解我。",
        isAwakened: false,
        feedback: `你选择了麻木。

"习惯了"是失望的慢性毒药。它让你不再期待，也让你不再真实。

失望是常客，但不应该成为主人。`,
        baseXP: 50
      },
      {
        id: "feel",
        text: "（允许失望）我很失望，这很正常。失望不是末日，是关系的一部分。",
        isAwakened: true,
        feedback: `你撑开了雨伞，站在雨里，允许自己被淋湿一点点。

"我失望了。"
"没关系，失望会过去。"
"这片废墟上，还能长出新的花。"

失望不是敌人，是让你看见自己多在乎的信号。

🌟 +100 XP 承认一次真实的失望
🌟 +250 XP 在失望后24小时内没有报复、冷战或攻击`,
        baseXP: 350
      }
    ],
    item: {
      icon: "🌧️",
      name: "雨伞",
      description: "失望来了不淋湿自己"
    },
    healthBar: 1,
    baseXP: 350,
    xpBreakdown: [
      { condition: "承认一次真实的失望", xp: 100 },
      { condition: "失望后24小时内没有报复、冷战或攻击", xp: 250 }
    ],
    hiddenTask: {
      description: `在你最失望的那件事上，写一封永远不会寄出的信给对方。

只写"我失望的是什么，我原本真正想要的是什么"。

写完后烧掉或撕碎。

完成后额外获得 +250 XP`,
      rewardXP: 250,
      rewardItem: {
        from: "🌧️",
        to: "🌂",
        description: "雨伞升级为自动防水伞"
      }
    },
    quote: "失望是关系送给我们的礼物——它告诉我们，什么是我们真正珍视的。"
  },
  {
    id: 4,
    levelName: "火焰十字路口",
    theme: "不再逃避冲突，把它当作灵魂的信号",
    emotion: "冲突",
    scenario: `争吵开始了。

他的声音越来越大，你的心越来越紧。那些话像箭一样射过来："你从来不考虑我的感受！""你总是只想着自己！"

你想反击，想证明他错了，想让他知道你有多委屈。

但你的心在另一个地方——这里好热，好痛，好像有一个更深的声音在说：

"看看这个伤口，它在等你好久了。"`,
    choices: [
      {
        id: "win",
        text: "你说我不考虑你？那我问你，上次是谁——",
        isAwakened: false,
        feedback: `你选择了争输赢。

但赢了吵架，输了关系，值得吗？

冲突不是要打败对方，是要看见自己。当你把能量都用在证明"我对你错"时，就没有能量去真正倾听了。`,
        baseXP: 30
      },
      {
        id: "shut",
        text: "你爱怎么想怎么想，我不想说了。",
        isAwakened: false,
        feedback: `你选择了回避。

回避冲突，冲突不会消失。它只是躲进身体里，变成疲惫、失眠、慢性疼痛。

真正的暂停，是为了回来，不是逃跑。`,
        baseXP: 50
      },
      {
        id: "pause",
        text: "（暂停）我现在很激动，能不能先停下来，我们各自冷静一下？",
        isAwakened: true,
        feedback: `你按下了暂停键。

那5秒的停顿，你给了自己一个机会——不是反击，而是看见。

"我为什么这么激动？他说的哪句话戳到了我？"

冲突不是敌人，是信号灯。它在告诉你：这里有一个伤口需要被看见。

🌟 +150 XP 在冲突中成功暂停5秒
🌟 +350 XP 冲突后主动说出自己的感受（而非指责）`,
        baseXP: 500
      }
    ],
    item: {
      icon: "🛡️",
      name: "小盾牌",
      description: "保护自己不陷入输赢游戏"
    },
    healthBar: 2,
    baseXP: 500,
    xpBreakdown: [
      { condition: "在冲突中成功暂停5秒", xp: 150 },
      { condition: "冲突后主动说出自己的感受", xp: 350 }
    ],
    hiddenTask: {
      description: `下一次冲突时，故意不争输赢，而是问对方：

"你希望我怎么理解你？"

即使对方不回答，你也算完成。

完成后额外获得 +300 XP`,
      rewardXP: 300,
      rewardItem: {
        from: "🛡️",
        to: "🛡️✨",
        description: "盾牌升级为'不破之盾'（不再因冲突而自我否定）"
      }
    },
    quote: "冲突是灵魂的信号灯——它亮起的时候，是在邀请你看见自己。"
  },
  {
    id: 5,
    levelName: "镜厅",
    theme: "从'谁爱我'转向'我是谁'",
    emotion: "觉察",
    scenario: `关系走到这里，你开始问自己一些问题：

"他爱不爱我？"
"这段关系有没有未来？"
"我是不是值得被爱？"

这些问题让你焦虑、疲惫。你一直在外面找答案，找确认，找安全感。

但今天，你站在镜子前，突然看到一个问题：

"那我呢？我是谁？"`,
    choices: [
      {
        id: "compare",
        text: "别人都那么幸福，我是不是哪里有问题？",
        isAwakened: false,
        feedback: `比较是觉察的天敌。

当你把注意力放在"别人"和"我"的比较上时，你就离自己越来越远了。

每个人都是不同的灵魂旅程。别人的幸福，不是你的标准答案。`,
        baseXP: 30
      },
      {
        id: "seek",
        text: "我应该让他更爱我，这样我就有答案了。",
        isAwakened: false,
        feedback: `你还在外面找答案。

"他爱我"就能证明"我值得被爱"吗？

真正的价值感，不是从别人的眼睛里找到的，是从自己的心里长出来的。`,
        baseXP: 50
      },
      {
        id: "mirror",
        text: "（照镜子）我不需要变得完美才值得被爱。我就是我。",
        isAwakened: true,
        feedback: `你看着镜子里的自己。

那些缺点、那些不完美、那些曾经让你羞耻的部分——它们都是你。

"我不需要变得更好才值得被爱。"

这不是自恋，是自我接纳。当你不再用"谁爱我"来定义自己时，你开始真正自由。

🌟 +200 XP 连续3天每天3次问自己感受
🌟 +400 XP 写出"我在关系中最常上演的旧故事"`,
        baseXP: 600
      }
    ],
    item: {
      icon: "🪞",
      name: "镜子",
      description: "看见真实的样子，而非投射"
    },
    healthBar: 3,
    baseXP: 600,
    xpBreakdown: [
      { condition: "连续3天每天3次问自己感受", xp: 200 },
      { condition: "写出'我在关系中最常上演的旧故事'", xp: 400 }
    ],
    hiddenTask: {
      description: `在镜子前看着自己的眼睛，说三遍：

"我不需要变得完美才值得被爱。"

如果有情绪涌出，允许它流出来。

完成后额外获得 +400 XP`,
      rewardXP: 400,
      rewardItem: {
        from: "🪞",
        to: "🪞🔮",
        description: "镜子升级为'真相之镜'（能照出情绪背后的童年根源）"
      }
    },
    quote: "当你不再用'谁爱我'来定义自己时，你才真正开始认识自己。"
  },
  {
    id: 6,
    levelName: "觉醒之门",
    theme: "矛盾不再是灾难，而是养分",
    emotion: "成长",
    scenario: `你来到了旅程的终点。

回头看，那些曾经让你痛苦的——投射、期待、失望、冲突——现在看起来不一样了。

它们不是灾难，是养分。每一关，都是灵魂在邀请你醒来。

门就在眼前。推开门，你会看到什么？`,
    choices: [
      {
        id: "fear",
        text: "我还是很害怕，万一以后再受伤怎么办？",
        isAwakened: false,
        feedback: `恐惧是正常的。觉醒不是不再恐惧，而是带着恐惧继续前行。

你不用变得完美才能推开那扇门。

门一直都在，只是你以前看不见。`,
        baseXP: 50
      },
      {
        id: "blame",
        text: "都是因为他不够好，才让我经历了这些。",
        isAwakened: false,
        feedback: `你还在外面找答案。

但他只是你觉醒路上的一个角色。真正的改变，发生在你愿意把目光转向自己的那一刻。

关系不是来满足你的，是来唤醒你的。`,
        baseXP: 80
      },
      {
        id: "awaken",
        text: "（推门）谢谢你，所有的痛苦。我愿意看见你们，也愿意看见我自己。",
        isAwakened: true,
        feedback: `你推开了门。

门后没有另一个人，只有你自己——那个曾经受伤、曾经期待、曾经失望、曾经愤怒的自己。

你抱住了她。

"谢谢你，一直等我。"

关系不是来满足你的期待，是来唤醒你看见自己。矛盾不再是灾难，而是养分。

🌟 +300 XP 完成"透过这段关系，我发现自己原来……"
🌟 +500 XP 在情绪升起时选择停下来观察而不是反应

🏆 总经验值解锁！
🎁 获得终极技能书——《此刻花开：从关系到觉醒的60天练习》
✨ 获得称号——"关系觉醒者"`,
        baseXP: 800
      }
    ],
    item: {
      icon: "🌱",
      name: "种子",
      description: "成长是每天多看见一点点"
    },
    healthBar: 4,
    baseXP: 800,
    xpBreakdown: [
      { condition: "完成'透过这段关系，我发现自己原来……'", xp: 300 },
      { condition: "在情绪升起时选择停下来观察而不是反应", xp: 500 }
    ],
    hiddenTask: {
      description: `把你前面所有隐藏任务的产物（信件、纸条、句子）放在一个盒子里。

对自己说：

"我欢迎所有曾让我痛苦的，因为它们是我觉醒的台阶。"

完成后额外获得 +500 XP`,
      rewardXP: 500,
      rewardItem: {
        from: "🌱",
        to: "🌼",
        description: "种子立刻发芽，获得最终道具'花开之证'"
      }
    },
    quote: "关系不是来满足我的，关系是来唤醒我的。"
  }
];

// 总经验值计算
export const TOTAL_BASE_XP = awakeningJourneyLevels.reduce((sum, level) => sum + level.baseXP, 0); // 2950
export const TOTAL_HIDDEN_XP = awakeningJourneyLevels.reduce((sum, level) => sum + level.hiddenTask.rewardXP, 0); // 1800
export const GRAND_TOTAL_XP = TOTAL_BASE_XP + TOTAL_HIDDEN_XP; // 4750

// 成长阶段
export const growthStages = [
  { minXP: 0, stage: "沉睡中", icon: "😴" },
  { minXP: 500, stage: "开始觉察", icon: "🌅" },
  { minXP: 1000, stage: "正在觉醒", icon: "🌱" },
  { minXP: 2000, stage: "深度觉察", icon: "🦋" },
  { minXP: 3000, stage: "关系觉醒者", icon: "🌸" },
  { minXP: 4000, stage: "花开时刻", icon: "🌺" }
];

// 最终奖励
export const finalRewards = {
  skillBook: "《此刻花开：从关系到觉醒的60天练习》",
  title: "关系觉醒者",
  mantra: "关系不是来满足我的，关系是来唤醒我的。"
};
