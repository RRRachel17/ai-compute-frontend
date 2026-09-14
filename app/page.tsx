import { metrics, userUsage } from "./mockData";
import HomeClient from "./HomeClient";

export default function Home() {
  return <HomeClient metrics={metrics} userUsage={userUsage} />;
}
