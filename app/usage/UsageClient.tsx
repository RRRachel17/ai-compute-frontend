"use client";

import { useCallback, useState } from "react";
import { BorderBeam, Card, Progress } from "antd";
import AppFrame from "../components/AppFrame";
import GpuDetailCard from "../components/GpuDetailCard";
import GpuHeatmap from "../components/GpuHeatmap";
import MetricTile from "../components/MetricTile";
import MiniStat from "../components/MiniStat";
import Panel from "../components/Panel";
import type { ActiveGpuCell } from "../components/types";
import type { DashboardData, RiskItem, Task } from "../types";

const taskStyles: Record<Task["status"], { label: string; className: string }> =
  {
    running: {
      label: "运行中",
      className: "border-[#b8e6d3] bg-[#ecfdf5] text-[#047857]",
    },
    queued: {
      label: "排队中",
      className: "border-[#f8b2d7] bg-[#fef2f8] text-[#e8007b]",
    },
    failed: {
      label: "失败",
      className: "border-[#fecaca] bg-[#fef2f2] text-[#dc2626]",
    },
  };

const riskStyles: Record<RiskItem["level"], { dot: string; border: string }> = {
  info: { dot: "bg-[#09f]", border: "border-[#cceaff]" },
  warning: { dot: "bg-[#f59e0b]", border: "border-[#fde68a]" },
  error: { dot: "bg-[#ef4444]", border: "border-[#fecaca]" },
};

const panelClass =
  "rounded-[20px] border border-[#e3e8ef] bg-white shadow-[0_14px_40px_rgba(29,29,35,0.04)]";

export default function UsageClient({
  computeNodes,
  gpuTrend,
  metrics,
  modelThroughput,
  risks,
  tasks,
  userUsage,
}: DashboardData) {
  const [activeGpuCell, setActiveGpuCell] = useState<ActiveGpuCell | null>(
    null,
  );
  const handleGpuCellHover = useCallback((cell: ActiveGpuCell) => {
    setActiveGpuCell(cell);
  }, []);
  const handleGpuCellLeave = useCallback(() => {
    setActiveGpuCell(null);
  }, []);

  const maxThroughput = Math.max(
    ...modelThroughput.map((item) => item.tokensPerSecond),
    1,
  );
  const maxTrend = Math.max(...gpuTrend, 1);
  const runningCount = tasks.filter((task) => task.status === "running").length;
  const queuedCount = tasks.filter((task) => task.status === "queued").length;
  const failedCount = tasks.filter((task) => task.status === "failed").length;

  return (
    <AppFrame userUsage={userUsage}>
      <main
        className="mx-auto flex w-full max-w-[1180px] flex-1 flex-col gap-5"
        style={{ maxWidth: 1180, marginTop: 20 }}
      >
        <section className="grid w-full flex-1 gap-5 xl:grid-cols-[300px_minmax(0,1fr)_330px]">
          <aside
            className={`${panelClass} order-2 h-[600px] overflow-y-auto p-5 xl:order-none`}
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <MetricTile
                  label="本月用量"
                  value={userUsage.monthlyGpuHours}
                />
                <MetricTile label="API 调用" value={userUsage.tokenUsage} />
              </div>

              <Progress
                percent={userUsage.budgetPercent}
                status="active"
                strokeColor="#e8007b"
              />
            </div>

            <div className="mt-6 grid gap-3">
              {metrics.map((metric) => (
                <BorderBeam
                  key={metric.label}
                  color={metric.lineColor}
                  lineWidth="2px"
                  duration={metric.duration}
                >
                  <Card
                    styles={{
                      root: {
                        borderRadius: 16,
                        backgroundColor: metric.backgroundColor,
                      },
                      body: { padding: 12 },
                    }}
                  >
                    <p className="text-large text-[#6e7180]">{metric.label}</p>
                    <div className="mt-2 flex items-end justify-between gap-3">
                      <p className="text-2xl font-semibold">{metric.value}</p>
                      <p className="text-right text-xs text-[#6e7180]">
                        {metric.detail}
                      </p>
                    </div>
                  </Card>
                </BorderBeam>
              ))}
            </div>
          </aside>

          <section className="order-1 xl:order-none">
            <GpuHeatmap
              nodes={computeNodes}
              onCellHover={handleGpuCellHover}
              onCellLeave={handleGpuCellLeave}
            />
          </section>

          <aside className={`${panelClass} order-3 p-5 xl:order-none`}>
            {activeGpuCell ? (
              <GpuDetailCard cell={activeGpuCell} />
            ) : (
              <>
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">风险与告警</h2>
                    <p className="mt-1 text-sm text-[#6e7180]">
                      需要关注的资源和任务
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-[#e8007b]">
                    {risks.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {risks.map((risk) => (
                    <article
                      key={risk.title}
                      className={`rounded-2xl border bg-white p-4 ${riskStyles[risk.level].border}`}
                    >
                      <div className="flex gap-3">
                        <span
                          className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${riskStyles[risk.level].dot}`}
                        />
                        <div>
                          <p className="font-medium">{risk.title}</p>
                          <p className="mt-1 text-sm leading-5 text-[#6e7180]">
                            {risk.detail}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}
          </aside>
        </section>

        <section className="grid w-full gap-5 xl:grid-cols-[300px_minmax(0,1fr)_330px]">
          <Panel title="任务概览" action="查看任务">
            <div className="grid grid-cols-3 gap-2">
              <MiniStat label="运行" value={runningCount} />
              <MiniStat label="排队" value={queuedCount} />
              <MiniStat label="失败" value={failedCount} />
            </div>
            <div className="mt-4 divide-y divide-[#eef2f7]">
              {tasks.map((task) => (
                <article key={task.id} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {task.name}
                      </p>
                      <p className="mt-1 text-xs text-[#6e7180]">
                        {task.team} / {task.gpu}
                      </p>
                    </div>
                    <span
                      className={`rounded-full border px-2.5 py-1 text-xs ${taskStyles[task.status].className}`}
                    >
                      {taskStyles[task.status].label}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-[#6e7180]">{task.duration}</p>
                </article>
              ))}
            </div>
          </Panel>

          <Panel title="模型吞吐量排行" action="查看模型">
            <div className="space-y-4">
              {modelThroughput.map((item, index) => (
                <div key={item.model}>
                  <div className="mb-2 flex items-baseline justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {index + 1}. {item.model}
                      </p>
                      <p className="mt-1 text-xs text-[#6e7180]">
                        {item.team} / 延迟 {item.latency} / 错误率{" "}
                        {item.errorRate}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm font-semibold">
                      {item.tokensPerSecond.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-[#edf1f6]">
                    <div
                      className="h-full rounded-full bg-[#e8007b]"
                      style={{
                        width: `${(item.tokensPerSecond / maxThroughput) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="GPU 使用趋势" action="24 小时">
            <div className="flex h-40 items-end gap-2">
              {gpuTrend.map((value, index) => (
                <div
                  key={`${value}-${index}`}
                  className="flex flex-1 flex-col items-center gap-2"
                >
                  <div
                    className="w-full rounded-t-lg bg-[#09f]"
                    style={{ height: `${(value / maxTrend) * 100}%` }}
                  />
                  <span className="text-[10px] text-[#9aa0ad]">
                    {index + 1}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-[#6e7180]">
              <span>当前 70.6%</span>
              <span>峰值 {maxTrend}%</span>
            </div>
          </Panel>
        </section>
      </main>
    </AppFrame>
  );
}
