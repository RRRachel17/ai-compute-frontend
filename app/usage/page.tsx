import {
  computeNodes,
  gpuTrend,
  metrics,
  modelThroughput,
  risks,
  tasks,
  userUsage,
} from "../mockData";
import UsageClient from "./UsageClient";

export default function UsagePage() {
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
