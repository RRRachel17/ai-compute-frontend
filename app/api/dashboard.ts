import { get } from "./request";
import type { DashboardMetric } from "../types";

export function listDashboardMetrics() {
  return get<DashboardMetric[]>("/api/v1/dashboard-metrics");
}
