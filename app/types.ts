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
  pool: string;
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

export type UserUsage = {
  user: string;
  team: string;
  balance: string;
  monthlyGpuHours: string;
  budgetPercent: number;
  tokenUsage: string;
};

export type DashboardMetric = {
  label: string;
  value: string;
  detail: string;
  backgroundColor: string;
  lineColor: string;
  duration: number;
};

export type DashboardData = {
  userUsage: UserUsage;
  metrics: DashboardMetric[];
  computeNodes: ComputeNode[];
  risks: RiskItem[];
  tasks: Task[];
  modelThroughput: ModelThroughput[];
  gpuTrend: number[];
};
