# 项目上下文

## 项目简介

**此刻花开：觉醒之旅** - 一款基于《亲密关系是通往觉醒的门》讲义的剧情选择闯关游戏。

玩家通过6个关卡，经历期待、失望、冲突、觉察，最终找到通往觉醒的门。每关包含剧情场景和多个选择，选择"觉醒视角"可获得成长值，游戏结束后生成专属觉醒报告。

**亲子观察游戏** - 基于"观察孩子练习"设计的亲子互动觉察游戏。

通过6个观察维度（情绪状态、眼神表情、表达方式、存在感、受伤时刻、连接时刻）引导家长觉察孩子和自己，游戏结束后生成专属亲子觉察报告。

**倾听孩子游戏** - 基于"倾听孩子练习"设计的亲子沟通觉察游戏。

通过6个倾听场景（放下手机、保持眼神、接纳情绪、保持耐心、共情回应、避免误区）引导家长学习真正的倾听，游戏结束后生成专属倾听觉察报告。

### 版本技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI 组件**: shadcn/ui (基于 Radix UI)
- **Styling**: Tailwind CSS 4

## 目录结构

```
├── public/                 # 静态资源
├── scripts/                # 构建与启动脚本
│   ├── build.sh            # 构建脚本
│   ├── dev.sh              # 开发环境启动脚本
│   ├── prepare.sh          # 预处理脚本
│   └── start.sh            # 生产环境启动脚本
├── src/
│   ├── app/                # 页面路由与布局
│   │   ├── page.tsx        # 主页面（游戏容器）
│   │   ├── layout.tsx      # 根布局
│   │   └── globals.css     # 全局样式
│   ├── components/
│   │   ├── ui/             # Shadcn UI 组件库
│   │   └── game/           # 游戏组件
│   │       ├── container.tsx     # 亲密关系游戏容器（状态管理）
│   │       ├── screens.tsx       # 亲密关系游戏页面组件
│   │       ├── ui.tsx            # 游戏UI组件
│   │       ├── parent-child-game.tsx  # 亲子观察游戏组件
│   │       └── listen-game.tsx   # 倾听孩子游戏组件
│   ├── hooks/              # 自定义 Hooks
│   │   └── use-game-state.ts  # 游戏状态管理
│   ├── lib/                # 工具库
│   │   ├── utils.ts        # 通用工具函数 (cn)
│   │   ├── game-data.ts    # 亲密关系游戏关卡数据
│   │   ├── parent-child-data.ts  # 亲子观察游戏数据
│   │   └── listen-data.ts  # 倾听孩子游戏数据
│   └── server.ts           # 自定义服务端入口
├── DESIGN.md               # 设计规范
├── next.config.ts          # Next.js 配置
├── package.json            # 项目依赖管理
└── tsconfig.json           # TypeScript 配置
```

- 项目文件（如 app 目录、pages 目录、components 等）默认初始化到 `src/` 目录下。

## 游戏核心逻辑

### 关卡结构（game-data.ts）
- **序章**：空空的客厅 - 内心的孤独与匮乏
- **第一关**：期待落空 - 学会觉察投射
- **第二关**：冲突时刻 - 从争输赢到看自己
- **第三关**：情绪真相 - 触碰的是伤口
- **第四关**：发现自我 - 从"谁爱我"到"我是谁"
- **终章**：花开时刻 - 生成专属觉醒报告

### 亲子观察游戏结构（parent-child-data.ts）
- **第一关**：情绪状态 - 观察孩子的情绪变化
- **第二关**：眼神与表情 - 读懂孩子的非语言表达
- **第三关**：表达方式 - 理解孩子如何表达自己
- **第四关**：存在感的方式 - 觉察孩子寻求关注的方式
- **第五关**：受伤的时刻 - 发现孩子的敏感点
- **第六关**：连接的时刻 - 感受孩子渴望连接的时刻
- **终章**：觉察报告 - 生成专属亲子觉察报告

### 倾听孩子游戏结构（listen-data.ts）
- **第一关**：放下手机 - 专注陪伴，给孩子全部注意力
- **第二关**：保持眼神 - 用眼神传递"我在听你"
- **第三关**：接纳情绪 - 情绪没有对错，允许表达
- **第四关**：保持耐心 - 让孩子说完，表达才完整
- **第五关**：共情回应 - 用心回应，连接内心
- **第六关**：避免误区 - 识别倾听时不该做的事
- **终章**：倾听报告 - 生成专属倾听觉察报告

### 状态管理（use-game-state.ts）
- `currentLevel`: 当前关卡索引
- `totalPoints`: 累计成长值
- `choices`: 玩家选择记录
- `isComplete`: 游戏是否完成

### 页面流程
1. **StartScreen** → 开始游戏
2. **GameScreen** → 选择 → 反馈 → 下一关
3. **ResultScreen** → 觉醒报告 → 重新开始

## 包管理规范

**仅允许使用 pnpm** 作为包管理器，**严禁使用 npm 或 yarn**。
**常用命令**：
- 安装依赖：`pnpm add <package>`
- 安装开发依赖：`pnpm add -D <package>`
- 安装所有依赖：`pnpm install`
- 移除依赖：`pnpm remove <package>`

## 开发规范

### 编码规范

- 默认按 TypeScript `strict` 心智写代码；优先复用当前作用域已声明的变量、函数、类型和导入，禁止引用未声明标识符或拼错变量名。
- 禁止隐式 `any` 和 `as any`；函数参数、返回值、解构项、事件对象、`catch` 错误在使用前应有明确类型或先完成类型收窄，并清理未使用的变量和导入。

### next.config 配置规范

- 配置的路径不要写死绝对路径，必须使用 path.resolve(__dirname, ...)、import.meta.dirname 或 process.cwd() 动态拼接。

### Hydration 问题防范

1. 严禁在 JSX 渲染逻辑中直接使用 typeof window、Date.now()、Math.random() 等动态数据。**必须使用 'use client' 并配合 useEffect + useState 确保动态内容仅在客户端挂载后渲染**；同时严禁非法 HTML 嵌套（如 <p> 嵌套 <div>）。
2. **禁止使用 head 标签**，优先使用 metadata，详见文档：https://nextjs.org/docs/app/api-reference/functions/generate-metadata
   1. 三方 CSS、字体等资源可在 `globals.css` 中顶部通过 `@import` 引入或使用 next/font
   2. preload, preconnect, dns-prefetch 通过 ReactDOM 的 preload、preconnect、dns-prefetch 方法引入
   3. json-ld 可阅读 https://nextjs.org/docs/app/guides/json-ld

## UI 设计与组件规范 (UI & Styling Standards)

- 模板默认预装核心组件库 `shadcn/ui`，位于`src/components/ui/`目录下
- Next.js 项目**必须默认**采用 shadcn/ui 组件、风格和规范，**除非用户指定用其他的组件和规范。**
- 游戏UI采用温暖治愈风格，配色参考 `DESIGN.md`
