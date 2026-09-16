import { metrics as fallbackMetrics, userUsage } from "./mockData";
import { listDashboardMetrics } from "./api/dashboard";
import HomeClient from "./HomeClient";

async function getMetrics() {
  try {
    return await listDashboardMetrics();
  } catch (error) {
    console.error(error);
    return fallbackMetrics;
  }
}

export default async function Home() {
  const metrics = await getMetrics();

  return <HomeClient metrics={metrics} userUsage={userUsage} />;
}
