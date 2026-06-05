import type { Metadata } from "next";
import { GameContainer } from "@/components/game/container";

export const metadata: Metadata = {
  title: "此刻花开：觉醒之旅",
  description: "一场关于亲密关系的觉察之旅。透过关系，找到自己。",
};

export default function Home() {
  return <GameContainer />;
}
