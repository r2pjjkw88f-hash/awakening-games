import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '此刻花开：觉醒之旅',
    template: '%s | 此刻花开',
  },
  description: '一场关于亲密关系的觉察之旅。透过关系，找到自己。',
  keywords: [
    '此刻花开',
    '亲密关系',
    '自我成长',
    '觉醒',
    '心理游戏',
    '关系探索',
  ],
  authors: [{ name: '筱涵' }],
  openGraph: {
    title: '此刻花开：觉醒之旅',
    description: '一场关于亲密关系的觉察之旅。透过关系，找到自己。',
    type: 'website',
    locale: 'zh_CN',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased bg-[#faf8f5]">
        {children}
      </body>
    </html>
  );
}
