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
  levelName: string;
  theme: string;
  emotion: string;
  sceneImage: string;
  scenario: string;
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
  healthBar: number;
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
    sceneImage: "https://coze-coding-project.tos.coze.site/coze_storage_7647773831091879942/image/generate_image_ac1b147c-2e25-4da2-adcb-7f65c0267d55.jpeg",
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
🌟 +200 XP 成功区分"事实"与"我认为"`,
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
      { condition: "成功区分【事实】与【我认为】", xp: 200 }
    ],
    hiddenTask: {
      description: `找一个你很看不惯伴侣的小习惯（比如牙膏从中间挤）。

连续三天，每次看到时不说任何话，只对自己说：这是我的一部分，我讨厌它。

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
    sceneImage: "https://coze-coding-project.tos.coze.site/coze_storage_7647773831091879942/image/generate_image_a984b8c6-e2d0-4f12-950b-f8dbaf60d2b6.jpeg",
    scenario: `今天是你们在一起三周年的日子。你期待了一整天——他会不会记得？会不会给你惊喜？

晚上，他回到家，像往常一样坐在沙发上刷手机，完全没有提起今天是什么日子。

你坐在旁边，心里的失望一点点堆积。

"他不爱我。" "如果他爱我，他应该记得。"

你想起以前，每次你记得他的生日、纪念日，他却总是忘记。你觉得委屈，又觉得自己不值得。`,
    choices: [
      {
        id: "demand",
        text: "你怎么可以这样？我对你那么好，你却连纪念日都不记得！",
        isAwakened: false,
        feedback: `你爆发了。但这场争吵，也许并不是因为今天这个日子。

"你应该记得"——这是你的期待，不是他的义务。

期待落空时，我们用愤怒掩盖失望，却忘了问问自己：这个期待是谁定的？`,
        baseXP: 50
      },
      {
        id: "pretend",
        text: "没事，其实我也不太在意这些……",
        isAwakened: false,
        feedback: `你选择了假装不在意。但心里那个小女孩，还是很在意。

假装不在意，是保护自己不受伤的方式。但假装久了，你也忘了自己真正想要什么。`,
        baseXP: 100
      },
      {
        id: "accept",
        text: "（觉察期待）我失望是因为我对他有期待，但期待是我自己的选择。",
        isAwakened: true,
        feedback: `你看见了自己的期待。它不是错的，只是你选择的。

"我期待他记得"——这是我的期待，不是他必须履行的契约。

当你放下期待，失望也跟着放下了。你仍然可以温柔地告诉他："今天是我们三周年，我希望你记得。"

🌟 +100 XP 写下5个期待
🌟 +300 XP 放下其中4个（允许自己保留1个作为【温柔请求】）`,
        baseXP: 400
      }
    ],
    item: {
      icon: "📜",
      name: "契约书",
      description: "我的幸福，不完全由对方履行。"
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
    sceneImage: "https://coze-coding-project.tos.coze.site/coze_storage_7647773831091879942/image/generate_image_07d35649-bff3-49b5-84a6-0ff3ff0546d6.jpeg",
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
🌟 +250 XP 失望后24小时内没有报复、冷战或攻击`,
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
      description: `在你最失望的那件事上，写一封永远不会寄出的信给对方，只写【我失望的是什么，我原本真正想要的是什么】。写完后烧掉或撕碎。`,
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
    sceneImage: "https://coze-coding-project.tos.coze.site/coze_storage_7647773831091879942/image/generate_image_2f802203-7def-4b45-ac39-ba7c5f2be910.jpeg",
    scenario: `你们又吵起来了。那些话，像机关枪一样扫射——

"你从来不考虑我的感受！"
"你总是只想着自己！"

他的声音越来越大，你的心越来越紧。那些话像箭一样射过来，每一下都戳在旧伤口上。

你想反击，想证明他错了，想让他闭嘴。但有一瞬间，你停住了——

"看看这个伤口，它在等你好久了。"`,
    choices: [
      {
        id: "win",
        text: "你说我不考虑你？那我问你，上次是谁——",
        isAwakened: false,
        feedback: `你选择了争输赢。但冲突不是战场，对方不是敌人。

冲突不是要打败对方，是要看见自己。当你把能量都用在证明【我对你错】时，就没有能量去真正倾听了。`,
        baseXP: 50
      },
      {
        id: "shut",
        text: "你爱怎么想怎么想，我不想说了。",
        isAwakened: false,
        feedback: `你选择了逃避。但逃避不会让冲突消失，只会让它发酵。

那些没说出口的话，变成了墙，挡住了彼此。`,
        baseXP: 80
      },
      {
        id: "pause",
        text: "（暂停）我现在很激动，能不能先停下来，我们各自冷静一下？",
        isAwakened: true,
        feedback: `你按下了暂停键。这是冲突中最勇敢的选择。

"我为什么这么激动？他说的哪句话戳到了我？"

你停下来，不是为了逃避，是为了看见。看见自己的伤口，看见他的痛，看见这场争吵背后的真相。

🌟 +150 XP 在冲突中成功暂停5秒
🌟 +350 XP 冲突后主动说出自己的感受`,
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
      description: `下一次冲突时，故意不争输赢，而是问对方：你希望我怎么理解你？即使对方不回答，你也算完成。`,
      rewardXP: 300,
      rewardItem: {
        from: "🛡️",
        to: "🛡️✨",
        description: "盾牌升级为【不破之盾】（不再因冲突而自我否定）"
      }
    },
    quote: "冲突是灵魂的信号灯——它亮起的时候，是在邀请你看见自己。"
  },
  {
    id: 5,
    levelName: "镜厅",
    theme: "从【谁爱我】转向【我是谁】",
    emotion: "觉察",
    sceneImage: "https://coze-coding-project.tos.coze.site/coze_storage_7647773831091879942/image/generate_image_5bd89f0e-30a1-4cc1-9742-6ab2f11d502b.jpeg",
    scenario: `深夜，你一个人坐着，手机屏幕的光照在脸上。

你刷着朋友圈，看到别人的甜蜜合照、旅行照片、幸福宣言。然后你想起自己的关系——那些争吵、那些失望、那些时刻。

一个问题反复出现：
"他爱不爱我？"
"这段关系有没有未来？"
"我是不是值得被爱？"

这些问题，像镜子一样照来照去，却始终看不清那个最重要的问题——

"那我呢？我是谁？"`,
    choices: [
      {
        id: "compare",
        text: "别人都那么幸福，我是不是哪里有问题？",
        isAwakened: false,
        feedback: `你选择了比较。但比较是一条没有尽头的路。

当你把注意力放在【别人】和【我】的比较上时，你就离自己越来越远了。`,
        baseXP: 30
      },
      {
        id: "seek",
        text: "我应该让他更爱我，这样我就有答案了。",
        isAwakened: false,
        feedback: `你选择了向外求。但【他爱我】就能证明【我值得被爱】吗？

别人的爱，永远无法填补你自己不敢爱自己的空白。`,
        baseXP: 80
      },
      {
        id: "mirror",
        text: "（照镜子）我不需要变得完美才值得被爱。我就是我。",
        isAwakened: true,
        feedback: `你看着镜子里的自己。那个不完美的、有缺口的、但真实的自己。

"我不需要变得更好才值得被爱。"

这不是自恋，是自我接纳。当你不再用【谁爱我】来定义自己时，你开始真正自由。

🌟 +200 XP 连续3天每天3次问自己感受
🌟 +400 XP 写出【我在关系中最常上演的旧故事】`,
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
      { condition: "写出【我在关系中最常上演的旧故事】", xp: 400 }
    ],
    hiddenTask: {
      description: `在镜子前看着自己的眼睛，说三遍：我不需要变得完美才值得被爱。如果有情绪涌出，允许它流出来。`,
      rewardXP: 400,
      rewardItem: {
        from: "🪞",
        to: "🪞🔮",
        description: "镜子升级为【真相之镜】（能照出情绪背后的童年根源）"
      }
    },
    quote: "当你不再用【谁爱我】来定义自己时，你才真正开始认识自己。"
  },
  {
    id: 6,
    levelName: "觉醒之门",
    theme: "矛盾不再是灾难，而是养分",
    emotion: "成长",
    sceneImage: "https://coze-coding-project.tos.coze.site/coze_storage_7647773831091879942/image/generate_image_497e2491-1f90-4f01-a101-e98e089d0f29.jpeg",
    scenario: `你站在觉醒的门前。

回头看，是那些争吵、失望、眼泪，是那些你曾经以为熬不过去的时刻。

但此刻，它们不再是伤疤，而是台阶。每一级，都带你更靠近真实的自己。

"原来，这些都不是来伤害我的。"

"它们是来唤醒我的。"

门就在眼前。你准备好推开了吗？`,
    choices: [
      {
        id: "fear",
        text: "我还是很害怕，万一以后再受伤怎么办？",
        isAwakened: false,
        feedback: `害怕是正常的。觉醒不是不再受伤，而是受伤后知道怎么照顾自己。

但如果你一直停留在害怕里，门就永远只是门。`,
        baseXP: 100
      },
      {
        id: "blame",
        text: "都是因为他不够好，才让我经历了这些。",
        isAwakened: false,
        feedback: `指责是最后的防御。当你把责任都推给别人，你也把自己的力量交出去了。

觉醒，是收回力量的旅程。`,
        baseXP: 50
      },
      {
        id: "awaken",
        text: "（推门）谢谢你，所有的痛苦。我愿意看见你们，也愿意看见我自己。",
        isAwakened: true,
        feedback: `门开了。

光涌入的瞬间，你看见了——那个曾经被忽视的小女孩，那个曾经失望的自己，那个一直在等你的灵魂。

"谢谢你，一直等我。"

这一刻，不是结束，是新的开始。你不再期待关系来满足你，你开始允许关系来唤醒你。

🌟 +300 XP 完成【透过这段关系，我发现自己原来……】
🌟 +500 XP 在情绪升起时选择停下来观察而不是反应
✨ 获得称号——【关系觉醒者】`,
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
      { condition: "完成【透过这段关系，我发现自己原来……】", xp: 300 },
      { condition: "在情绪升起时选择停下来观察而不是反应", xp: 500 }
    ],
    hiddenTask: {
      description: `把你前面所有隐藏任务的产物（信件、纸条、句子）放在一个盒子里，对自己说：我欢迎所有曾让我痛苦的，因为它们是我觉醒的台阶。`,
      rewardXP: 500,
      rewardItem: {
        from: "🌱",
        to: "🌼",
        description: "种子立刻发芽，获得最终道具【花开之证】"
      }
    },
    quote: "关系不是来满足我的，关系是来唤醒我的。"
  }
];

// 经验值上限
export const TOTAL_BASE_XP = 2950;
export const TOTAL_HIDDEN_XP = 1800;
export const GRAND_TOTAL_XP = 4750;

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
