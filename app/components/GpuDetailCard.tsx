import { Card, Progress, Tag } from "antd";
import type { GpuCard } from "../types";
import type { ActiveGpuCell } from "./types";

function MetricBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="text-[#6e7180]">{label}</span>
        <span className="font-semibold text-[#1d1d23]">{value}%</span>
      </div>
      <Progress percent={value} showInfo={false} strokeColor="#e8007b" trailColor="#fff" />
    </div>
  );
}

function DetailTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white px-4 py-3">
      <p className="text-xs text-[#6e7180]">{label}</p>
      <p className="mt-1 text-lg font-semibold text-[#1d1d23]">{value}</p>
    </div>
  );
}

export default function GpuDetailCard({ cell }: { cell: ActiveGpuCell }) {
  const { node, card } = cell;
  const statusMeta: Record<GpuCard["status"], { color: string; label: string }> = {
    idle: { color: "success", label: "低负载" },
    busy: { color: "processing", label: "运行中" },
    hot: { color: "warning", label: "高负载" },
    error: { color: "error", label: "异常" },
  };

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">节点详情</h2>
          <p className="mt-1 text-sm text-[#6e7180]">来自 GPU 矩阵热力图</p>
        </div>
        <Tag color={statusMeta[card.status].color}>{statusMeta[card.status].label}</Tag>
      </div>

      <Card
        styles={{
          root: {
            border: "1px solid #f8b2d7",
            borderRadius: 18,
            backgroundColor: "#fef2f8",
          },
          body: { padding: 18 },
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-[#6e7180]">{node.pool} 资源池</p>
            <h3 className="mt-1 text-2xl font-semibold text-[#1d1d23]">
              {node.name} / GPU {card.index}
            </h3>
          </div>
          <span className="rounded-full bg-[#1d1d23] px-3 py-1 text-xs font-semibold text-[#09f]">
            {node.gpuCount} 卡节点
          </span>
        </div>

        <div className="mt-5 space-y-4">
          <MetricBar label="GPU 使用率" value={card.utilization} />
          <MetricBar label="显存占用" value={card.memoryPercent} />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <DetailTile label="温度" value={`${card.temperature}°C`} />
          <DetailTile label="节点均值" value={`${node.utilization}%`} />
        </div>

        <div className="mt-5 rounded-2xl bg-white px-4 py-3">
          <p className="text-xs text-[#6e7180]">当前任务</p>
          <p className="mt-1 truncate text-sm font-medium text-[#1d1d23]">{node.task}</p>
        </div>
      </Card>
    </div>
  );
}
