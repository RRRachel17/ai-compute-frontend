export type NodeStatus = "idle" | "busy" | "hot" | "error";

export type GpuCard = {
  index: number;
  utilization: number;
  memoryPercent: number;
  temperature: number;
  status: NodeStatus;
};

export type ComputeNode = {
  id: string;
  name: string;
  pool: "H100" | "A100" | "L40S";
  gpuCount: number;
  utilization: number;
  status: NodeStatus;
  task: string;
  cards: GpuCard[];
};

export type Task = {
  id: string;
  name: string;
  team: string;
  gpu: string;
  status: "running" | "queued" | "failed";
  duration: string;
};

export type ModelThroughput = {
  model: string;
  team: string;
  tokensPerSecond: number;
  latency: string;
  errorRate: string;
};

export type RiskItem = {
  title: string;
  detail: string;
  level: "warning" | "error" | "info";
};

export const userUsage = {
  user: "张三",
  team: "平台研发组",
  balance: "¥2,384.50",
  monthlyGpuHours: "1,284 GPUh",
  budgetPercent: 68,
  tokenUsage: "12.8M tokens",
};

export const metrics = [
  {
    label: "总 GPU",
    value: "384",
    detail: "H100 / A100 / L40S",
    backgroundColor: "#f4f9ff",
    lineColor: "#beddfd",
    duration: 3,
  },
  {
    label: "使用中",
    value: "286",
    detail: "集群负载 74.5%",
    backgroundColor: "#fef2f8",
    lineColor: "#f8b2d7",
    duration: 4,
  },
  {
    label: "排队任务",
    value: "12",
    detail: "最长等待 38 分钟",
    backgroundColor: "#f4faf7",
    lineColor: "#bcdfcc",
    duration: 5,
  },
  {
    label: "今日吞吐",
    value: "118.4k",
    detail: "tokens / second",
    backgroundColor: "#f6f5fb",
    lineColor: "#cbc1e8",
    duration: 6,
  },
];

const workloadNames = [
  "Qwen3-Coder-480B",
  "Llama-70B-Instruct",
  "DeepSeek-R1-Distill",
  "Embedding refresh",
  "Vision-72B",
  "SFT 训练",
  "批量推理",
  "Reranker-large",
  "Reward Model",
  "Agent Eval",
];

const buildNodes = (
  pool: ComputeNode["pool"],
  gpuCount: number,
  utilizations: number[],
  startIndex: number,
): ComputeNode[] =>
  utilizations.map((utilization, index) => {
    const nodeIndex = index + 1;
    const isIdle = utilization < 42;
    const isError = utilization >= 96;
    const status: NodeStatus = isError
      ? "error"
      : utilization >= 86
        ? "hot"
        : isIdle
          ? "idle"
          : "busy";
    const cards = Array.from({ length: gpuCount }, (_, cardIndex) => {
      const offset = ((index * 11 + cardIndex * 17) % 23) - 10;
      const cardUtilization = Math.max(8, Math.min(99, utilization + offset));
      const cardStatus: NodeStatus =
        isError && cardIndex === 2
          ? "error"
          : cardUtilization >= 86
            ? "hot"
            : cardUtilization < 42
              ? "idle"
              : "busy";

      return {
        index: cardIndex,
        utilization: cardStatus === "error" ? 98 : cardUtilization,
        memoryPercent: Math.max(
          12,
          Math.min(99, cardUtilization + ((cardIndex * 9 + index) % 17) - 4),
        ),
        temperature: Math.round(
          42 + cardUtilization * 0.42 + ((cardIndex * 5 + index) % 8),
        ),
        status: cardStatus,
      };
    });

    return {
      id: `n-${String(startIndex + index).padStart(2, "0")}`,
      name: `${pool}-${String(nodeIndex).padStart(2, "0")}`,
      pool,
      gpuCount,
      utilization,
      status,
      task: isError
        ? "显存异常"
        : isIdle
          ? "空闲"
          : workloadNames[index % workloadNames.length],
      cards,
    };
  });

export const computeNodes: ComputeNode[] = [
  ...buildNodes(
    "H100",
    8,
    [92, 86, 74, 81, 95, 67, 89, 78, 73, 84, 91, 69, 63, 88, 76, 97, 82, 71],
    1,
  ),
  ...buildNodes(
    "A100",
    8,
    [91, 66, 96, 72, 58, 83, 77, 62, 85, 93, 70, 54, 79, 87, 64, 75, 81, 59],
    19,
  ),
  ...buildNodes(
    "L40S",
    4,
    [
      34, 28, 45, 51, 62, 39, 73, 48, 55, 68, 31, 42, 57, 76, 64, 52, 36, 71,
      49, 58, 67, 43, 29, 61,
    ],
    37,
  ),
];

export const risks: RiskItem[] = [
  {
    title: "A100 池使用率 91%",
    detail: "已持续 22 分钟，建议扩容或迁移低优任务",
    level: "warning",
  },
  {
    title: "A100-03 显存异常",
    detail: "节点上 1 个训练任务可能失败",
    level: "error",
  },
  {
    title: "Vision-72B 错误率升高",
    detail: "最近 10 分钟错误率 2.3%",
    level: "warning",
  },
];

export const tasks: Task[] = [
  {
    id: "task-1842",
    name: "Llama-70B 微调生产",
    team: "平台",
    gpu: "H100 x 16",
    status: "running",
    duration: "03h 21m",
  },
  {
    id: "task-1840",
    name: "视觉批量推理",
    team: "媒体",
    gpu: "L40S x 8",
    status: "running",
    duration: "01h 12m",
  },
  {
    id: "task-1839",
    name: "嵌入刷新中文",
    team: "知识库",
    gpu: "A100 x 2",
    status: "queued",
    duration: "等待中",
  },
  {
    id: "task-1838",
    name: "CUDA 内存分析",
    team: "运维",
    gpu: "A100 x 1",
    status: "failed",
    duration: "17m",
  },
];

export const modelThroughput: ModelThroughput[] = [
  {
    model: "Qwen3-Coder-480B",
    team: "研发平台",
    tokensPerSecond: 28400,
    latency: "186ms",
    errorRate: "0.12%",
  },
  {
    model: "Llama-70B-Instruct",
    team: "对话服务",
    tokensPerSecond: 23100,
    latency: "214ms",
    errorRate: "0.18%",
  },
  {
    model: "Embedding-v4",
    team: "知识库",
    tokensPerSecond: 19600,
    latency: "82ms",
    errorRate: "0.04%",
  },
  {
    model: "Reranker-large",
    team: "搜索",
    tokensPerSecond: 14200,
    latency: "96ms",
    errorRate: "0.07%",
  },
];

export const gpuTrend = [52, 58, 61, 69, 73, 81, 78, 84, 76, 88, 83, 91];
