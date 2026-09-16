import {
  computeNodes as fallbackComputeNodes,
  gpuTrend,
  metrics,
  modelThroughput,
  risks,
  tasks,
  userUsage,
} from "../mockData";
import { listHeatmapNodes } from "./api";
import UsageClient from "./UsageClient";

async function getComputeNodes() {
  try {
    return await listHeatmapNodes();
  } catch (error) {
    console.error(error);
    return fallbackComputeNodes;
  }
}

export default async function UsagePage() {
  const computeNodes = await getComputeNodes();

  return (
    <UsageClient
      computeNodes={computeNodes}
      gpuTrend={gpuTrend}
      metrics={metrics}
      modelThroughput={modelThroughput}
      risks={risks}
      tasks={tasks}
      userUsage={userUsage}
    />
  );
}
