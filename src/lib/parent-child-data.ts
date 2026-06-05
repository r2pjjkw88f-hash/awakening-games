// 亲子观察游戏数据
// 基于观察孩子练习卡设计

export interface ParentChildChoice {
  id: string;
  text: string;
  isAwakening: boolean;
  points: number;
  feedback: string;
  insight?: string; // 觉察金句
  parentReaction?: string; // 父母可能的反应
}

export interface ParentChildScene {
  id: string;
  title: string;
  subtitle: string;
  scenario: string;
  observationPrompt: string; // 观察提示
  choices: ParentChildChoice[];
  sceneImage?: string;
  emotion?: 'calm' | 'tense' | 'warm' | 'reflect';
}

export interface ParentChildLevel {
  id: number;
  title: string;
  theme: string; // 观察维度主题
  themeIcon: string;
  description: string;
  scenes: ParentChildScene[];
  summary: string; // 关卡总结
}

// 使用用户提供的场景图
const SCENE_IMAGES = {
  cover: '/assets/封面.png',
  littlePrince: '/assets/小王子版.png',
  innerPage: '/assets/内页.png',
  meditation: '/assets/冥想画面.png',
  starry: '/assets/星空版.png',
};

// 亲子观察游戏关卡数据
export const parentChildLevels: ParentChildLevel[] = [
  {
    id: 0,
    title: '序章：重新认识孩子',
    theme: '观察，是爱的第一步',
    themeIcon: '👁️',
    description: '每天10分钟，不教育、不纠正、不讲道理，只是观察',
    scenes: [
      {
        id: 'intro-1',
        title: '观察的开始',
        subtitle: '这10分钟，只属于你和孩子',
        scenario: '想象此刻，你正看着你的孩子。也许TA正在玩耍，也许TA正在写作业，也许TA只是静静坐在那里。',
        observationPrompt: '在这一刻，先不要去想"TA应该做什么"，只是看看：此时此刻的TA，是什么样子的？',
        sceneImage: SCENE_IMAGES.littlePrince,
        emotion: 'calm',
        choices: [
          {
            id: 'a',
            text: '我发现自己总是在想"TA该去写作业了"',
            isAwakening: false,
            points: 0,
            feedback: '很正常的想法。我们习惯了用"应该"来衡量孩子。但这一刻，试着把"应该"先放一放。',
            parentReaction: '焦虑、着急'
          },
          {
            id: 'b',
            text: '我注意到TA的表情很认真，嘴角微微上扬',
            isAwakening: true,
            points: 20,
            feedback: '你已经在观察了。看见TA此刻的状态，而不是TA"应该"的状态，这就是觉察的开始。',
            insight: '观察，是用眼睛去看见，而不是用标准去衡量。',
            parentReaction: '好奇、平静'
          },
          {
            id: 'c',
            text: '我感觉有点累，只想让TA快点完成任务',
            isAwakening: false,
            points: 5,
            feedback: '诚实很重要。觉察自己的疲惫，也是观察的一部分。但这一刻，先让我们回到孩子身上。',
            parentReaction: '疲惫、不耐烦'
          }
        ]
      },
      {
        id: 'intro-2',
        title: '观察的心态',
        subtitle: '不评判，只是看见',
        scenario: '你决定用10分钟来观察孩子。在这10分钟里，你告诉自己：不教育、不纠正、不讲道理。',
        observationPrompt: '当你看着孩子的时候，你发现自己的内心是怎样的？',
        sceneImage: SCENE_IMAGES.meditation,
        emotion: 'reflect',
        choices: [
          {
            id: 'a',
            text: '我发现自己会忍不住想要纠正TA',
            isAwakening: true,
            points: 20,
            feedback: '觉察到这一点，已经很了不起了。我们习惯了"教导者"的角色，放下它需要练习。',
            insight: '看见自己想纠正的冲动，本身就是觉察的开始。'
          },
          {
            id: 'b',
            text: '我发现自己在想"TA这样做对不对"',
            isAwakening: false,
            points: 10,
            feedback: '用"对错"来评判，是我们最习惯的方式。但观察，是不带评判的看见。',
            parentReaction: '控制、评判'
          },
          {
            id: 'c',
            text: '我开始好奇：TA为什么这样做？',
            isAwakening: true,
            points: 25,
            feedback: '好奇，是观察最好的姿态。当好奇心升起，评判就会放下。',
            insight: '用好奇代替评判，用看见代替纠正。这是给孩子最好的礼物。',
            parentReaction: '好奇、开放'
          }
        ]
      }
    ],
    summary: '真正的观察，是不带目的的看见。不为了改变TA，只是为了了解TA。'
  },
  {
    id: 1,
    title: '第一关：情绪的秘密',
    theme: '💗 情绪状态',
    themeIcon: '💗',
    description: '孩子的情绪，是TA内心世界的窗口',
    scenes: [
      {
        id: 'emotion-1',
        title: '情绪的起伏',
        subtitle: 'TA今天的心情如何？',
        scenario: '今天孩子从学校回来，你发现TA比平时安静。你问"今天怎么样"，TA只是淡淡地说"还行"。',
        observationPrompt: '你注意到TA的什么？',
        sceneImage: SCENE_IMAGES.innerPage,
        emotion: 'calm',
        choices: [
          {
            id: 'a',
            text: '我感觉TA在敷衍我，想追问到底发生了什么',
            isAwakening: false,
            points: 5,
            feedback: '着急了解是关心，但此刻TA可能需要空间。有时候，陪伴比追问更有力量。',
            parentReaction: '焦虑、着急'
          },
          {
            id: 'b',
            text: '我注意到TA的眼神有些躲闪，似乎有心事',
            isAwakening: true,
            points: 25,
            feedback: '你看见了TA的非语言表达。眼神、表情、肢体，往往比语言更真实。',
            insight: '情绪不需要被解决，只需要被看见。'
          },
          {
            id: 'c',
            text: '我想TA可能累了，给TA一些安静的时间',
            isAwakening: true,
            points: 20,
            feedback: '给TA空间，也是陪伴的方式。你的观察让TA感到被尊重，而不是被审问。',
            insight: '有时候，"我在这里"比"告诉我发生了什么"更有力量。',
            parentReaction: '平静、理解'
          }
        ]
      },
      {
        id: 'emotion-2',
        title: '情绪的表达',
        subtitle: '什么时候最开心？什么时候容易低落？',
        scenario: '周末，孩子在画画。你发现TA画得很专注，嘴角带着笑。但当你走近想看看画什么，TA突然把画纸翻过去。',
        observationPrompt: '你观察到什么？你内心有什么感受？',
        sceneImage: SCENE_IMAGES.littlePrince,
        emotion: 'tense',
        choices: [
          {
            id: 'a',
            text: '我觉得TA在藏什么，一定要看看',
            isAwakening: false,
            points: 0,
            feedback: '保护孩子的"秘密花园"，是信任的基石。TA的防御，也许在说："我需要自己的空间。"',
            parentReaction: '控制、不安'
          },
          {
            id: 'b',
            text: '我注意到TA刚才很开心，但在我靠近时变得紧张',
            isAwakening: true,
            points: 25,
            feedback: '你观察到了情绪的变化！从开心到紧张，这个转变很值得注意——也许TA担心被评判。',
            insight: '孩子的不安全感，往往来自害怕被评判。'
          },
          {
            id: 'c',
            text: '我退后一步，说"你画得很认真"，给TA空间',
            isAwakening: true,
            points: 30,
            feedback: '你保护了TA的安全感。不侵入，但表达看见。这样的观察，让TA感到被爱，而不是被监视。',
            insight: '看见而不评判，关注而不侵入——这是观察的艺术。',
            parentReaction: '尊重、信任'
          }
        ]
      }
    ],
    summary: '情绪是孩子内心的语言。当TA的开心被看见、低落被接纳，TA会感到：我是被理解的。'
  },
  {
    id: 2,
    title: '第二关：眼神与表情',
    theme: '👁️ 眼神与表情',
    themeIcon: '👁️',
    description: '眼神和表情，是孩子最真实的语言',
    scenes: [
      {
        id: 'eye-1',
        title: '眼神的秘密',
        subtitle: 'TA的眼神里藏着什么？',
        scenario: '孩子想跟你说一件事，但开口前看了你一眼，又低下头，说"算了，没什么"。',
        observationPrompt: '你看到了TA眼神里的什么？',
        sceneImage: SCENE_IMAGES.meditation,
        emotion: 'reflect',
        choices: [
          {
            id: 'a',
            text: '我感觉TA在无理取闹，有话就直说',
            isAwakening: false,
            points: 0,
            feedback: '当我们急着回应时，可能错过了TA眼神里的期待、犹豫或不安。',
            parentReaction: '不耐烦、控制'
          },
          {
            id: 'b',
            text: '我注意到TA眼神里有犹豫，好像在担心什么',
            isAwakening: true,
            points: 25,
            feedback: '你看见了眼神背后的情绪！犹豫往往意味着：我想说，但我不确定你会怎么回应。',
            insight: '孩子的眼神，是TA内心的试探：我可以信任你吗？'
          },
          {
            id: 'c',
            text: '我放下手上的事，轻轻问"你想说什么？我在听"',
            isAwakening: true,
            points: 30,
            feedback: '你用行动告诉TA：你的话对我来说很重要。这样，TA会越来越愿意打开自己。',
            insight: '真正的倾听，是从眼神开始的。',
            parentReaction: '耐心、关注'
          }
        ]
      },
      {
        id: 'eye-2',
        title: '表情的变化',
        subtitle: '表情背后在表达什么？',
        scenario: '吃饭时，孩子突然皱起眉头，咬着嘴唇，但没有说话。',
        observationPrompt: '你看到TA的表情，你内心想什么？',
        sceneImage: SCENE_IMAGES.innerPage,
        emotion: 'calm',
        choices: [
          {
            id: 'a',
            text: '肯定是饭菜不合胃口，下次要注意',
            isAwakening: false,
            points: 5,
            feedback: '也许是这样，但也许有其他原因。表情的背后，可能有更丰富的故事。',
            parentReaction: '猜测、解决问题'
          },
          {
            id: 'b',
            text: '我注意到TA的表情有些难受，可能有心事',
            isAwakening: true,
            points: 20,
            feedback: '你看见了表情，而不是急着解读。这样的观察，让你更靠近TA的真实感受。',
            insight: '表情是信号，但我们不必急着给答案。'
          },
          {
            id: 'c',
            text: '我轻轻问"你还好吗？"，等TA自己说',
            isAwakening: true,
            points: 30,
            feedback: '温和的询问，给TA表达的空间。不是追问，而是邀请。孩子需要知道：你在，但你不会逼我。',
            insight: '观察之后的邀请，比猜测和评判更有力量。',
            parentReaction: '温柔、耐心'
          }
        ]
      }
    ],
    summary: '孩子的眼神和表情，是TA内心世界最真实的表达。当我们学会阅读它们，我们才真正开始"看见"孩子。'
  },
  {
    id: 3,
    title: '第三关：表达方式',
    theme: '💬 表达方式',
    themeIcon: '💬',
    description: '孩子用TA的方式，告诉我们TA需要什么',
    scenes: [
      {
        id: 'express-1',
        title: '语言之外的表达',
        subtitle: 'TA如何表达自己？',
        scenario: '孩子从学校回来，把书包重重地放在地上，一声不吭地走进房间。',
        observationPrompt: 'TA在用动作告诉你什么？',
        sceneImage: SCENE_IMAGES.meditation,
        emotion: 'tense',
        choices: [
          {
            id: 'a',
            text: '太没礼貌了，我要去批评TA',
            isAwakening: false,
            points: 0,
            feedback: '我们容易看到行为，忽略背后的情绪。但每一个"问题行为"，可能都是一次求助。',
            parentReaction: '生气、控制'
          },
          {
            id: 'b',
            text: '我注意到TA的动作有情绪，也许今天发生了什么',
            isAwakening: true,
            points: 25,
            feedback: '你看见了行为背后的情绪。沉重的书包、沉默的背影，都在诉说：我今天不好过。',
            insight: '行为是冰山一角，情绪是藏在水面下的部分。'
          },
          {
            id: 'c',
            text: '我先给TA空间，等TA愿意说的时候再听',
            isAwakening: true,
            points: 30,
            feedback: '你尊重了TA的边界，也传达了"我在"的信息。这样的陪伴，比追问更让TA安心。',
            insight: '有时候，给孩子空间，是最好的回应。',
            parentReaction: '平静、耐心'
          }
        ]
      },
      {
        id: 'express-2',
        title: '情绪的表达',
        subtitle: '当TA用情绪说话',
        scenario: '孩子在看电视，你让TA去洗澡，TA突然大声说"你总是这样！"然后跑进房间关上门。',
        observationPrompt: 'TA在用情绪告诉你什么？',
        sceneImage: SCENE_IMAGES.starry,
        emotion: 'tense',
        choices: [
          {
            id: 'a',
            text: '太不尊重了，我要去管教TA',
            isAwakening: false,
            points: 0,
            feedback: '被顶撞的感觉确实不好受。但此刻，TA的情绪在说：我有话想让你听见。',
            parentReaction: '生气、控制'
          },
          {
            id: 'b',
            text: '我注意到"你总是这样"——也许我确实太常打断TA了',
            isAwakening: true,
            points: 25,
            feedback: '你听见了情绪背后的信息。孩子的爆发，有时是在说：我的感受被忽略了。',
            insight: '当孩子说"你总是"，TA可能是在说：我希望被看见。'
          },
          {
            id: 'c',
            text: '我先冷静下来，等会儿轻轻敲门问TA怎么了',
            isAwakening: true,
            points: 30,
            feedback: '你没有被情绪卷进去，而是选择先平复自己。这让孩子知道：情绪是可以被处理的，不是要被压制的。',
            insight: '父母的情绪稳定，是孩子最好的安全感来源。',
            parentReaction: '冷静、理解'
          }
        ]
      }
    ],
    summary: '孩子的表达，不一定通过语言。动作、情绪、行为，都是TA在说："我希望你看见我。"'
  },
  {
    id: 4,
    title: '第四关：寻找存在感',
    theme: '🌱 寻找存在感的方式',
    themeIcon: '🌱',
    description: '每个孩子都在用自己的方式说：请看见我',
    scenes: [
      {
        id: 'presence-1',
        title: '乖巧的孩子',
        subtitle: 'TA在用"乖"换取关注吗？',
        scenario: '孩子总是很乖，从不惹麻烦，成绩也很好。但最近你发现，TA好像不太表达自己的需求，总说"没关系"。',
        observationPrompt: 'TA的"乖"在告诉你什么？',
        sceneImage: SCENE_IMAGES.littlePrince,
        emotion: 'reflect',
        choices: [
          {
            id: 'a',
            text: '这么乖的孩子，有什么好担心的',
            isAwakening: false,
            points: 5,
            feedback: '乖巧确实是好事，但如果"乖"是TA隐藏真实感受的方式，我们可能需要多看一眼。',
            parentReaction: '安心、忽略'
          },
          {
            id: 'b',
            text: '我注意到TA好像不太敢表达自己的需求',
            isAwakening: true,
            points: 25,
            feedback: '你看见了一个重要信号。有些孩子用"乖"来获得爱，但内心可能在说：我不确定真实的我是被爱的。',
            insight: '太乖的孩子，可能在用压抑换取安全。'
          },
          {
            id: 'c',
            text: '我试着鼓励TA说出自己的想法，告诉TA"你的想法很重要"',
            isAwakening: true,
            points: 30,
            feedback: '你在帮TA建立安全表达的空间。当TA知道"不乖也可以被爱"，TA才能真正成为自己。',
            insight: '真正的乖，应该是发自内心的合作，而不是恐惧的顺从。',
            parentReaction: '觉察、支持'
          }
        ]
      },
      {
        id: 'presence-2',
        title: '捣蛋的孩子',
        subtitle: 'TA在用"问题行为"呼唤你吗？',
        scenario: '孩子最近总爱在你忙的时候捣乱，打翻东西、大声喊叫。你越批评，TA闹得越厉害。',
        observationPrompt: 'TA的行为在说什么？',
        sceneImage: SCENE_IMAGES.innerPage,
        emotion: 'tense',
        choices: [
          {
            id: 'a',
            text: '这孩子太不听话了，要好好管教',
            isAwakening: false,
            points: 0,
            feedback: '管教可能暂时有效，但行为背后的需求没有得到回应，TA可能会用更大的"问题"来呼唤你。',
            parentReaction: '愤怒、控制'
          },
          {
            id: 'b',
            text: '我注意到TA总在我忙的时候捣乱，也许TA想要我的关注',
            isAwakening: true,
            points: 25,
            feedback: '你看见行为背后的需求！孩子的问题行为，常常是在说："请看看我，我在这里。"',
            insight: '捣蛋，是孩子说"我在"的方式之一。'
          },
          {
            id: 'c',
            text: '我先停下来，蹲下来问TA："你是不是想让我陪你？"',
            isAwakening: true,
            points: 30,
            feedback: '你直接回应了TA真正的需求。当TA发现"我可以直接说出来"，就不需要用捣乱来呼唤你了。',
            insight: '看见孩子捣乱背后的需求，比制止捣乱更重要。',
            parentReaction: '理解、耐心'
          }
        ]
      },
      {
        id: 'presence-3',
        title: '退缩的孩子',
        subtitle: 'TA在用沉默保护自己吗？',
        scenario: '孩子在人群中总是躲在你身后，不敢说话。亲戚朋友问话，TA也只是低着头。',
        observationPrompt: 'TA的退缩在告诉你什么？',
        sceneImage: SCENE_IMAGES.starry,
        emotion: 'calm',
        choices: [
          {
            id: 'a',
            text: '太胆小了，要逼TA多锻炼',
            isAwakening: false,
            points: 0,
            feedback: '逼迫可能让TA更害怕。退缩的背后，可能是：我害怕被评判，我需要更多安全感。',
            parentReaction: '焦虑、控制'
          },
          {
            id: 'b',
            text: '我注意到TA在陌生环境里很紧张，需要更多安全感',
            isAwakening: true,
            points: 25,
            feedback: '你理解了TA的感受。每个孩子的气质不同，给TA安全感和时间，比逼迫更有效。',
            insight: '退缩的孩子，需要的是安全感，不是强迫。'
          },
          {
            id: 'c',
            text: '我轻轻握住TA的手，告诉TA"没关系，我们可以慢慢来"',
            isAwakening: true,
            points: 30,
            feedback: '你给了TA最需要的：我在你身边，你可以按照自己的节奏来。这样的安全感，会让TA慢慢打开。',
            insight: '孩子的安全感，来自父母的无条件接纳。',
            parentReaction: '支持、理解'
          }
        ]
      }
    ],
    summary: '乖巧、捣蛋、退缩，都是孩子说"请看见我"的方式。当我们回应TA们的需求，TA们就不再需要用"问题行为"来呼唤我们。'
  },
  {
    id: 5,
    title: '终章：觉察自己',
    theme: '👤 同时也观察自己',
    themeIcon: '👤',
    description: '当孩子出现情绪时，我的身体和内心发生着什么？',
    scenes: [
      {
        id: 'self-1',
        title: '情绪的触发',
        subtitle: '孩子的情绪，触发了我的什么？',
        scenario: '孩子因为一件小事大哭，你已经安抚了很多次，但TA还是停不下来。你发现自己的胸口开始发闷，呼吸变急。',
        observationPrompt: '你注意到自己的什么？',
        sceneImage: SCENE_IMAGES.meditation,
        emotion: 'tense',
        choices: [
          {
            id: 'a',
            text: '我太生气了，想让TA立刻停止哭闹',
            isAwakening: false,
            points: 5,
            feedback: '生气是正常的。但此刻觉察到自己的情绪，你可以选择先深呼吸，而不是立刻反应。',
            parentReaction: '生气、控制',
            insight: '觉察自己的情绪，是情绪管理的第一步。'
          },
          {
            id: 'b',
            text: '我注意到自己很无助，好像怎么做都没用',
            isAwakening: true,
            points: 25,
            feedback: '你看见了真实的自己。无助感很正常，它提醒你：我也需要支持。承认这一点，不丢人。',
            insight: '看见自己的无助，是给自己慈悲的第一步。'
          },
          {
            id: 'c',
            text: '我意识到孩子的哭闹触发了我小时候被忽视的记忆',
            isAwakening: true,
            points: 30,
            feedback: '这是很深的觉察。孩子的情绪有时会触发我们自己的旧伤。看见这个连接，是疗愈的开始。',
            insight: '孩子的情绪，有时是父母的照妖镜——照出我们自己未被疗愈的部分。',
            parentReaction: '觉察、反思'
          }
        ]
      },
      {
        id: 'self-2',
        title: '控制与放手',
        subtitle: '我想控制，还是想连接？',
        scenario: '孩子在做一个选择，你心里觉得"不对"，但那是TA自己的事。',
        observationPrompt: '你内心有什么感受？你选择怎样回应？',
        sceneImage: SCENE_IMAGES.starry,
        emotion: 'reflect',
        choices: [
          {
            id: 'a',
            text: '我要让TA听我的，因为我是为TA好',
            isAwakening: false,
            points: 5,
            feedback: '我们都想保护孩子。但有时候，"为你好"可能变成"你必须听我的"。孩子需要学习自己做选择。',
            parentReaction: '控制、焦虑'
          },
          {
            id: 'b',
            text: '我有点担心，但我决定让TA自己试试',
            isAwakening: true,
            points: 25,
            feedback: '放手不容易，但你选择了信任。当孩子自己经历、自己学习，成长才会发生。',
            insight: '父母的功课：学会在担心中放手，在放手后支持。'
          },
          {
            id: 'c',
            text: '我和TA讨论这个选择，但最终让TA自己决定',
            isAwakening: true,
            points: 30,
            feedback: '你提供了引导，但保留了空间。这样的方式，让孩子学习思考，也感受到被尊重。',
            insight: '最好的教育，不是告诉孩子答案，而是陪TA一起思考。',
            parentReaction: '信任、尊重'
          }
        ]
      },
      {
        id: 'self-3',
        title: '觉察报告',
        subtitle: '你发现了什么？',
        scenario: '通过这次观察练习，你对自己有了新的认识。',
        observationPrompt: '回顾整个旅程，你最大的觉察是什么？',
        sceneImage: SCENE_IMAGES.starry,
        emotion: 'warm',
        choices: [
          {
            id: 'a',
            text: '我发现自己总是急于解决问题，很少真正观察',
            isAwakening: true,
            points: 25,
            feedback: '觉察到这一点，就是改变的开始。慢下来，看一看，你会发现很多被忽略的美好。',
            insight: '看见孩子之前，先看见自己。'
          },
          {
            id: 'b',
            text: '我发现自己容易焦虑，想控制孩子',
            isAwakening: true,
            points: 25,
            feedback: '很多父母都有这样的倾向。觉察它，不是要自责，而是给自己一个选择的机会。',
            insight: '控制背后，往往是我们自己的恐惧。'
          },
          {
            id: 'c',
            text: '我学会了慢下来，用好奇心代替评判',
            isAwakening: true,
            points: 30,
            feedback: '这是观察的核心心态。当好奇心取代评判，你会发现：孩子比你想象的更有深度、更有智慧。',
            insight: '好奇是最好的观察姿态，看见是最好的爱。',
            parentReaction: '觉察、成长'
          }
        ]
      }
    ],
    summary: '观察孩子的过程，也是观察自己的过程。当我们看见自己，才能更好地看见孩子。'
  }
];

// 觉察洞察金句库
export const parentChildInsights = [
  '观察，是用眼睛去看见，而不是用标准去衡量。',
  '孩子的眼神，是TA内心的试探：我可以信任你吗？',
  '真正的倾听，是从眼神开始的。',
  '情绪不需要被解决，只需要被看见。',
  '有时候，"我在这里"比"告诉我发生了什么"更有力量。',
  '行为是冰山一角，情绪是藏在水面下的部分。',
  '看见孩子捣乱背后的需求，比制止捣乱更重要。',
  '孩子的安全感，来自父母的无条件接纳。',
  '看见自己想纠正的冲动，本身就是觉察的开始。',
  '每一个被看见的孩子，都会更有力量地长大。',
  '父母的情绪稳定，是孩子最好的安全感来源。',
  '真正的成长，永远从觉察开始。',
  '不急着改变，只是慢慢看见。',
  '看见，就是最好的爱。'
];

// 练习建议
export const parentChildPracticeSuggestions = [
  {
    title: '每日10分钟观察',
    description: '选择一个固定的时间，只是观察孩子，不教育、不纠正、不讲道理',
    duration: '10分钟/天'
  },
  {
    title: '情绪记录',
    description: '每天记录孩子的情绪变化：什么时候开心？什么时候容易低落？',
    duration: '5分钟/天'
  },
  {
    title: '眼神练习',
    description: '和孩子对视时，放慢节奏，让TA感受到你在用心看TA',
    duration: '随时随地'
  },
  {
    title: '倾听练习',
    description: '当孩子说话时，放下手机，停下来，用眼神告诉TA"我在听"',
    duration: '每次对话时'
  },
  {
    title: '自我觉察',
    description: '当孩子出现情绪时，先问自己：我现在的感受是什么？',
    duration: '每次情绪触发时'
  }
];

// 父母反应类型
export const parentReactionTypes = [
  {
    type: '焦虑',
    emoji: '🌀',
    description: '担心孩子做得不够好，想快速解决问题'
  },
  {
    type: '着急',
    emoji: '❗',
    description: '没有耐心等待，想立刻看到结果'
  },
  {
    type: '控制',
    emoji: '🔒',
    description: '想要孩子按自己的方式做事'
  },
  {
    type: '不耐烦',
    emoji: '😤',
    description: '被孩子的情绪或行为触发，想要逃离或压制'
  },
  {
    type: '想立刻解决问题',
    emoji: '⚡',
    description: '急于给出方案，没有先理解孩子的感受'
  },
  {
    type: '好奇',
    emoji: '🔍',
    description: '对孩子保持好奇心，想要了解更多'
  },
  {
    type: '平静',
    emoji: '🌊',
    description: '能够稳住自己的情绪，不急于反应'
  },
  {
    type: '理解',
    emoji: '💜',
    description: '站在孩子的角度，感受TA的感受'
  },
  {
    type: '信任',
    emoji: '🤝',
    description: '相信孩子有能力处理，给TA空间'
  }
];

// 生成个性化觉察报告
export function generateParentChildReport(
  choices: Array<{ levelId: number; sceneId: string; choiceId: string; choice: ParentChildChoice }>,
  totalPoints: number
) {
  const maxPoints = 180;
  const percentage = Math.round((totalPoints / maxPoints) * 100);
  
  // 分析父母反应模式
  const reactionCounts: Record<string, number> = {};
  choices.forEach(c => {
    if (c.choice.parentReaction) {
      reactionCounts[c.choice.parentReaction] = (reactionCounts[c.choice.parentReaction] || 0) + 1;
    }
  });
  
  // 找出最常见的反应
  const topReactions = Object.entries(reactionCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([reaction]) => reaction);
  
  // 收集触发的洞察
  const collectedInsights = choices
    .filter(c => c.choice.insight)
    .map(c => c.choice.insight!);
  
  // 根据分数选择练习建议
  const suggestions = parentChildPracticeSuggestions.slice(
    0,
    percentage >= 70 ? 5 : percentage >= 50 ? 3 : 2
  );
  
  return {
    percentage,
    topReactions,
    collectedInsights,
    suggestions,
    growthMessage: percentage >= 80
      ? '你已经具备了很好的观察能力！继续保持这份觉察，你会发现亲子关系越来越亲密。'
      : percentage >= 60
      ? '你正在学习观察孩子和自己，这是非常重要的成长。持续练习，你会发现越来越多的美好。'
      : percentage >= 40
      ? '觉察的大门已经打开。每一次看见，都是爱的开始。给自己时间，慢慢来。'
      : '你愿意开始观察，这已经是爱的第一步。不要着急，观察是需要练习的能力。'
  };
}
