// 游戏关卡数据 - 基于《亲密关系是通往觉醒的门》讲义

export interface Choice {
  id: string;
  text: string;
  isAwakening: boolean; // 是否为觉醒视角的选择
  feedback: string; // 选择后的反馈文字
  growthPoint: number; // 成长值
}

export interface Level {
  id: number;
  title: string;
  scene: string; // 场景描述
  narrative: string; // 剧情文字
  choices: Choice[];
  awakeningInsight: string; // 觉醒洞察（通关后显示）
}

export const gameLevels: Level[] = [
  {
    id: 0,
    title: "序章：空空的客厅",
    scene: "黄昏",
    narrative:
      "你坐在沙发上，看着窗外的夕阳。房间里很安静，安静得让你有些不安。\n\n不知从什么时候开始，你总觉得内心有个空洞。你渴望有一个人能填满它，能让你感觉完整。\n\n你想起了一个人的名字...",
    choices: [
      {
        id: "a1",
        text: "要是他/她能多陪陪我就好了",
        isAwakening: false,
        feedback: "你期待着对方来填补你的空虚。这种感觉，你很熟悉。",
        growthPoint: 0,
      },
      {
        id: "a2",
        text: "我为什么总感觉不够完整？",
        isAwakening: true,
        feedback: "你开始向内看。这是觉醒的第一步。",
        growthPoint: 10,
      },
    ],
    awakeningInsight:
      "很多时候，我们以为自己在寻找爱，其实是在寻找自己。那个空洞，别人永远填不满。",
  },
  {
    id: 1,
    title: "第一关：期待的落空",
    scene: "周末午后",
    narrative:
      "今天是你们的纪念日。你期待了一整天——也许会有一束花，一顿特别的晚餐，至少...一句祝福。\n\n但直到夜晚降临，他/她只是像平常一样刷着手机，什么都没有说。\n\n你感到胸口一阵发紧...",
    choices: [
      {
        id: "b1",
        text: "\"你怎么什么都不准备？你知道今天是什么日子吗？！\"",
        isAwakening: false,
        feedback: "你的愤怒涌了上来。但愤怒背后，是什么呢？是委屈，是\"我不够重要\"的恐惧。",
        growthPoint: 0,
      },
      {
        id: "b2",
        text: "\"我为什么这么在意他/她有没有表示？\"",
        isAwakening: true,
        feedback: "你停下来，问自己这个问题。你发现，你在等一个证明——证明你值得被爱。",
        growthPoint: 10,
      },
      {
        id: "b3",
        text: "算了，就这样吧，反正他/她从来都不懂我",
        isAwakening: false,
        feedback: "你选择了回避。但那个没有被看见的期待，会在某一天再次浮现。",
        growthPoint: 0,
      },
    ],
    awakeningInsight:
      "期待的本质，是我们把自我价值交给了别人。当对方没有满足期待，我们感到的不仅是失望，而是\"我不够好\"。",
  },
  {
    id: 2,
    title: "第二关：冲突时刻",
    scene: "深夜",
    narrative:
      "吵架了。\n\n起因很小——他/她又忘了洗碗。但你们已经吵了一个小时。\n\n\"你从来不关心这个家！\"\n\"你总是挑我毛病！\"\n\n你们都在争。争什么？",
    choices: [
      {
        id: "c1",
        text: "继续争，让他/她认错，承认自己是对的",
        isAwakening: false,
        feedback: "你赢了这一轮。但关系里没有赢家，只有两个人一起输或一起赢。",
        growthPoint: 0,
      },
      {
        id: "c2",
        text: "停下来问自己：我为什么一定要证明他/她错了？",
        isAwakening: true,
        feedback: "你发现，你要的从来不是洗碗，而是\"被看见\"\"被尊重\"。冲突的背后，是一个未满足的需求。",
        growthPoint: 15,
      },
    ],
    awakeningInsight:
      "关系不是比赛。每一次争吵，其实都在问：你看见我了吗？你愿意理解我吗？但更深层的问题是：你愿意看见自己吗？",
  },
  {
    id: 3,
    title: "第三关：情绪的真相",
    scene: "清晨",
    narrative:
      "他/她随口说了一句话：\"你最近是不是胖了？\"\n\n只是一句话。陌生人说，你不会在意。但此刻，你感到一阵刺痛，甚至有些愤怒。\n\n三天过去了，那句话还在你心里打转。\n\n为什么会这样？",
    choices: [
      {
        id: "d1",
        text: "\"他/她怎么能这么说我！太伤人了！\"",
        isAwakening: false,
        feedback: "你把注意力放在对方的错上。但你心里知道，这句话之所以刺痛你，是因为它触到了更深的伤口。",
        growthPoint: 0,
      },
      {
        id: "d2",
        text: "这句话触碰了我什么？我为什么这么在意？",
        isAwakening: true,
        feedback: "你闭上眼睛，向内看。你发现，那句\"胖了\"触动了你内心深处的\"我不够好\"。那不是他/她给你的，而是你早就有的伤口。",
        growthPoint: 15,
      },
    ],
    awakeningInsight:
      "越亲近的人，越容易让我们崩溃。因为关系触碰的是伤口。每一次情绪爆发，都在提醒：这里有东西需要被看见。",
  },
  {
    id: 4,
    title: "第四关：发现自我",
    scene: "一个普通的夜晚",
    narrative:
      "你开始明白了一些事情。\n\n以前，你总在问：他/她爱我吗？他/她会变吗？为什么他/她不能...？\n\n现在，问题开始不一样了。",
    choices: [
      {
        id: "e1",
        text: "\"我该怎么改变他/她？\"",
        isAwakening: false,
        feedback: "旧模式又来了。你把目光投向对方，期待对方改变来满足你。",
        growthPoint: 0,
      },
      {
        id: "e2",
        text: "\"我是谁？我在关系里想要什么？我的边界在哪里？\"",
        isAwakening: true,
        feedback: "你开始认识自己的需求、边界和价值。当你越来越认识自己，你就不会再那么害怕失去。",
        growthPoint: 20,
      },
    ],
    awakeningInsight:
      "从\"谁爱我\"到\"我是谁\"——这是关系成长最重要的一步。当你完整了，关系就不再是填补，而是分享。",
  },
  {
    id: 5,
    title: "终章：花开时刻",
    scene: "此刻",
    narrative:
      "你走过了期待、失望、冲突、觉察。\n\n现在，你站在这里。\n\n你开始明白——关系不是来满足你的，关系是来唤醒你的。\n\n每一次痛苦，都是包装丑陋的礼物。\n\n你准备好打开它了吗？",
    choices: [
      {
        id: "f1",
        text: "是的，我愿意看见自己，接纳自己，成长自己",
        isAwakening: true,
        feedback: "欢迎来到《此刻花开》。\n\n爱自己会流动。\n成长自己会发生。\n生命自己会回应。\n\n未来60天，我们一起慢慢花开。",
        growthPoint: 30,
      },
    ],
    awakeningInsight:
      "很多人来到关系里，是为了寻找爱。而此刻的你，透过关系，找到了自己。这就是觉醒。",
  },
];

// 成长阶段名称
export const growthStages = [
  { min: 0, title: "初入旅程", description: "你刚刚开始这段觉察之旅" },
  { min: 20, title: "初见曙光", description: "你开始看见一些东西" },
  { min: 40, title: "觉醒萌芽", description: "觉察的种子在心中发芽" },
  { min: 60, title: "内在成长", description: "你正在成为更完整的自己" },
  { min: 80, title: "花开时刻", description: "你已准备好迎接全新的自己" },
];

// 计算成长阶段
export function getGrowthStage(points: number) {
  const stages = [...growthStages].reverse();
  return stages.find((stage) => points >= stage.min) || growthStages[0];
}
