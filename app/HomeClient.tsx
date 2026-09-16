"use client";

import { BorderBeam, Button, Card, Col, Input, Row, Space } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type CSSProperties } from "react";
import RIcon from "../assets/heartbeat-pulse-icon.svg";
import AppFrame from "./components/AppFrame";
import {
  EntryCardIcon,
  type EntryCardIconName,
} from "./components/EntryCardIcons";
import type { DashboardMetric, UserUsage } from "./types";

type HomeClientProps = {
  metrics: DashboardMetric[];
  userUsage: UserUsage;
};

function buildEntryItems(userUsage: UserUsage) {
  return [
    {
      key: "usage",
      title: "用量",
      action: "查看用量",
      description: "查看算力消耗、GPU 负载和预算进度。",
      status: `${userUsage.budgetPercent}% 预算`,
      command: "查看本月算力用量和预算进度",
      href: "/usage",
      backgroundColor: "#f4f9ff",
      lineColor: "#beddfd",
      accentColor: "#09f",
      duration: 3,
    },
    {
      key: "knowledge",
      title: "知识库",
      action: "创建知识库",
      description: "创建个人知识库，沉淀文档与业务材料。",
      status: "准备接入",
      command: "创建一个新的个人知识库",
      href: "#knowledge",
      backgroundColor: "#fef2f8",
      lineColor: "#f8b2d7",
      accentColor: "#e8007b",
      duration: 4,
    },
    {
      key: "chat",
      title: "对话",
      action: "开始对话",
      description: "基于知识库发起问答，保留上下文。",
      status: "待配置",
      command: "基于知识库问一个业务问题",
      href: "#chat",
      backgroundColor: "#f4faf7",
      lineColor: "#bcdfcc",
      accentColor: "#10b981",
      duration: 5,
    },
    {
      key: "quality",
      title: "质检",
      action: "运行质检",
      description: "用 AI 质检 Agent 检查输出质量。",
      status: "待配置",
      command: "对最新回答执行一次 AI 质检",
      href: "#quality",
      backgroundColor: "#f6f5fb",
      lineColor: "#cbc1e8",
      accentColor: "#7665d8",
      duration: 6,
    },
  ] satisfies Array<{
    key: EntryCardIconName;
    title: string;
    action: string;
    description: string;
    status: string;
    command: string;
    href: string;
    backgroundColor: string;
    lineColor: string;
    accentColor: string;
    duration: number;
  }>;
}

export default function HomeClient({ metrics, userUsage }: HomeClientProps) {
  const [activeKey, setActiveKey] = useState("chat");
  
  const entryItems = useMemo(() => buildEntryItems(userUsage), [userUsage]);

  const throughput =
    metrics.find((metric) => metric.label === "今日吞吐")?.value ?? "118.4k";

  const activeEntry = useMemo(
    () => entryItems.find((item) => item.key === activeKey) ?? entryItems[2],
    [activeKey, entryItems],
  );

  const color = [
    { color: "#f4f9ff", percent: 30 },
    { color: "#09f", percent: 80 },
    { color: "#f4f9ff", percent: 30 },
    { color: "#f8b2d7", percent: 80 },
  ];

  return (
    <AppFrame userUsage={userUsage}>
      <main className="flex flex-1 items-center justify-center py-4">
        <section className="home-command-shell w-full text-[#1d1d23]">
          <BorderBeam
            color={color}
            duration={10}
            lineWidth={3}
            size={220}
            count={3}
          >
            <Card
              className="home-command-panel"
              styles={{
                root: {
                  border: "1px solid #e3e8ef",
                  borderRadius: 28,
                  backgroundColor: "#fff",
                  boxShadow: "0 18px 48px rgba(29,29,35,0.05)",
                },
                body: { padding: 100 },
              }}
            >
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="home-command-icon" aria-label="AI 工作入口图标">
                  <Image
                    src={RIcon}
                    alt="AI 工作入口"
                    width={60}
                    height={60}
                    priority
                    className="home-command-icon-image"
                  />
                </div>

                <h1 className="mt-6 text-4xl font-semibold tracking-normal text-[#1d1d23]">
                  今天想处理什么？
                </h1>
                <p className="mt-4 max-w-[560px] text-sm leading-6 text-[#6e7180]">
                  从一个指令开始，进入用量查看、知识库创建、知识问答或 AI 质检。
                </p>

                <div className="mt-8 w-full max-w-[760px]">
                  <Input
                    size="large"
                    readOnly
                    className="home-command-input"
                    placeholder={activeEntry.command}
                    prefix={
                      <span className="home-command-caret" aria-hidden="true" />
                    }
                    suffix={
                      <Button
                        href={activeEntry.href}
                        className="home-primary-button"
                        styles={{
                          root: {
                            height: 38,
                            border: "none",
                            borderRadius: 999,
                            backgroundColor: "#1d1d23",
                            color: "#09f",
                            paddingInline: 20,
                            fontWeight: 600,
                          },
                        }}
                      >
                        {activeEntry.action}
                      </Button>
                    }
                  />
                </div>

                <Space
                  size={12}
                  wrap
                  className="mt-5 justify-center text-sm text-[#6e7180]"
                >
                  <span>今日吞吐 {throughput} tokens/s</span>
                  <span className="text-[#cbd5e1]">|</span>
                  <span>预算 {userUsage.budgetPercent}%</span>
                  <span className="text-[#cbd5e1]">|</span>
                  <span>{userUsage.team}</span>
                </Space>
              </div>
            </Card>
          </BorderBeam>

          <div className="home-connector-stage" aria-hidden="true">
            <span className="home-connector-spine" />
            <span className="home-connector-node" />
          </div>

          <Row gutter={[16, 16]} className="home-entry-grid">
            {entryItems.map((item) => {
              const entryStyle = {
                "--entry-bg-color": item.backgroundColor,
                "--entry-line-color": item.lineColor,
                "--entry-accent-color": item.accentColor,
                "--entry-duration": `${item.duration}s`,
              } as CSSProperties;

              return (
                <Col key={item.key} xs={24} sm={12} xl={6}>
                  <Link
                    href={item.href}
                    className="home-entry-link block h-full no-underline"
                    style={entryStyle}
                    onFocus={() => setActiveKey(item.key)}
                    onMouseEnter={() => setActiveKey(item.key)}
                  >
                    <Card
                      hoverable
                      className={`home-entry-card h-full ${activeKey === item.key ? "is-active" : ""}`}
                      styles={{
                        root: {
                          border: `1px solid ${item.lineColor}`,
                          borderRadius: 18,
                          backgroundColor: item.backgroundColor,
                        },
                        body: {
                          minHeight: 370,
                          padding: 20,
                        },
                      }}
                    >
                      <EntryCardIcon name={item.key} />
                      <Space
                        vertical
                        size={48}
                        className="home-entry-content w-full"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="home-entry-dot" />
                          <span className="rounded-full bg-white/70 px-3 py-1 text-xs text-[#6e7180]">
                            {item.status}
                          </span>
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-[#1d1d23]">
                            {item.title}
                          </h2>
                          <p className="mt-3 text-sm leading-6 text-[#6e7180]">
                            {item.description}
                          </p>
                        </div>
                        <span
                          className="text-sm font-medium"
                          style={{ color: item.accentColor }}
                        >
                          {item.action}
                        </span>
                      </Space>
                    </Card>
                  </Link>
                </Col>
              );
            })}
          </Row>
        </section>
      </main>
    </AppFrame>
  );
}
