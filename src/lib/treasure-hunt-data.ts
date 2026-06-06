// 生命寻宝 - 寻找自己，认出自己

export interface TreasureCard {
  id: string;
  fragment: string; // 隐藏卡片碎片文字
}

export interface TreasureLevel {
  id: number;
  stage: string;
  title: string;
  subtitle?: string;
  story: string;
  instruction: string;
  inputPlaceholder?: string;
  inputCount?: number; // 需要输入几项
  choices?: { id: string; text: string; insight: string }[];
  revealStory?: string;
  gemName: string;
  gemIcon: string;
  gemInsight: string;
}

export const hiddenCardFragments: TreasureCard[] = [
  { id: "card-1", fragment: "你不是" },
  { id: "card-2", fragment: "来寻找自己的。" },
  { id: "card-3", fragment: "你是来" },
  { id: "card-4", fragment: "认出自己的。" },
  { id: "card-5", fragment: "🌸" }
];

// 抽卡内容 - 第三关使用
export const fearCards = [
  {
    id: "fear-1",
    content: "我最害怕别人知道：我其实很脆弱",
    insight: "承认脆弱，是真正勇敢的开始。"
  },
  {
    id: "fear-2",
    content: "我最害怕别人知道：我经常感到自卑",
    insight: "自卑只是忘记了，你本来的样子就很美。"
  },
  {
    id: "fear-3",
    content: "我最害怕别人知道：我害怕被拒绝",
    insight: "被拒绝不可怕，可怕的是因为害怕而从未尝试。"
  },
  {
    id: "fear-4",
    content: "我最害怕别人知道：我有很多恐惧",
    insight: "恐惧是来保护你的，也是来让你成长的。"
  },
  {
    id: "fear-5",
    content: "我最害怕别人知道：我觉得自己不够好",
    insight: "你已经足够好了，只是你还没认出来。"
  },
  {
    id: "fear-6",
    content: "我最害怕别人知道：我害怕孤独",
    insight: "孤独不是因为没人陪伴，是因为忘了陪伴自己。"
  }
];

// 第四关 - 镜子宝藏的看见卡片
export const mirrorCards = [
  {
    id: "mirror-1",
    content: "我在你身上看见了善良",
    insight: "你的善良，是这世界最温柔的光。"
  },
  {
    id: "mirror-2",
    content: "我在你身上看见了坚强",
    insight: "你比自己想象的更勇敢。"
  },
  {
    id: "mirror-3",
    content: "我在你身上看见了温柔",
    insight: "温柔不是软弱，是内心强大的选择。"
  },
  {
    id: "mirror-4",
    content: "我在你身上看见了真诚",
    insight: "真诚是最动人的力量。"
  },
  {
    id: "mirror-5",
    content: "我在你身上看见了勇气",
    insight: "你一直在默默勇敢着。"
  },
  {
    id: "mirror-6",
    content: "我在你身上看见了光",
    insight: "你就是光，照亮了周围的人。"
  }
];

export const treasureLevels: TreasureLevel[] = [
  {
    id: 0,
    stage: "序章",
    title: "来自生命的信",
    story: `你是一名探险家。

收到了一封来自生命的信。

信里只有一句话：`,
    instruction: `「生命里藏着五个宝藏。

找到它们。

你会认出真正的自己。」`,
    gemName: "开始",
    gemIcon: "📜",
    gemInsight: ""
  },
  {
    id: 1,
    stage: "第一关",
    title: "失落的宝藏",
    subtitle: "遗憾里的礼物",
    story: `生命里，有些东西失去了。

有些遗憾，藏在心底很久。

今天，我们把它拿出来。`,
    instruction: "请写下生命里最遗憾的一件事：",
    inputPlaceholder: "写下你的遗憾...",
    revealStory: `写完了。

把它藏进心里。

然后问自己：

这个遗憾教会了你什么？`,
    gemName: "成长宝石",
    gemIcon: "💎",
    gemInsight: "每一个遗憾，都是成长的种子。它教会你珍惜，教会你选择，教会你成为今天的自己。"
  },
  {
    id: 2,
    stage: "第二关",
    title: "被遗忘的宝藏",
    subtitle: "欣赏自己",
    story: `很多人会夸别人。

但要夸自己，却很难。

为什么呢？`,
    instruction: "请写下你最欣赏自己的三个特质：",
    inputPlaceholder: "写下一个特质...",
    inputCount: 3,
    revealStory: `写完了吗？

如果卡住了，没关系。

这说明你太久没有好好看自己了。

为什么夸别人容易，夸自己困难？`,
    gemName: "价值宝石",
    gemIcon: "💎",
    gemInsight: "你的价值不需要别人来定义。你身上的每一个特质，都是独一无二的宝藏。"
  },
  {
    id: 3,
    stage: "第三关",
    title: "隐藏的宝藏",
    subtitle: "在阴影里找到光",
    story: `每个人心里，都有不想让人看见的部分。

脆弱、恐惧、自卑、羞耻...

但被隐藏的部分，往往也是力量所在。`,
    instruction: "抽一张卡片，看看它说什么：",
    choices: [
      { id: "draw", text: "抽取卡片", insight: "" }
    ],
    gemName: "勇气宝石",
    gemIcon: "💎",
    gemInsight: "承认自己的脆弱，是最大的勇气。那些你隐藏的部分，正是你最真实的力量。"
  },
  {
    id: 4,
    stage: "第四关",
    title: "镜子宝藏",
    subtitle: "被看见的时刻",
    story: `很多人第一次被真正看见。

会哭。

因为太久了，没有人这样看过自己。`,
    instruction: "想象有一个人看着你，对你说：",
    choices: [
      { id: "see", text: "我在你身上看见了...", insight: "" }
    ],
    gemName: "爱的宝石",
    gemIcon: "💎",
    gemInsight: "被看见，是灵魂的滋养。你值得被看见，被理解，被爱。"
  },
  {
    id: 5,
    stage: "第五关",
    title: "生命宝藏",
    subtitle: "最后的信",
    story: `最后一封信。

打开它。

里面写着：`,
    instruction: `你一路寻找的宝藏。

从来没有丢失。

你就是宝藏。`,
    gemName: "生命宝石",
    gemIcon: "🌸",
    gemInsight: "你一直在寻找自己。其实，你从未丢失。你不是来寻找自己的，你是来认出自己的。"
  }
];

export const finalMeditation = {
  title: "认出完整的自己",
  content: `闭上眼睛。

深呼吸。

想象你站在一面镜子前。

镜子里的人，经历了所有的遗憾，也收获了所有的成长。

镜子里的人，有那么多值得欣赏的特质。

镜子里的人，勇敢地面对了自己的脆弱和恐惧。

镜子里的人，被真正看见过、被爱过。

镜子里的人，就是你自己。

你从未丢失。

你一直在这里。

等待被认出。

...

现在，睁开眼睛。

你找到了。

你就是宝藏。`
};

export const gameQuote = "每一次寻找，都是在认出自己。";

export const TOTAL_GEMS = 5;
